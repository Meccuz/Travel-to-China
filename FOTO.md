# Foto del sito

Ci sono otto riquadri, uno per tappa. Quattro sono collegati a Wikimedia Commons,
quattro sono vuoti e mostrano l'ideogramma della città.

## Collegare una foto: una riga

Cerca il luogo su commons.wikimedia.org, apri la pagina del file e copia tre cose
nel tag `<figure>` corrispondente in `index.html`:

```html
<figure class="shot" data-ph="上海"
  data-file="The Bund Shanghai.jpg"
  data-author="NomeUtente" data-license="CC BY-SA 4.0">
```

Il sito costruisce da sé l'indirizzo dell'immagine e la didascalia col credito e il link
alla pagina originale. Non serve scaricare nulla né creare la cartella `img/`.
Il credito viene generato dallo stesso dato del file, quindi non può finire sulla foto sbagliata.

**Le tre cose da copiare dalla pagina Commons:**

- `data-file` — il nome del file, quello dopo `File:` nel titolo della pagina
- `data-author` — l'autore, sotto "Author" nella scheda del file
- `data-license` — es. `CC BY-SA 4.0`, `CC BY 2.0`, `Pubblico dominio`

L'autore va indicato davvero: le licenze CC BY e CC BY-SA lo richiedono. Le foto in
pubblico dominio no, ma citarlo è comunque buona educazione.

## Già collegate

| Tappa | Autore | Licenza | File su Commons |
|---|---|---|---|
| Chongqing | Jonashtand | CC BY-SA 4.0 | 202308 Hongya Cave at night from Qiansimen Bridge.jpg |
| Pechino | Pixelflake | CC BY-SA 3.0 | The Forbidden City - View from Coal Hill.jpg |
| Xi'an | Jmhullot | CC BY 3.0 | Terracotta Army, View of Pit 1.jpg |
| Shanghai | Ermell | CC0 | Shanghai skyline waterfront pudong 5166168 69 70.jpg |

## Ancora da collegare

Le nuove tappe della rotta kimkim non hanno ancora una foto:

| Tappa | Categoria Commons da aprire |
|---|---|
| Chengdu | Category:Chengdu Research Base of Giant Panda Breeding |
| Guilin | Category:Li River |
| Yangshuo | Category:Yangshuo County |
| Shenzhen | (transito notturno, si può lasciare vuota) |

Apri la categoria, scegli la foto, entra nella sua pagina e copia i tre campi.

## Non più in uso

Queste due erano collegate nella versione precedente dell'itinerario. Se torni
sulla rotta nord, sono già verificate:

| Tappa | Autore | Licenza | File |
|---|---|---|---|
| Huangshan | Stephane.janel | CC BY-SA 3.0 | Pic dans la brume - HuangShan.jpg |
| Hangzhou | Bjoertvedt | CC BY-SA 4.0 | West Lake IMG 8755 hangzhou panorama.jpg |

## Alternativa: file locali

Se preferisci non dipendere da Commons, togli `data-file` e metti l'immagine in `img/`
con il nome che il tag ha già nel `src` (`img/pechino.jpg`, `img/xian.jpg`, ecc.).
Ritaglio 3:2, JPEG qualità 80, sotto i 300 kB. È anche la strada per le tue foto al ritorno.
