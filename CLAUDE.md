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

Spostamenti: treni Pechino–Xi'an e Xi'an–Chengdu; voli Chengdu–Guilin e
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

## Ancora aperto

1. **Muraglia:** Mutianyu (comoda, funivia, affollata) o Jinshanling (3 ore da Pechino,
   tratti non restaurati, quasi deserta). Non deciso.
2. **Il giorno recuperato da Longji:** ora a Chengdu, l'alternativa è Yangshuo.
3. **Panjiayuan è in programma di martedì, e il mercato vero è quello del fine
   settimana.** In settimana resta una frazione delle bancarelle, e l'unico slot
   alternativo è la domenica della Città Proibita. Probabilmente da togliere.
4. **Alloggi:** nessuna delle sei città ha un hotel scelto. È il buco più grande.

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
