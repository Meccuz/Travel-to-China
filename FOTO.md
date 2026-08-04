# Foto del sito

Le foto stanno in `img/`, servite dal sito stesso. **Non sono collegate a Wikimedia:**
Commons è bloccato in Cina dal 2019, quindi una foto in hotlink sarebbe un riquadro
vuoto proprio nel posto dove ti serve.

Vengono comunque da Commons, e il credito è obbligatorio.

## Le tre attributi restano, ma servono solo al credito

```html
<figure class="shot" data-ph="成都"
  data-file="Ailuropoda melanoleuca 熊貓 panda - panoramio.jpg"
  data-author="lienyuan lee" data-license="CC BY 3.0">
  <img src="img/chengdu-panda.jpg" alt="Un panda gigante mangia bambù" loading="lazy" decoding="async" onerror="this.remove()">
  <figcaption>Un panda gigante a Chengdu <span>· foto: —</span></figcaption>
</figure>
```

`assets/site.js` legge i `data-*` e scrive la didascalia col credito e il link alla
pagina Commons. L'immagine invece arriva dal `src`, che punta al file locale.

Quel link non si apre dalla Cina, ma resta: le licenze CC BY e CC BY-SA vogliono
l'attribuzione e la fonte. **Non scrivere le didascalie a mano** — nascono dallo stesso
dato del nome file, così il credito non può finire sulla foto sbagliata.

Se `img/` perde un file, `onerror` toglie l'`<img>` e il CSS nasconde la didascalia:
resta il riquadro con l'ideogramma di `data-ph`.

## Aggiungere una foto

1. Cerca su commons.wikimedia.org e **apri la pagina del file**.
2. Copia autore e licenza da lì. Non indovinarli: se non riesci a verificarli,
   lascia il segnaposto.
3. Scarica l'originale, ritaglia 3:2, ridimensiona a 1500×1000, JPEG sotto i 300 kB.
4. Salvala in `img/` con un nome `tappa-soggetto.jpg`.
5. Metti `src`, `data-file`, `data-author`, `data-license` nel `<figure>`.

### Guarda la foto prima di usarla

Il nome non è una garanzia. La prima foto scelta per Chengdu si chiamava
`Chengdu Research Base of Giant Panda Breeding, 201907, 01.jpg` ed era il **cancello
d'ingresso** con una folla di turisti: nessun panda. Ci vuole un colpo d'occhio, non
solo il nome.

I nomi generici sono il caso peggiore. La foto del panda che c'è adesso si chiama
`Ailuropoda melanoleuca 熊貓 panda - panoramio.jpg`: senza luogo nel titolo. Le
categorie dicono `Chengdu Zoo` e le coordinate 30.733 / 104.146, quindi il panda è
a Chengdu — ma non si può stabilire se sia la base di ricerca o lo zoo, e la didascalia
dice solo quello che si può dimostrare.

## Le foto attuali

| File in `img/` | Autore | Licenza | Nome su Commons |
|---|---|---|---|
| `chongqing-hongyadong.jpg` | Jonashtand | CC BY-SA 4.0 | 202308 Hongya Cave at night from Qiansimen Bridge.jpg |
| `pechino-cittaproibita.jpg` | Pixelflake | CC BY-SA 3.0 | The Forbidden City - View from Coal Hill.jpg |
| `xian-terracotta.jpg` | Jmhullot | CC BY 3.0 | Terracotta Army, View of Pit 1.jpg |
| `chengdu-panda.jpg` | lienyuan lee | CC BY 3.0 | Ailuropoda melanoleuca 熊貓 panda - panoramio.jpg |
| `guilin-collina.jpg` | N509FZ | CC BY-SA 4.0 | Guilin Elephant Hill at night (20240217201207).jpg |
| `yangshuo-fiumeli.jpg` | Chinatravelsavvy | CC BY-SA 3.0 | Li River at Xingping 1.jpg |
| `shanghai-pudong.jpg` | Lloyd Tudor | CC BY-SA 4.0 | Pudong skyline at dusk.jpg |

Tutti e sette i nomi sono stati verificati contro l'API di Commons: esistono.

**Non ancora usata:** `leshan-buddha.jpg` (王计, CC BY 2.5,
`Leshan Giant Buddha, 20161102.jpg`) aspetta la pagina di tappa di Chengdu.

**Shenzhen non ha foto di proposito.** È un transito notturno in aeroporto: una
skyline lì venderebbe una cosa che non farai.

## Le tue foto al ritorno

Stessa strada: `img/`, ritaglio 3:2, sotto i 300 kB. Togli i tre `data-*` e la
didascalia resta quella scritta nel `<figcaption>`, senza credito.
