# Sito itinerario Cina — contesto del progetto

Sito statico su GitHub Pages con i dettagli di un viaggio in Cina di Michele,
30 ottobre – 16 novembre 2026. Un solo file HTML autonomo, nessuna dipendenza
di build. Le conversazioni precedenti sono avvenute su claude.ai: questo file
serve a non ripartire da zero.

## File

| File | Ruolo |
|---|---|
| `index.html` | La home: voli, itinerario, abbigliamento, luce, checklist, appunti |
| `tappe/*.html` | Una pagina per tappa, sei in tutto. Shenzhen non ne ha: è un transito |
| `assets/site.css` | Tutto il CSS del sito |
| `assets/site.js` | Contatore, crediti foto, note in localStorage, fade-up |
| `privato.html` | Sezione riservata: chiede la passphrase e mostra le prenotazioni |
| `cifra.html` | Attrezzo locale: cifra il JSON in chiaro. Non contiene dati |
| `assets/privato.js` | AES-GCM, PBKDF2 e il rendering delle prenotazioni |
| `privato/dati.enc.json` | Il testo cifrato. È l'unico file di dati che si committa |
| `privato/dati.local.json` | Il file in chiaro. **In `.gitignore`, non esiste su GitHub** |
| `privato/dati.esempio.json` | Il modello da copiare, con lo schema dei campi |
| `robots.txt` | Tiene `privato.html` e `cifra.html` fuori dai motori di ricerca |
| `.gitignore` | Impedisce che il file in chiaro finisca in un commit |
| `assets/fonts.css` | `@font-face` locali. Il subset di Noto Serif SC sta qui |
| `assets/fonts/` | Nove woff2, 425 kB |
| `img/` | Le foto, 3:2 a 1500×1000, sotto i 300 kB l'una |
| `FOTO.md` | Da dove vengono le foto e come aggiungerne |
| `CLAUDE.md` | Questo file |
| `.claudeignore` | Esclude binari e font dal contesto |

La versione precedente dell'itinerario (rotta nord: Shanxi, Huangshan, Hangzhou, Suzhou)
non è più un file: viveva in `index-old.html`, cancellato con il commit `de6ec00`. Se
serve, si recupera dalla storia con `git show 6404213:index-old.html`.

## Vincoli fissi — non modificabili

Voli già prenotati, conferma `C7JXI4`, Hainan Airlines. Orari sempre locali.

- **Ven 30 ott** MXP 10:55 → CKG 05:00 del 31 (HU428, 11h05)
- **Sab 31 ott** CKG 15:15 → PEK 17:40 — scalo a terra di 10h15
- **Dom 15 nov** PVG 20:30 → SZX 23:00
- **Lun 16 nov** SZX 01:45 → MXP 07:40

Il ritorno è **su biglietto unico**: bagagli imbarcati a Pudong e riaperti solo a
Malpensa, coincidenza di 2h45 a Shenzhen protetta. Confermato dall'utente.

A Chongqing invece i bagagli si ritirano comunque, perché è il primo ingresso in Cina
e dogana e immigrazione si fanno lì.

L'aeroporto di partenza del 15 novembre è **Pudong (PVG)**, confermato.

Restano 15 notti da riempire tra l'arrivo a Pechino del 31 ottobre e la partenza
del 15 novembre. Qualunque modifica all'itinerario deve continuare a tornare a 15.

## Itinerario attuale (revisione 5)

Deriva da un itinerario kimkim "Classic China Family Trip 15 days", adattato.

| Date | Tappa | Notti |
|---|---|---|
| 31 ott, mattina | Chongqing (scalo) | — |
| 31 ott – 3 nov | Pechino | 3 |
| 3 – 5 nov | Xi'an | 2 |
| 5 – 8 nov | Chengdu (con Leshan) | 3 |
| 8 – 9 nov | Guilin | 1 |
| 9 – 11 nov | Yangshuo | 2 |
| 11 – 15 nov | Shanghai | 4 |
| 15 nov, notte | Shenzhen (transito) | — |

Spostamenti: treni Pechino–Xi'an, Xi'an–Chengdu e Chengdu–Guilin; volo
Guilin–Shanghai; crociera sul fiume Li da Guilin a Yangshuo.

## Decisioni già prese, con la ragione

Non riproporre queste cose senza che Michele le rimetta in discussione.

- **Longji tolta.** A metà novembre il riso è già mietuto: terrazze di terra e stoppie,
  non gli specchi d'acqua di giugno. Il giorno recuperato è andato a Chengdu, che prima
  aveva l'unica giornata piena mangiata da Leshan.
- **Niente attività per famiglie.** L'originale kimkim prevedeva Disneyland, slittino
  sulla Muraglia, corsi di gnocchi, repliche di guerrieri di terracotta, lezioni di
  kung fu. Michele non è interessato: tutto rimosso.
- **Suzhou e Hangzhou** non sono tappe, ma sono segnalate come gite in giornata da
  Shanghai (30 min e 1 ora di treno), dove ci sono 4 notti.
- **Falso allarme corretto:** la crociera sul fiume Li in magra riguarda dicembre–marzo,
  non novembre. Novembre è tra i mesi migliori.
