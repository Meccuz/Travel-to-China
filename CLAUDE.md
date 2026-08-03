# Sito itinerario Cina — contesto del progetto

Sito statico su GitHub Pages con i dettagli di un viaggio in Cina di Michele,
30 ottobre – 16 novembre 2026. Un solo file HTML autonomo, nessuna dipendenza
di build. Le conversazioni precedenti sono avvenute su claude.ai: questo file
serve a non ripartire da zero.

## File

| File | Ruolo |
|---|---|
| `index.html` | Il sito. Tutto qui: HTML, CSS e JS in un unico file |
| `FOTO.md` | Come collegare le foto da Wikimedia Commons |
| `CLAUDE.md` | Questo file |
| `.claudeignore` | Vuoto, creato per errore da uno hook. Da riempire o togliere |

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
  le 07:15 e prima è buio, con le luci di Hongyadong spente. Non vendere lo scalo come
  più di quello che è.

## Ancora aperto

1. **Muraglia:** Mutianyu (comoda, funivia, affollata) o Jinshanling (3 ore da Pechino,
   tratti non restaurati, quasi deserta). Non deciso.
2. **Il giorno recuperato da Longji:** ora a Chengdu, l'alternativa è Yangshuo.
3. **Foto:** 4 tappe su 8 collegate. Mancano Chengdu, Guilin, Yangshuo, Shenzhen.

## Convenzioni del sito

**Struttura.** Un unico `index.html`. Sezioni: hero, voli, itinerario, spostamenti,
info pratiche, cose ancora da decidere, checklist. Niente framework, niente build.

**Design.** Palette carta/celadon/cinabro definita nelle variabili CSS in cima al file:
`--paper`, `--ink`, `--jade`, `--seal`, `--rule`. Font da Google Fonts: Newsreader per
i titoli, Karla per il testo, IBM Plex Mono per i dati (orari, codici volo, tabelle),
Noto Serif SC per gli ideogrammi.

L'elemento firma è la **linea verticale della timeline**: continua e verde per gli
spostamenti di superficie (treni, crociera sul fiume Li), tratteggiata e rossa per i voli.
La classe `.stop.air` cambia il tratto e va sulla tappa **da cui parte** la tratta, non su
quella in cui arriva. Va riverificata ogni volta che l'itinerario cambia mezzo: era
sbagliata su tre tappe su otto. Non aggiungere altri elementi decorativi: la sobrietà
è voluta.

**Da non usare:** `localStorage` e `sessionStorage` non funzionano nell'anteprima
artifact di Claude. La checklist è volutamente senza persistenza.

**Motion.** Solo un fade-up allo scroll via IntersectionObserver, con rispetto di
`prefers-reduced-motion`. Non aggiungerne altro.

## Come funzionano le foto

Ogni tappa ha un `<figure class="shot">` con un `data-ph` che contiene l'ideogramma
della città: è il segnaposto che si vede quando la foto manca.

Per collegare una foto servono tre attributi:

```html
<figure class="shot" data-ph="成都"
  data-file="Nome File Su Commons.jpg"
  data-author="NomeUtente" data-license="CC BY-SA 4.0">
```

Lo script in fondo alla pagina costruisce da sé l'URL via
`https://commons.wikimedia.org/wiki/Special:FilePath/` e genera la didascalia col
credito e il link alla pagina Commons. Il credito nasce dallo stesso dato del file,
quindi non può finire sulla foto sbagliata: **non scrivere le didascalie a mano**.

Regole che valgono sempre:

- Solo **Wikimedia Commons**, mai immagini da blog o Google Immagini: sono protette
  e i link si rompono.
- L'autore va verificato sulla pagina del file, non indovinato. CC BY e CC BY-SA lo
  richiedono. Se non riesci a verificarlo, **lascia il segnaposto** invece di inventarlo.
- Controlla che il soggetto sia davvero quello: nomi generici tipo "Sea of Clouds
  Sunrise" possono essere di un altro continente. È già capitato.

Alternativa: togliere `data-file` e mettere il file in `img/` col nome che sta già nel
`src`. Ritaglio 3:2, JPEG qualità 80, sotto i 300 kB.

## Tono dei testi

Italiano, seconda persona singolare. Concreto e asciutto: cosa fare, a che ora, quanto
dura, cosa può andare storto. I problemi vanno detti, non addolciti — le sezioni
"Ancora da decidere" e le note in rosso (`.note.warn`) esistono per quello.
Evita l'entusiasmo da brochure.

## Pubblicare

Il sito è servito da GitHub Pages sul branch `main`, cartella root. Ogni push va
online in un paio di minuti. Prima di committare, apri `index.html` nel browser e
controlla su una larghezza da telefono: il layout è pensato mobile-first.
