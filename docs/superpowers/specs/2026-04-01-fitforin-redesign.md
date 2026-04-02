# FitforIN — Redesign Spec
**Data:** 2026-04-01
**Stack:** React + Vite + Tailwind CSS + Framer Motion + GSAP

---

## Obiettivo

Trasformare fitforin.it da blog WordPress generico a piattaforma sport science premium. Stile ispirato a Marcelo Design X, Lando Norris, Charles Leclerc. Nessun template, nessun layout standard.

---

## Design System

### Palette — Grayscale Gradient (White Only)
Zero colori accento. Tutta la gerarchia nasce dalla scala tonale e dalla tipografia.

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#080808` | Background base |
| `--nav` | `#000000` | Nav, Footer |
| `--s1` | `#111111` | Hero, Blog section |
| `--s2` | `#0c0c0c` | Featured section |
| `--card` | `#161616` | Cards |
| `--elevated` | `#1c1c1c` | Card hover, elementi elevati |
| `--muted` | `#3a3a3a` | Bordi, separatori |
| `--dim` | `#888888` | Testo secondario |
| `--white` | `#ffffff` | Testo principale, CTA |

**Gradienti:**
- Titolo hero: `linear-gradient(135deg, #fff 0%, #aaa 60%, #333 100%)` — diagonale su 3 righe
- Card: `linear-gradient(135deg, #161616, #111)` — profondità sottile
- CTA strip: `linear-gradient(135deg, #fff, #ccc)` — inversione totale
- Footer logo: `linear-gradient(180deg, rgba(255,255,255,0.06), transparent)` — quasi invisibile

**Texture:** Noise grain SVG su hero e blog section (opacity 0.04)

### Tipografia
- **Display / Titoli:** Inter 900, uppercase, letter-spacing -5px, line-height 0.88
- **Outline text:** `-webkit-text-stroke: 1px rgba(255,255,255,0.15)` alternato al solid
- **Numeri decorativi:** Inter 900, opacity 0.04-0.06, usati come elemento grafico
- **Label / Eyebrow:** Inter 400, uppercase, letter-spacing 4px, colore #2a2a2a
- **Body:** Inter 400, 11-12px, color #555, line-height 1.7

---

## Struttura Pagine

### Homepage
1. **Nav**
2. **Hero**
3. **Ticker animato**
4. **Featured articles**
5. **Category filters + Blog grid**
6. **CTA Section**
7. **Footer**

### Pagina Articolo
- Lettura full-width, tipografia grande, immagini full bleed
- Progress bar di lettura in alto
- Articoli correlati in fondo (broken grid)

---

## Componenti — Dettaglio

### Nav
- Background `#000`, zero bordi visibili
- Sinistra: logo + tagline "La Scienza applicata allo Sport" separata da `|`
- Destra: link orizzontali colore `#2a2a2a`, nessun hamburger su desktop
- Sticky con leggero blur backdrop al scroll

### Hero
- Background gradient verticale `#000 → #111 → #1c1c1c`
- Noise grain overlay
- Titolo: 3 righe da `clamp(72px, 14vw, 140px)`, offset laterale sfalsato
  - Riga 1: gradient bianco → grigio (solid)
  - Riga 2: gradient grigio → scuro (solid, indent 60px)
  - Riga 3: outlined, indent 20px
- Eyebrow: piccolo, uppercase, con linea decorativa sinistra
- Descrizione: testo piccolo con border-left, max 280px
- CTA: bottone bianco + stats "80+ articoli / 6 categorie"
- Counter "001 / FitforIN" in alto sinistra + "Scroll →" in alto destra
- Numero "01" gigante sbiadito in background (position absolute)
- Animazione GSAP: titolo entra dal basso con stagger sulle 3 righe

### Ticker
- Striscia background `#111`
- Categorie che scorrono in loop: Training · Alimentazione · Basket Lab · Medicina Sportiva · Scienza dell'Esercizio · Stretching
- Animazione CSS `animation: ticker 18s linear infinite`
- Separatore `◆` tra le voci