- **Chongqing:** lo scalo di 10 ore vale circa 4 ore utili, non 10. Il sole sorge verso
  le 07:05 e prima è buio, con le luci di Hongyadong spente. Non vendere lo scalo come
  più di quello che è.
- **Chengdu–Guilin è in treno, non in aereo.** L'alta velocità copre la tratta in 5–7 ore
  via Chongqing e Guiyang, con una ventina di partenze al giorno da Chengdu East a Guilin
  North. Un precedente appunto parlava di 9 ore di treno: era sbagliato. Niente notturno:
  l'unico cuccetta sulla linea è il Guangzhou–Chengdu, che passa da Guilin nel cuore
  della notte.

## Ancora aperto

1. **Muraglia:** Mutianyu (comoda, funivia, affollata) o Jinshanling (3 ore da Pechino,
   tratti non restaurati, quasi deserta). Non deciso.
2. **Il giorno recuperato da Longji:** ora a Chengdu, l'alternativa è Yangshuo.
3. **Panjiayuan è in programma di martedì, e il mercato vero è quello del fine
   settimana.** In settimana resta una frazione delle bancarelle, e l'unico slot
   alternativo è la domenica della Città Proibita. Probabilmente da togliere.
4. **Alloggi:** nessuna delle sei città ha un hotel scelto. È il buco più grande.

## La sezione privata

Hotel, treni e voli interni stanno in `privato.html`, fuori dalle pagine pubbliche.

**Perché è cifrata e non protetta da password.** Il sito è statico e il repo è
pubblico: non esiste nessun server che possa rifiutare una richiesta. Una password
controllata in JavaScript non protegge niente, basta guardare il sorgente. Quindi
il dato viene cifrato con **AES-256-GCM**, chiave derivata dalla passphrase con
**PBKDF2-SHA256, 600 000 iterazioni**. Il blob può stare pubblico su GitHub:
senza la passphrase è rumore. Tutta la sicurezza sta nella passphrase.

GCM autentica oltre a cifrare, e questo dà due cose gratis: una passphrase
sbagliata fa fallire la decifratura da sé, senza nessun valore di controllo
separato da aggirare, e nessuno può modificare il blob per far mostrare alla
pagina qualcosa che non abbiamo scritto noi.

**Perché non Cloudflare Access o simili.** L'autenticazione vera lato server
sarebbe più forte, ma dipende dal raggiungere un servizio terzo e dal ricevere
una mail con un codice. Dalla Cina è una scommessa, esattamente come per le foto
di Commons. La decifratura nel browser non ha bisogno di niente oltre alla pagina
già caricata.

**Il giro da fare per aggiornare i dati:**

1. Modifica `privato/dati.local.json` (in chiaro, sul tuo computer).
2. Apri `cifra.html` da un server locale, incolla il JSON, metti **la stessa
   passphrase di sempre**, premi *Cifra*.
3. Salva l'uscita in `privato/dati.enc.json` e committa **solo quello**.

**Le trappole, in ordine di gravità:**

- **Il file in chiaro non va mai committato, nemmeno una volta.** Il repo è
  pubblico e la storia di git non dimentica: un codice di prenotazione committato
  per errore resta leggibile con `git show` anche dopo che lo cancelli. Rimediare
  vuol dire riscrivere la storia e cambiare tutte le prenotazioni. `.gitignore`
  copre `*.local.json`, ma `git status` prima di ogni commit resta d'obbligo.
- **Se cambia la passphrase, il vecchio blob non si apre più.** Non c'è recupero:
  nessun server sa chi sei.
- Serve **https oppure localhost**: `crypto.subtle` non esiste in contesto
  insicuro, e su `file://` non funziona nemmeno il fetch del blob.
- Le schede sono generate dopo lo sblocco, quindi **non possono usare `.reveal`**:
  `site.js` osserva solo gli elementi presenti al caricamento, e una scheda con
  `.reveal` resterebbe a `opacity:0`, cioè invisibile.

**Deroga voluta alla regola del subset dei font.** Gli indirizzi in cinese
(`indirizzoCn`, `stazioniCn`) sono la cosa che si mostra al tassista: devono
rendersi sempre, e nessun subset di venti glifi può coprire un indirizzo
qualunque. La classe `.cn` usa di proposito il font di sistema, che sui telefoni
c'è sempre. Non è una dimenticanza e non va "corretta" rigenerando il subset.

**La passphrase non si scrive qui.** Questo file è committato su un repo pubblico:
annotarla accanto al meccanismo che chiude vanificherebbe tutto. Vive nel gestore
di password di Michele e da nessun'altra parte.

**Nota di stato.** `privato/dati.enc.json` contiene il modello, non prenotazioni
vere: al 24 agosto 2026 nessuno dei sei hotel è scelto, e treni e volo interno non
sono comprati. La pagina è pronta, i dati mancano. Man mano che si confermano si
riempie `dati.local.json` e si rifà il giro con `cifra.html`.

## Convenzioni del sito

