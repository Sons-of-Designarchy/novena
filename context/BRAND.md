# Estudio Novena — Brand Context

## Identity

**Estudio Novena** is a music recording studio with strong roots in Chilean culture and landscape. The brand combines analog warmth, pre-Columbian iconography, and a bold graphic identity that feels both artisanal and contemporary.

---

## Logo

Wordmark: **"ESTUDIO NOVENA"**
- "ESTUDIO" set in small caps, compact
- "NOVENA" in a large, bold, custom rounded sans-serif — geometric, condensed, with very high x-height
- Distinctive detail: the **Ñ** uses a circular dot instead of a tilde — a unique brand signature

**Variants:**
| File | Usage |
|------|-------|
| `logo-black.png` | On light backgrounds |
| `logo-blue.png` | Cobalt — primary brand color |
| `logo-flame.png` | Flame/accent — high energy contexts |
| `logo-white.png` | On dark/colored backgrounds |

---

## Color Palette

| Name | Hex | Role |
|------|-----|------|
| **Dusk** | `#1A1A18` | Negro — dark backgrounds, text |
| **Forest** | `#2B3D2A` | Primario — main brand green |
| **Sage** | `#4A6644` | Verde apoyo — secondary green |
| **Flame** | `#E35A1A` | Acento — highlights, CTAs |
| **Rust** | `#7A1C1C` | Deep red — warmth, depth |
| **Cobalt** | `#1A3FA3` | Secundario — logo, headings |
| **Sand** | `#C8B89A` | Neutro cálido — warm neutral |
| **Mist** | `#D4DCE0` | Fondo frío — cool backgrounds |
| **Ivory** | `#F2EDDF` | Fondo claro — main light background |

**Primary pairings:** Ivory bg + Cobalt text, Dusk bg + Flame accent, Forest bg + Ivory text.

---

## Typography

Custom typeface — bold condensed geometric sans-serif (all caps for headings). Labels/metadata use Flame orange. Background default is Ivory.

| Role | Weight | Size | Letter Spacing |
|------|--------|------|----------------|
| H1 | Regular | 96px | -1.5 |
| H2 | Regular | 60px | -0.5 |
| H3 | Regular | 48px | 0 |
| H4 | Regular | 34px | +0.25 |
| H5 | Regular | 24px | 0 |
| H6 | Regular | 20px | +0.15 |
| Subtitle 1 | Regular | 12px | -1 |
| Subtitle 2 | Regular | 16px | -1 |
| Body 1 | Regular | 16px | -1 |
| Body 2 | Regular | 16px | 0 |
| Button | Regular | 16px | -1 |
| Caption | Regular | 12px | -1 |
| Label (light) | Light | 12px | +2.4 |

---

## Icon System

8 custom illustrated icons, bold filled silhouettes with organic/hand-drawn quality. Available in 4 color variants: **black, cobalt (blue), flame (orange), white**.

| Icon | Description | Meaning |
|------|-------------|---------|
| `araucana` | Araucaria tree | Chilean native tree — rootedness, identity |
| `cactus` | Abstract multi-armed cactus | Resilience, Latin American landscape |
| `flower` | Bouquet/bloom | Growth, beauty |
| `fork` | Wavy two-pronged fork | Food, craft, nourishment |
| `pepper` | Bell pepper | Flavor, local produce |
| `pyramid` | Stepped Mesoamerican pyramid | Pre-Columbian heritage, structure |
| `sun` | Spiky starburst sun | Energy, warmth, South American soul |
| `yito` | Dog silhouette | Mascot — loyalty, character |

Icon path pattern: `context/icons/{color}-icon-{name}.png`

---

## Textures

Halftone/risograph-style nature prints — psychedelic duotones of Patagonian landscapes (araucaria forests, volcanoes, lakes). Used as background overlays or section dividers.

| File | Palette |
|------|---------|
| `textures-trippy01.png` | Blue-teal sky, forest greens |
| `textures-trippy02.png` | Rust/earth + cobalt blue split |
| `textures-trippy03.png` | Forest green + deep rust/maroon |
| `textures-trippy04.png` | Natural landscape photo (araucarias + volcano) |
| `textures-trippy05.png` | Natural landscape (wide) |

Apply with `mix-blend-mode: multiply` or `screen` for overlay effects.

---

## Photography Style

- **Film photography** — visible grain, natural light, warm analog tones
- **Subject:** musicians recording in studio — guitars, synths (Roland Juno-6, Mellotron), drums, microphones
- **Mood:** intimate, lo-fi, process-oriented — the work behind the music
- **Mix:** color film (warm, golden) + black & white (dramatic, timeless)
- **Aesthetic:** candid moments, not polished — human and raw

---

## Brand Personality

- **Chilean soul** — araucaria trees, Patagonia, pre-Columbian symbols, local flora
- **Analog warmth** — film grain, risograph textures, handcrafted icons
- **Bold graphic identity** — strong typography, high contrast, no timidity
- **Music-first** — the studio is the product; photography centers on the creative process
- **Playful but serious** — rounded bold type coexists with earthy, grounded imagery

---

## Asset Paths (relative to project root)

```
context/
├── colors-brand.jpg
├── logos/
│   ├── logo-black.png
│   ├── logo-blue.png
│   ├── logo-flame.png
│   └── logo-white.png
├── icons/
│   └── {black|blue|orange|white}-icon-{name}.png
├── images/
│   ├── novena-gallery/   ← studio photography
│   └── textures/         ← trippy halftone textures
└── type/
    └── Custom Typography.pdf
```
