# Design System & UI Philosophy

## 1. Core Visual Philosophy

Sneha MediCare Advisory is an IRDAI-compliant professional financial and medical advisory website. As such, the visual design strictly avoids generic AI aesthetics, high-contrast neon glows, or flashing tech templates.

### Design Principles
1. **Attractive Oceanic Sapphire Aesthetic**: Balanced, modern aesthetic that avoids stark white backgrounds as well as harsh, flat black (`slate-950`). The canvas is a luminous gradient of deep oceanic sapphire (`#0c2340` via `#0e2a4d` to `#091b30`), accented with vibrant cyan, azure, and warm sovereign gold.
2. **Jewel-Tone Micro-Accents**: Card surfaces feature translucent sapphire glassmorphism (`rgba(14, 42, 77, 0.85)` / `#0e2a4d`) with soft cyan-glowing borders (`border-cyan-500/25`), cyan/teal call-to-actions, and sovereign gold trust highlights.
3. **Contiguous Layout**: Navigation and announcement bars are unified inside a single sticky container to prevent subpixel separation gaps on scroll.
4. **Scannable Information Architecture**: Clear typography hierarchy, pill badges, and structured metric strips enable quick comparison.

---

## 2. Color Palette & Tokens

| Token | Hex / Class | Purpose |
|---|---|---|
| **Background Base** | `#0c2340` via `#0e2a4d` to `#091b30` | Luminous oceanic sapphire canvas |
| **Card / Surface** | `bg-[#0e2a4d]/85` | Sapphire glassmorphism cards, modals, sheets |
| **Input / Inner Box** | `bg-[#0b213c]` | Form controls, selectors, inner stats |
| **Border Accent** | `border-cyan-500/25` / `border-cyan-900/40` | Translucent cyan card borders & dividers |
| **Sovereign Gold / Amber** | `text-amber-300` / `bg-amber-500/15` | IRDAI certifications, LIC sovereign security, 80D tax savings |
| **Vibrant Cyan / Teal**| `text-cyan-300` / `from-teal-400 to-cyan-400` | Primary CTA buttons, active tabs, brand gradients |
| **Regulatory Amber** | `text-amber-300` / `bg-amber-500/20` | Pre-existing disease (PED) notes, verified metrics |
| **Text Primary (Headings)** | `text-cyan-200` (`#a5f3fc`) | High-energy luminous ice-cyan headings and titles (zero pure white) |
| **Text Body / Secondary** | `text-sky-200` (`#bae6fd`) | Luminous soft sky-blue body and descriptive text |
| **Text Dim** | `text-sky-300/70` / `text-sky-400/60` | Footnotes, minor timestamps |
| **Button Text (On colored CTAs)** | `text-slate-950 font-bold` | High-contrast dark sapphire text on cyan/amber buttons |

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
- `amber`: Sovereign gold / IRDAI certification / official rate badges.
- `outline`: Neutral sky border for categories.

### B. Button (`components/ui/button.tsx`)
Variants:
- `default`: Primary solid teal/cyan gradient.
- `amber`: Sovereign amber/gold button.
- `outline`: Dark sapphire with border-cyan-500/30.
- `ghost`: Transparent for header links and icon toggles.
- Sizes: `sm` (compact buttons), `md` (standard), `lg` (hero CTAs).

### C. Bento Grid (`components/ui/bento-grid.tsx`)
Modern responsive grid layout for the "Why Sneha" section, supporting 1-column mobile layouts and 2-column or 3-column spans on desktop.

---

## 5. Responsive Design Standards

- **Mobile First**: All sections collapse cleanly into single-column layouts below `768px` (`md`).
- **Touch Targets**: All interactive buttons, tabs, and inputs maintain a minimum height of `44px` on mobile screens.
- **Sticky Elements**: Unified sticky navigation bar sticks to `top-0` with `z-50` backdrop blur (`backdrop-blur-md`).