**Struttura.** `index.html` più una pagina per tappa in `tappe/`, che condividono
`assets/site.css` e `assets/site.js`. Niente framework, niente build. I percorsi sono
**sempre relativi**: il sito sta in una sottocartella di GitHub Pages, quindi un
percorso che inizia con `/` si rompe. Dalle pagine di tappa si sale con `../`.

**Design.** Palette carta/celadon/cinabro definita nelle variabili CSS in cima a
`assets/site.css`: `--paper`, `--ink`, `--jade`, `--seal`, `--rule`. Font self-hostati
in `assets/fonts/`: Newsreader per i titoli, Karla per il testo, IBM Plex Mono per i
dati (orari, codici volo, tabelle), Noto Serif SC per gli ideogrammi.

**Il font cinese è un subset di venti glifi.** `fonts.css` dichiara solo gli ideogrammi
che il sito mostra davvero. Se ne aggiungi uno **visibile** va rigenerato il subset,
altrimenti quel carattere cade su un font di sistema. Quelli dentro `data-file` non
contano: non vengono mai disegnati. Per controllare, cerca `[一-鿿]` nelle
pagine e confronta con la lista in `fonts.css`.

L'elemento firma è la **linea verticale della timeline**: continua e verde per gli
spostamenti di superficie (treni, crociera sul fiume Li), tratteggiata e rossa per i voli.
La classe `.stop.air` cambia il tratto e va sulla tappa **da cui parte** la tratta, non su
quella in cui arriva. Va riverificata ogni volta che l'itinerario cambia mezzo: era
sbagliata su tre tappe su otto. Non aggiungere altri elementi decorativi: la sobrietà
è voluta.

**localStorage.** Su GitHub Pages funziona, e ci vivono la checklist (`cina2026:check:<k>`)
e le note di ogni pagina (`cina2026:nota:<id>`). Vale solo su quel dispositivo e in quel
browser: **ogni punto in cui si scrive lo dice all'utente**, perché una nota di viaggio
che sembra sincronizzata e non lo è fa danno. In navigazione privata l'accesso può
lanciare un'eccezione: `site.js` lo prova una volta e degrada disabilitando la textarea.

**Motion.** Solo un fade-up allo scroll via IntersectionObserver, con rispetto di
`prefers-reduced-motion`. Non aggiungerne altro.

## Come funzionano le foto

Ogni tappa ha un `<figure class="shot">` con un `data-ph` che contiene l'ideogramma
della città: è il segnaposto che si vede quando la foto manca.

I file stanno in `img/` e il sito li serve da sé: Commons è bloccato in Cina, quindi
una foto in hotlink sarebbe un riquadro vuoto proprio dove serve. I tre attributi
restano, ma servono solo al credito:

```html
<figure class="shot" data-ph="成都"
  data-file="Nome File Su Commons.jpg"
  data-author="NomeUtente" data-license="CC BY-SA 4.0">
  <img src="img/chengdu-panda.jpg" alt="..." loading="lazy" decoding="async" onerror="this.remove()">
```

`assets/site.js` legge i `data-*` e genera la didascalia col credito e il link alla
pagina Commons; l'immagine arriva dal `src`. Il credito nasce dallo stesso dato del
nome file, quindi non può finire sulla foto sbagliata: **non scrivere le didascalie
a mano**. Se il file manca, `onerror` toglie l'`<img>` e il CSS nasconde la didascalia.

Regole che valgono sempre:

- Solo **Wikimedia Commons**, mai immagini da blog o Google Immagini: sono protette
  e i link si rompono.
- L'autore va verificato sulla pagina del file, non indovinato. CC BY e CC BY-SA lo
  richiedono. Se non riesci a verificarlo, **lascia il segnaposto** invece di inventarlo.
- **Guarda la foto prima di usarla.** Il nome non basta: la prima scelta per Chengdu
  si chiamava `Chengdu Research Base of Giant Panda Breeding, 201907, 01.jpg` ed era
  il cancello d'ingresso con una folla di turisti, senza un panda. I nomi generici tipo
  "Sea of Clouds Sunrise" possono essere di un altro continente.
- La didascalia dice solo quello che si può dimostrare. Se le categorie del file non
  confermano il luogo esatto, scrivi quello confermato e non di più.

Formato: ritaglio 3:2, 1500×1000, JPEG sotto i 300 kB. Dettagli e tabella dei file
in `FOTO.md`.

## Tono dei testi

Italiano, seconda persona singolare. Concreto e asciutto: cosa fare, a che ora, quanto
dura, cosa può andare storto. I problemi vanno detti, non addolciti — le sezioni
"Ancora da decidere" e le note in rosso (`.note.warn`) esistono per quello.
Evita l'entusiasmo da brochure.

## Pubblicare

Il sito è servito da GitHub Pages sul branch `main`, cartella root. Ogni push va
online in un paio di minuti. Prima di committare, apri il sito da un server locale
(`python -m http.server`, non `file://`, altrimenti i percorsi relativi ingannano) e
controlla su una larghezza da telefono: il layout è pensato mobile-first.

Vale la pena controllare anche una pagina di tappa e non solo la home: hanno percorsi
`../` e sono quelle che si rompono per prime.