### Featured Articles
- Background `linear-gradient(135deg, #0e0e0e, #1a1a1a)`
- Header: label "In evidenza" + "Vedi tutti →"
- Grid asimmetrica: articolo principale `grid-column: span 1, grid-row: span 2` — occupa tutta l'altezza sinistra
- 2 articoli secondari stacked a destra
- Articolo principale: immagine, categoria, titolo gradient, descrizione breve, CTA inline
- Articoli secondari: numero progressivo `02` `03` sbiadito, categoria, titolo, "Leggi →"
- Hover: border-color si illumina

### Category Filters
- Background `#080808`
- Pill selezionabili: "Tutti", "Training", "Alimentazione", "Basket Lab", "Medicina sportiva", "Scienza dell'esercizio"
- Stato attivo: border `#555`, colore `#999`, background `rgba(255,255,255,0.03)`
- Framer Motion: layout animation al cambio filtro

### Blog Grid (Broken)
- Background `linear-gradient(180deg, #111, #0d0d0d)`
- **Non uniforme:** 3 colonne, ma 1ª e 5ª card `grid-column: span 2`
- Card: gradient sottile, border line in cima (gradient trasparente → bianco 6% → trasparente)
- Numero progressivo sbiadito in alto, categoria, titolo, metadati
- Hover: `translateY(-2px)`, border più luminoso
- Framer Motion: fade-in staggerato al mount

### CTA Section
- Background `linear-gradient(175deg, #0c0c0c, #111, #161616)` + noise
- Numero `→` gigantesco sbiadito in background
- Eyebrow piccolo con linea
- Titolo 3 righe `clamp(44px, 8vw, 86px)`: "Allenati / con / metodo." (solid + solid + outline)
- Row inferiore: descrizione breve sinistra + bottone bianco destra
- GSAP ScrollTrigger: titolo anima linea per linea

### Footer
Struttura a 3 colonne ispirata a dierreimpianti, adattata a FitforIN grayscale.

- **Col 1 — Brand:** Logo gradient, tagline, dominio in monospace, social (Instagram + YouTube) come pill quadrate con bordo + hover
- **Col 2 — Navigazione + Legale:** link con freccia `↗` che appare all'hover, divisi in due gruppi
- **Col 3 — Categorie:** lista categorie con conteggio articoli (`24 art.`, ecc.), ogni riga separata da bordo sottile
- **Bottom bar:** copyright sinistra + pill "Digital Experience by ACWebD" destra con **dot animato ping** (identico a dierreimpianti)
- Background `#000`, border-top `rgba(255,255,255,0.05)`
- **Nota:** colori testo da rivedere con palette finale — attualmente quasi invisibili su nero

---

## Animazioni

| Elemento | Libreria | Comportamento |
|---|---|---|
| Hero title | GSAP + ScrollTrigger | Stagger 0.1s dal basso, opacity 0→1 |
| Hero number bg | GSAP | Scale 1.1→1 al load |
| Ticker | CSS animation | `translateX` loop infinito |
| Blog cards | Framer Motion | `staggerChildren: 0.05` al mount |
| Filtri | Framer Motion | `layoutId` per animazione pill |
| CTA title | GSAP ScrollTrigger | Linea per linea dal basso |
| Card hover | CSS transition | `translateY(-2px)` 150ms ease |
| Nav | Framer Motion | `backdrop-blur` appare allo scroll |

---

## Sezioni ESCLUSE
- ~~Chi siamo / About~~
- ~~Testimonianze~~ (da valutare in futuro)
- ~~Sidebar~~

---

## Note Tecniche
- React 18 + Vite
- Tailwind CSS con custom tokens per la palette
- Framer Motion per transizioni componenti
- GSAP + ScrollTrigger per animazioni scroll avanzate
- Font: Inter (Google Fonts o sistema)
- Routing: React Router v6 (`/`, `/blog`, `/articolo/:slug`, `/categoria/:cat`)
- Dati: mock JSON inizialmente, struttura pronta per CMS headless futuro
