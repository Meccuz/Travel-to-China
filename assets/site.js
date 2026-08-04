(function(){
  var partenza = new Date(2026,9,30,10,55);
  var el = document.getElementById('counter');
  function tick(){
    var giorni = Math.ceil((partenza - new Date())/86400000);
    if(giorni > 1){ el.innerHTML = 'Partenza tra <b>' + giorni + '</b> giorni'; }
    else if(giorni === 1){ el.innerHTML = 'Si parte <b>domani</b>'; }
    else if(giorni === 0){ el.innerHTML = 'Si parte <b>oggi</b>'; }
    else { el.innerHTML = 'Viaggio in corso, o già finito'; }
  }
  // Il contatore c'e' solo sulla home: le pagine di tappa condividono questo script.
  if(el){ tick(); setInterval(tick, 60000); }


  // I file stanno in img/, ma il credito nasce dai data-attribute della figura:
  // e' lo stesso dato da cui viene il nome su Commons, quindi non puo finire
  // sulla foto sbagliata. Il link all'originale non si apre dalla Cina, dove
  // Commons e' bloccato: resta perche' la licenza CC lo chiede.
  document.querySelectorAll('.shot[data-file]').forEach(function(fig){
    var cap = fig.querySelector('figcaption');
    if(!cap) return;
    var author = fig.getAttribute('data-author') || 'autore da indicare';
    var lic = fig.getAttribute('data-license') || 'licenza da indicare';
    var page = 'https://commons.wikimedia.org/wiki/File:' +
      encodeURIComponent(fig.getAttribute('data-file').replace(/ /g,'_'));
    cap.innerHTML = cap.firstChild.textContent.trim() +
      ' <span>· ' + author + ', ' + lic +
      ', <a href="' + page + '" rel="noopener" target="_blank">Wikimedia Commons</a></span>';
  });

  // Note e checklist stanno in localStorage: non c'e' nessun server, quindi vivono
  // soltanto in questo browser su questo dispositivo. Le pagine lo dicono a chi scrive.
  // In navigazione privata localStorage puo' lanciare un'eccezione al primo accesso:
  // qui si prova una volta e, se non funziona, si degrada senza rompere il resto.
  var store = (function(){
    try {
      localStorage.setItem('cina2026:prova','1');
      localStorage.removeItem('cina2026:prova');
      return localStorage;
    } catch(e){ return null; }
  })();

  function statoDi(id){ return document.querySelector('[data-nota-stato="' + id + '"]'); }

  document.querySelectorAll('[data-nota]').forEach(function(ta){
    var id = ta.getAttribute('data-nota');
    var key = 'cina2026:nota:' + id;
    var stato = statoDi(id);
    function dice(msg){ if(stato){ stato.textContent = msg; } }
    if(!store){
      ta.disabled = true;
      dice('Questo browser non permette di salvare: la nota andrebbe persa.');
      return;
    }
    ta.value = store.getItem(key) || '';
    dice(ta.value ? 'Salvata su questo dispositivo.' : 'Niente di scritto per ora.');
    var attesa;
    ta.addEventListener('input', function(){
      clearTimeout(attesa);
      dice('Sto salvando…');
      attesa = setTimeout(function(){
        try {
          if(ta.value.trim()){
            store.setItem(key, ta.value);
            dice('Salvata su questo dispositivo.');
          } else {
            store.removeItem(key);
            dice('Nota vuota: non salvo niente.');
          }
        } catch(e){
          dice('Non riesco a salvare, la memoria del browser e\' piena.');
        }
      }, 500);
    });
  });

  // Cancella senza chiedere conferma, ma l'annullamento resta possibile
  // fino al ricaricamento: piu' onesto di una finestra di dialogo.
  document.querySelectorAll('[data-nota-cancella]').forEach(function(btn){
    var id = btn.getAttribute('data-nota-cancella');
    var ta = document.querySelector('[data-nota="' + id + '"]');
    var stato = statoDi(id);
    if(!ta || !store){ btn.hidden = true; return; }
    var precedente = '';
    btn.addEventListener('click', function(){
      if(btn.getAttribute('data-annulla') === '1'){
        ta.value = precedente;
        store.setItem('cina2026:nota:' + id, precedente);
        btn.textContent = 'Cancella';
        btn.removeAttribute('data-annulla');
        if(stato){ stato.textContent = 'Nota ripristinata.'; }
        return;
      }
      if(!ta.value){ return; }
      precedente = ta.value;
      ta.value = '';
      store.removeItem('cina2026:nota:' + id);
      btn.textContent = 'Annulla';
      btn.setAttribute('data-annulla','1');
      if(stato){ stato.textContent = 'Cancellata. Puoi annullare fino al ricaricamento.'; }
    });
  });

  document.querySelectorAll('.check input[type=checkbox][data-k]').forEach(function(box){
    var key = 'cina2026:check:' + box.getAttribute('data-k');
    if(store){ box.checked = store.getItem(key) === '1'; }
    box.addEventListener('change', function(){
      if(!store){ return; }
      try {
        if(box.checked){ store.setItem(key,'1'); } else { store.removeItem(key); }
      } catch(e){ /* memoria piena: la casella resta spuntata solo a schermo */ }
    });
  });

  var items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(function(i){ i.classList.add('in'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  },{rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(i){ obs.observe(i); });
})();
