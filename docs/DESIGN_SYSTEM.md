# Design System & UI Philosophy

## 1. Core Visual Philosophy

Sneha Medicare & Insurance Advisory is an IRDAI-compliant professional financial and medical advisory website. As such, the visual design strictly avoids generic AI aesthetics, high-contrast neon glows, or flashing tech templates.

### Design Principles
1. **Calm & Reassuring Aesthetics**: Medical and financial decisions require calm, trustworthy visuals. Backgrounds are deep slate (`#020617` / `slate-950`), accented with natural medical emerald and soft teal tones.
2. **Zero Neon & Zero Glow Artifacts**: The site strictly eliminates synthetic glow boxes (`shadow-[0_0_...`), pulsing neon dots, and grid wireframes. Standard, elegant drop shadows (`shadow-sm`, `shadow-md`, `shadow-xl shadow-black/40`) are used instead.
3. **Contiguous Layout**: Navigation and announcement bars are unified inside a single sticky container to prevent subpixel separation gaps on scroll.
4. **Scannable Information Architecture**: Clear typography hierarchy, pill badges, and structured metric strips enable quick comparison.

---

## 2. Color Palette & Tokens

| Token | Hex / Class | Purpose |
|---|---|---|
| **Background Base** | `bg-slate-950` (`#020617`) | Main application canvas background |
| **Card / Surface** | `bg-slate-900/60` to `/80` | Card surfaces, modal sheets, tables |
| **Border Subtle** | `border-slate-800` (`#1e293b`) | Card borders, dividers, outlines |
| **Medical Emerald** | `text-emerald-400` / `bg-emerald-500` | Verified approvals, positive metrics, trust badges |
| **Advisory Teal** | `text-teal-400` / `bg-teal-600` | Primary buttons, active tabs, brand accents |
| **Regulatory Amber** | `text-amber-400` / `bg-amber-500/10` | Pre-existing disease (PED) declarations, IRDAI notices |
| **Text Primary** | `text-white` (`#ffffff`) | Headings, titles, numbers |
| **Text Muted** | `text-slate-400` | Subtitles, descriptions, metadata |
| **Text Dim** | `text-slate-500` / `text-slate-600` | Footnotes, minor timestamps |

---

## 3. Typography

- **Primary Font Family**: **Plus Jakarta Sans** (loaded via `next/font/google`).
  - Weights: `300`, `400`, `500`, `600`, `700`, `800`.
  - Class: `font-sans`.
- **Monospace Font**: **Geist Mono** for policy reference IDs, premium numbers, and phone numbers.
- **Hierarchy**:
  - `h1`: `text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight`
  - `h2`: `text-3xl sm:text-5xl font-black tracking-tight`
  - `h3`: `text-2xl font-bold`
  - `p` (Body): `text-sm sm:text-base text-slate-400 leading-relaxed`
  - `Badge / Pill`: `text-[10px]` or `text-xs font-semibold uppercase tracking-wider`

---

## 4. UI Primitives (`components/ui/`)

### A. Badge (`components/ui/badge.tsx`)
Variants:
- `default`: Cyan border and text.
- `emerald`: Medical approval badge with soft green tint.
- `amber`: Fine-print or pre-existing disease alerts.
- `outline`: Neutral slate border for categories.

### B. Button (`components/ui/button.tsx`)
Variants:
- `default`: Primary solid teal/emerald gradient.
- `outline`: Dark slate with border-slate-700 and hover highlights.
- `ghost`: Transparent for header links and icon toggles.
- `destructive`: Rose tint for removal actions.
- Sizes: `sm` (compact buttons), `md` (standard), `lg` (hero CTAs).

### C. Bento Grid (`components/ui/bento-grid.tsx`)
Modern responsive grid layout for the "Why Sneha" section, supporting 1-column mobile layouts and 2-column or 3-column spans on desktop.

---

## 5. Responsive Design Standards

- **Mobile First**: All sections collapse cleanly into single-column layouts below `768px` (`md`).
- **Touch Targets**: All interactive buttons, tabs, and inputs maintain a minimum height of `44px` on mobile screens.
- **Sticky Elements**: Unified sticky navigation bar sticks to `top-0` with `z-50` backdrop blur (`backdrop-blur-md`).
