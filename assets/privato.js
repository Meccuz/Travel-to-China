/* Sezione privata: hotel, treni e voli interni.

   Il sito e' statico e il repo e' pubblico, quindi non esiste nessun server che
   possa rifiutare una richiesta: qualunque cosa il browser sa scaricare, la sa
   scaricare chiunque. Una password controllata in JavaScript non protegge
   niente, basta guardare il sorgente. L'unica difesa vera e' che il file sia
   illeggibile senza la passphrase, e a quello pensa AES-256-GCM con la chiave
   derivata dalla passphrase via PBKDF2. Il testo cifrato puo' stare in chiaro
   su GitHub: senza la passphrase e' rumore.

   GCM autentica oltre a cifrare. Due conseguenze utili: una passphrase
   sbagliata fa fallire la decifratura da sola, senza bisogno di un valore di
   controllo separato, e nessuno puo' modificare il blob per farci mostrare
   qualcosa che non abbiamo scritto noi.

   Lo stesso file serve due pagine: privato.html (sblocca e mostra) e
   cifra.html (cifra, da usare in locale). Ognuna usa la parte che le serve. */
(function(){
  'use strict';

  var CHIAVE_BLOB = 'cina2026:priv:blob';
  var CHIAVE_PASS = 'cina2026:priv:pass';
  var ITERAZIONI = 600000;

  /* ---------- base64 <-> byte ---------- */

  function inBase64(buf){
    var b = new Uint8Array(buf), s = '', i;
    for(i = 0; i < b.length; i++){ s += String.fromCharCode(b[i]); }
    return btoa(s);
  }

  function daBase64(txt){
    var s = atob(txt), b = new Uint8Array(s.length), i;
    for(i = 0; i < s.length; i++){ b[i] = s.charCodeAt(i); }
    return b;
  }

  /* ---------- chiave, cifratura, decifratura ---------- */

  // Senza https (o localhost) crypto.subtle non esiste: il browser lo espone
  // solo in contesto sicuro. Su file:// non funziona nemmeno il fetch del blob.
  function cryptoDisponibile(){
    return !!(window.crypto && window.crypto.subtle && window.TextEncoder);
  }

  function deriva(passphrase, salt, iterazioni){
    var raw = new TextEncoder().encode(passphrase);
    return crypto.subtle.importKey('raw', raw, {name:'PBKDF2'}, false, ['deriveKey'])
      .then(function(base){
        return crypto.subtle.deriveKey(
          {name:'PBKDF2', salt:salt, iterations:iterazioni, hash:'SHA-256'},
          base,
          {name:'AES-GCM', length:256},
          false,
          ['encrypt','decrypt']
        );
      });
  }

  function cifra(testo, passphrase){
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return deriva(passphrase, salt, ITERAZIONI).then(function(chiave){
      return crypto.subtle.encrypt(
        {name:'AES-GCM', iv:iv}, chiave, new TextEncoder().encode(testo)
      );
    }).then(function(ct){
      return {
        v: 1,
        kdf: 'PBKDF2-SHA256',
        iter: ITERAZIONI,
        cipher: 'AES-256-GCM',
        salt: inBase64(salt),
        iv: inBase64(iv),
        ct: inBase64(ct)
      };
    });
  }

  function decifra(blob, passphrase){
    // Le iterazioni arrivano dal blob, non da qui: un file cifrato oggi
    // continua ad aprirsi anche se domani alziamo il valore di default.
    var iter = blob.iter || ITERAZIONI;
    return deriva(passphrase, daBase64(blob.salt), iter).then(function(chiave){
      return crypto.subtle.decrypt(
        {name:'AES-GCM', iv:daBase64(blob.iv)}, chiave, daBase64(blob.ct)
      );
    }).then(function(chiaro){
      return JSON.parse(new TextDecoder().decode(chiaro));
    });
  }

  /* ---------- memoria del browser ---------- */

  // In navigazione privata anche solo leggere lo storage puo' lanciare.
  function memoria(tipo){
    try {
      var m = tipo === 'session' ? window.sessionStorage : window.localStorage;
      m.getItem('cina2026:test');
      return m;
    } catch(e){ return null; }
  }

  function scorda(m, chiave){
    if(!m){ return; }
    try { m.removeItem(chiave); } catch(e){ /* niente da fare */ }
  }

  /* ---------- rendering ---------- */

  var CAMPI = {
    hotel: [
      ['indirizzo',   'Indirizzo'],
      ['indirizzoCn', 'Da mostrare al tassista', 'cn'],
      ['telefono',    'Telefono', 'mono'],
      ['codice',      'Codice prenotazione', 'mono'],
      ['prezzo',      'Prezzo', 'mono'],
      ['link',        'Prenotazione', 'link'],
      ['note',        'Note']
    ],
    treni: [
      ['treno',       'Treno', 'mono'],
      ['partenza',    'Partenza', 'mono'],
      ['arrivo',      'Arrivo', 'mono'],
      ['durata',      'Durata', 'mono'],
      ['classe',      'Classe'],
      ['posto',       'Posto', 'mono'],
      ['stazioniCn',  'Stazioni in cinese', 'cn'],
      ['codice',      'Codice biglietto', 'mono'],
      ['prezzo',      'Prezzo', 'mono'],
      ['link',        'Biglietteria', 'link'],
      ['note',        'Note']
    ],
    voli: [
      ['volo',        'Volo', 'mono'],
      ['partenza',    'Partenza', 'mono'],
      ['arrivo',      'Arrivo', 'mono'],
      ['durata',      'Durata', 'mono'],
      ['codice',      'Codice prenotazione', 'mono'],
      ['prezzo',      'Prezzo', 'mono'],
      ['bagaglio',    'Bagaglio'],
      ['link',        'Prenotazione', 'link'],
      ['note',        'Note']
    ]
  };

  var TITOLI = { hotel: 'Hotel', treni: 'Treni', voli: 'Voli interni' };

  function el(tag, classe, testo){
    var n = document.createElement(tag);
    if(classe){ n.className = classe; }
    if(testo != null){ n.textContent = testo; }
    return n;
  }

  // Solo http/https. Il dato si scrive a mano, ma un href non deve mai poter
  // diventare javascript: per una distrazione.
  function linkSicuro(url){
    var u = String(url == null ? '' : url).trim();
    return /^https?:\/\//i.test(u) ? u : null;
  }

  function periodo(voce){
    if(voce.checkin && voce.checkout){
      var p = voce.checkin + ' — ' + voce.checkout;
      if(!voce.notti){ return p; }
      return p + ' · ' + voce.notti + (voce.notti === 1 ? ' notte' : ' notti');
    }
    return voce.checkin || voce.data || '';
  }

  function coppia(campo, grezzo){
    var etichetta = campo[1], stile = campo[2] || '', dd;

    if(stile === 'link'){
      var url = linkSicuro(grezzo);
      if(!url){ return null; }
      dd = el('dd');
      var a = el('a', null, 'Apri la prenotazione');
      a.setAttribute('href', url);
      a.setAttribute('rel', 'noopener noreferrer');
      a.setAttribute('target', '_blank');
      dd.appendChild(a);
    } else {
      dd = el('dd', stile, String(grezzo));
    }

    return [el('dt', null, etichetta), dd];
  }

  // Niente .reveal sulle schede: site.js osserva solo gli elementi presenti al
  // caricamento, e queste nascono dopo lo sblocco. Con .reveal resterebbero a
  // opacity:0, cioe' invisibili.
  function scheda(tipo, voce){
    var card = el('div', 'card');
    var occhiello = tipo === 'hotel'
      ? [voce.citta, periodo(voce)].filter(Boolean).join(' · ')
      : [voce.data, voce.citta].filter(Boolean).join(' · ');
    var titolo = tipo === 'hotel' ? voce.nome : voce.tratta;

    if(occhiello){ card.appendChild(el('h4', null, occhiello)); }
    if(titolo){ card.appendChild(el('p', 'pnome', titolo)); }

    var dl = el('dl', 'dl');
    CAMPI[tipo].forEach(function(campo){
      var grezzo = voce[campo[0]];
      if(grezzo == null || String(grezzo).trim() === ''){ return; }
      var c = coppia(campo, grezzo);
      if(!c){ return; }
      dl.appendChild(c[0]);
      dl.appendChild(c[1]);
    });

    if(dl.childNodes.length){
      card.appendChild(dl);
    } else if(!titolo){
      // Una scheda col solo occhiello sembra rotta. Meglio dire che il buco
      // c'e': a fine agosto quasi tutte le tappe sono ancora da prenotare.
      card.appendChild(el('p', 'nulla', 'Da prenotare.'));
    }
    return card;
  }

  function sezione(tipo, voci){
    var sec = el('section');
    sec.id = 'priv-' + tipo;

    var head = el('div', 'shead');
    head.appendChild(el('h2', null, TITOLI[tipo]));
    sec.appendChild(head);

    if(!voci.length){
      sec.appendChild(el('p', 'note', 'Ancora nessuna prenotazione registrata qui.'));
      return sec;
    }

    var grid = el('div', 'grid');
    voci.forEach(function(voce){ grid.appendChild(scheda(tipo, voce)); });
    sec.appendChild(grid);
    return sec;
  }

  function paragrafi(testo){
    var frammento = document.createDocumentFragment();
    String(testo).split(/\n{2,}/).forEach(function(p){
      var t = p.trim();
      if(t){ frammento.appendChild(el('p', null, t)); }
    });
    return frammento;
  }

  function mostra(dati, dove){
    dove.textContent = '';

    ['hotel','treni','voli'].forEach(function(tipo){
      if(!dati[tipo]){ return; }
      dove.appendChild(sezione(tipo, dati[tipo]));
    });

    if(dati.note){
      var sec = el('section');
      sec.id = 'priv-note';
      var head = el('div', 'shead');
      head.appendChild(el('h2', null, 'Appunti'));
      sec.appendChild(head);
      sec.appendChild(paragrafi(dati.note));
      dove.appendChild(sec);
    }

    if(!dove.childNodes.length){
      dove.appendChild(el('p', 'note warn', 'Il file si e’ aperto, ma non contiene niente.'));
    }

    if(dati.aggiornato){
      dove.appendChild(el('p', 'leg', 'Dati aggiornati al ' + dati.aggiornato));
    }
  }

  /* ---------- privato.html: sblocca e mostra ---------- */

  function avviaSblocco(box){
    var form = document.getElementById('lock-form');
    var input = document.getElementById('lock-pass');
    var ricorda = document.getElementById('lock-ricorda');
    var stato = document.getElementById('lock-stato');
    var blocca = document.getElementById('lock-blocca');
    var dentro = document.getElementById('privato-dati');
    var sorgente = box.getAttribute('data-src') || 'privato/dati.enc.json';
    var locale = memoria('local');
    var sessione = memoria('session');

    function dice(msg, brutto){
      stato.textContent = msg || '';
      stato.className = brutto ? 'lock-stato ko' : 'lock-stato';
    }

    if(!cryptoDisponibile()){
      // Il browser espone crypto.subtle solo in contesto sicuro. Capita di
      // arrivare qui dall'IP di rete locale col telefono: il messaggio deve
      // dire dove andare, non spiegare la teoria.
      dice('Da ' + (location.origin || 'questo indirizzo') + ' non funziona: il browser da’ accesso alla crittografia solo su https o su localhost. Apri il sito da https://meccuz.github.io/Travel-to-China/', true);
      input.disabled = true;
      return;
    }

    if(!sessione && ricorda){
      // Senza sessionStorage la spunta mentirebbe.
      ricorda.disabled = true;
      ricorda.checked = false;
    }

    // Il blob cifrato resta anche in localStorage: in Cina la connessione salta,
    // e cosi' la pagina si apre con l'ultima copia scaricata. Non e' un rischio
    // in piu': lo stesso file sta pubblico su GitHub.
    function prendiBlob(){
      return fetch(sorgente, {cache:'no-cache'}).then(function(r){
        if(!r.ok){ throw new Error('HTTP ' + r.status); }
        return r.text();
      }).then(function(txt){
        var blob = JSON.parse(txt);
        if(locale){
          try { locale.setItem(CHIAVE_BLOB, txt); } catch(e){ /* memoria piena */ }
        }
        return {blob: blob, daCache: false};
      }).catch(function(errRete){
        var copia = locale && locale.getItem(CHIAVE_BLOB);
        if(copia){ return {blob: JSON.parse(copia), daCache: true}; }
        throw errRete;
      });
    }

    function apri(passphrase){
      dice('Sto decifrando…');
      var daCache = false;
      return prendiBlob().then(function(esito){
        daCache = esito.daCache;
        return decifra(esito.blob, passphrase);
      }).then(function(dati){
        mostra(dati, dentro);
        form.hidden = true;
        blocca.hidden = false;
        // Se i dati vengono dalla copia locale bisogna dirlo: dopo un
        // aggiornamento potrebbero essere vecchi, e sembrano identici.
        dice(daCache ? 'Senza rete: questa e’ l’ultima copia scaricata su questo dispositivo, puo’ non essere aggiornata.' : '');
        if(ricorda && ricorda.checked && sessione){
          try { sessione.setItem(CHIAVE_PASS, passphrase); } catch(e){ /* niente */ }
        }
      }).catch(function(err){
        var nome = err && err.name;
        if(nome === 'OperationError' || nome === 'InvalidAccessError'){
          dice('Passphrase sbagliata.', true);
        } else if(nome === 'SyntaxError' || nome === 'InvalidCharacterError'){
          dice('Il file cifrato non e’ leggibile: probabilmente non l’ha generato cifra.html.', true);
        } else {
          dice('Non riesco a leggere ' + sorgente + '. Se non l’hai ancora creato, passa da cifra.html.', true);
        }
        scorda(sessione, CHIAVE_PASS);
      });
    }

    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      if(!input.value){ return; }
      apri(input.value);
    });

    blocca.addEventListener('click', function(){
      scorda(sessione, CHIAVE_PASS);
      dentro.textContent = '';
      input.value = '';
      form.hidden = false;
      blocca.hidden = true;
      dice('Richiuso.');
      input.focus();
    });

    // Se la passphrase e' rimasta nella scheda, riapriamo senza richiederla.
    var salvata = sessione && sessione.getItem(CHIAVE_PASS);
    if(salvata){
      if(ricorda){ ricorda.checked = true; }
      apri(salvata);
    }
  }

  /* ---------- cifra.html: il ferro del mestiere ---------- */

  function avviaCifra(){
    var form = document.getElementById('cifra-form');
    var chiaro = document.getElementById('cifra-chiaro');
    var pass1 = document.getElementById('cifra-pass');
    var pass2 = document.getElementById('cifra-pass2');
    var uscita = document.getElementById('cifra-out');
    var stato = document.getElementById('cifra-stato');
    var copia = document.getElementById('cifra-copia');
    var scarica = document.getElementById('cifra-scarica');

    function dice(msg, brutto){
      stato.textContent = msg || '';
      stato.className = brutto ? 'lock-stato ko' : 'lock-stato';
    }

    if(!cryptoDisponibile()){
      dice('Serve https oppure localhost: aperta come file:// la pagina non ha la crittografia.', true);
      return;
    }

    form.addEventListener('submit', function(ev){
      ev.preventDefault();

      if(pass1.value !== pass2.value){
        dice('Le due passphrase non coincidono.', true);
        return;
      }
      // Otto caratteri non sono una difesa, sono un paracolpi contro il dito
      // che scappa: il blob sta su un repo pubblico, quindi chi lo scarica
      // prova quante passphrase vuole sul suo computer, senza nessun limite.
      // Quanto valga la pena difenderlo dipende da cosa c'e' dentro.
      if(pass1.value.length < 8){
        dice('Almeno otto caratteri: sotto e’ facile che sia un errore di battitura.', true);
        return;
      }

      var testo = chiaro.value.trim();
      if(!testo){
        dice('Non c’e’ niente da cifrare.', true);
        return;
      }

      // Meglio scoprire adesso che il JSON e' rotto, non davanti a un hotel.
      try {
        JSON.parse(testo);
      } catch(e){
        dice('Questo non e’ JSON valido: ' + e.message, true);
        return;
      }

      dice('Sto cifrando…');
      cifra(testo, pass1.value).then(function(blob){
        uscita.value = JSON.stringify(blob, null, 2);
        copia.hidden = false;
        scarica.hidden = false;
        dice('Fatto. Questo testo va in privato/dati.enc.json.');
      }).catch(function(err){
        dice('Cifratura fallita: ' + (err && err.message ? err.message : err), true);
      });
    });

    copia.addEventListener('click', function(){
      uscita.select();
      if(!navigator.clipboard){
        dice('Questo browser non mi lascia copiare: seleziona a mano.', true);
        return;
      }
      navigator.clipboard.writeText(uscita.value).then(function(){
        dice('Copiato negli appunti.');
      }).catch(function(){
        dice('Non riesco a copiare: seleziona a mano.', true);
      });
    });

    scarica.addEventListener('click', function(){
      var url = URL.createObjectURL(new Blob([uscita.value], {type:'application/json'}));
      var a = document.createElement('a');
      a.href = url;
      a.download = 'dati.enc.json';
      a.click();
      URL.revokeObjectURL(url);
      dice('Scaricato: spostalo in privato/dati.enc.json.');
    });
  }

  var box = document.getElementById('privato');
  if(box){ avviaSblocco(box); }

  var tool = document.getElementById('cifra');
  if(tool){ avviaCifra(); }

})();
