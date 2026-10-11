# Photos for Pot Exotica

## Overview
Every photo slot on the site renders as designed placeholder artwork until you add a real file. The site looks complete without them and becomes photographic the moment you do. All photos use lazy loading — nothing below the fold costs anything until a visitor scrolls to it.

## Photo files needed

### 🔴 HIGHEST PRIORITY — Shop product cards
These are what buyers judge the products by. Add these first.

| Filename | Size | Location | Purpose |
|----------|------|----------|---------|
| `shop-1.jpg` | 600×600 | Shop section | Variegated Monstera Albo |
| `shop-2.jpg` | 600×600 | Shop section | Snake Plant |
| `shop-3.jpg` | 600×600 | Shop section | ZZ Plant Raven |
| `shop-4.jpg` | 600×600 | Shop section | Philodendron Birkin |
| `shop-5.jpg` | 600×600 | Shop section | Anthurium Andraeanum |

### Overview section (What we sell)
| Filename | Size | Location | Purpose |
|----------|------|----------|---------|
| `grow-1.jpg` | 400×300 | "What we sell" section, left card | Exotic & rare plants |
| `grow-2.jpg` | 400×300 | "What we sell" section, center card | Potted plants |
| `grow-3.jpg` | 400×300 | "What we sell" section, right card | Pots |

### Corporate gifting section
| Filename | Size | Location | Purpose |
|----------|------|----------|---------|
| `gifting.jpg` | 600×800 | Gifting section, main image | Branded plant gifts packed |
| `gifting-packed.jpg` | 300×225 | Gifting section, proof strip | Packed order |
| `gifting-tags.jpg` | 300×225 | Gifting section, proof strip | Branded gift tags |
| `gifting-nursery.jpg` | 300×225 | Gifting section, proof strip | Plants at nursery |

### Social media & metadata
| Filename | Size | Purpose |
|----------|------|---------|
| `social.jpg` | 1200×630 | Open Graph image (shown when link is shared) |

---

## How to add photos

1. **Export/save your photos** as JPG format (high quality, ~80-85% compression is fine)
2. **Resize to the exact dimensions** listed above (use `make-images.sh` tool or any image editor)
3. **Drop the files** into this directory (`assets/img/`)
4. **Refresh the site** — photos will appear instantly

### Using make-images.sh

If you have source photos at larger sizes and want to batch-resize them:

```bash
# From the site root directory:
bash tools/make-images.sh
```

The script resizes photos for web and optimizes them.

---

## Photo specifications

- **Format:** JPG (recommended for photos), PNG (for illustrations)
- **Colour space:** sRGB
- **Compression:** 80-85% quality is good for web
- **Aspect ratio:** Exact sizes listed above — no cropping by the site, so photos must be pre-cropped to the right ratio
- **Content:** 
  - Shop photos: Clean, well-lit plant photos (not generic stock)
  - Gifting section: Real photos of your corporate orders, packaging, care cards
  - Social preview: Hero shot showing multiple plants or a branded gift box

---

## What happens without real photos

Right now, every card shows calm gradient placeholder artwork instead of broken image icons. This is intentional — the site looks finished and visually complete. It's not "loading" or "broken" — it's just waiting for your photos. Once you add them, the placeholders vanish and your real photos take their place.

---

## Tips

- **Phone photos work great** — the site is designed to look good on 4G mobile, so your own iPhone/Android photos are perfect
- **Lighting matters** — bright, indirect light shows plants best
- **Consistency:** All 5 shop photos should be shot in similar lighting/background so they feel like one collection
- **Corporate photos** should show real branded boxes, care cards, and packaging — they prove you actually deliver
- **Social image** is what appears when someone shares the link on WhatsApp/Instagram — make it punchy
