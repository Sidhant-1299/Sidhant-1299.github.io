# Portfolio Theme System

## 1) Theme Identity
- **Mood:** cinematic, introspective, low-light, slightly blurred, confident, urban, warm against dark.
- **Visual read:** black puffer, white hoodie, muted reds, beige wall, amber light, chromatic blur, quiet symmetry.
- **Brand personality:** calm competence over loud hype. Premium, grounded, sharp, slightly mysterious.
- **Use this as the single source of truth** for UI tokens, component behavior, image treatment, and future generated assets.

## 2) Core Design Principles
- Lead with **contrast, restraint, and texture**, not bright color.
- The UI should feel like the image: **dark foreground, warm neutrals, controlled red accents, soft blur, strong framing**.
- Prefer **depth over decoration**: borders, overlays, blur, shadow, grain, subtle gradients.
- Everything should feel **deliberate and composed**, never playful or candy-like.
- Red is an **accent**, not the base. White is for hierarchy, not for full-page backgrounds.

## 3) Color System
- `bg-0: #121010` main background
- `bg-1: #1A1515` elevated panels / nav / modal body
- `bg-2: #231D1C` card hover / inner surfaces
- `text-0: #F3EEE7` primary text
- `text-1: #C9BFB2` secondary text
- `text-2: #93897B` muted text
- `line-0: #2D2625` subtle borders
- `line-1: #413736` stronger borders

- Warm neutrals: `stone: #6B6257`, `fog: #918877`, `sand: #A79B8E`, `tobacco: #5C4A33`, `clay: #867766`
- Accent tokens: `accent-red: #8C3836`, `accent-red-deep: #4D2C24`, `accent-blue: #2E4A5A`, `accent-ivory: #EAE2D7`
- Usage ratio: 70% dark neutrals, 20% warm neutrals, 8% ivory, 2% accent color.

## 4) Tailwind Token Mapping
Use CSS variables in `:root`, then map them to semantic Tailwind names like `background`, `surface`, `card`, `foreground`, `muted`, `border`, `primary`, `secondary`, `ring`.

```css
:root {
  --bg-0:#121010; --bg-1:#1A1515; --bg-2:#231D1C;
  --text-0:#F3EEE7; --text-1:#C9BFB2; --text-2:#93897B;
  --line-0:#2D2625; --line-1:#413736;
  --stone:#6B6257; --fog:#918877; --sand:#A79B8E;
  --tobacco:#5C4A33; --clay:#867766;
  --accent-red:#8C3836; --accent-red-deep:#4D2C24;
  --accent-blue:#2E4A5A; --accent-ivory:#EAE2D7;
}
```

## 5) Typography
- Use a clean sans: **Inter, Geist, Satoshi, General Sans**.
- Avoid serif except one intentional quote block if ever needed.
- Headings should feel **compressed and intentional**, not oversized for drama.
- Preferred scale:
  - Hero: `text-5xl md:text-7xl font-semibold tracking-tight`
  - Section title: `text-2xl md:text-4xl font-semibold tracking-tight`
  - Body: `text-sm md:text-base leading-7`
  - Labels: `text-xs uppercase tracking-[0.18em]`
- Default text colors:
  - high emphasis: `text-[var(--text-0)]`
  - medium: `text-[var(--text-1)]`
  - low: `text-[var(--text-2)]`

## 6) Layout Rules
- Use **generous negative space**. This theme breaks when cramped.
- Prefer `max-w-6xl` or `max-w-7xl` with `px-6 md:px-10 lg:px-16`.
- Use grid more than flex for sections.
- Default section rhythm: `py-20 md:py-28`.
- Keep a clear vertical axis. Make asymmetry intentional.
- Rounded corners: `rounded-2xl` default, `rounded-3xl` for hero cards and major images.

## 7) Surface Style
- Panels/cards should use dark surfaces, soft borders, faint blur.
- Preferred classes:
  - `bg-[var(--bg-1)]/80`
  - `border border-[var(--line-0)]`
  - `shadow-[0_10px_40px_rgba(0,0,0,0.35)]`
  - `backdrop-blur-md`
- Avoid pure black fills, harsh white borders, or loud gradients.

## 8) Hero Direction
- The hero should feel like a poster still.
- Use the image large and slightly cropped with breathing room.
- Add a low-opacity warm gradient behind or around it.
- Place support text beside or below the image, never competing with it.
- Optional motif: faint chromatic edge, noise texture, blurred radial glow.

## 9) Image Treatment Rules
- Keep photography cinematic: low saturation, slightly warm, controlled contrast.
- Preserve blur/chromatic character when it helps the mood.
- For generated visuals, use: **muted black / ivory / rust / beige / low-light / shallow depth / soft bloom / editorial framing**.
- Avoid bright skies, neon gradients, stock-office visuals, or flat illustrations unless restyled.
- Image containers should use `overflow-hidden`, `rounded-3xl`, subtle border, soft shadow.

## 10) Component Style Guide
### Buttons
- Primary: restrained dark red or ivory-on-dark.
- Secondary: transparent dark surface with border.
- Baseline: `h-11 rounded-xl px-5 text-sm font-medium transition-all duration-300`.
- Hover should brighten slightly and lift by 1-2px. No bounce.

### Navbar
- Semi-transparent dark bar with blur and a thin bottom border.
- Links use muted text. Active states use ivory or a small red underline.

### Cards
- Use layered hierarchy: label, title, copy, metadata.
- Hover: stronger border, tiny translate-y, slightly warmer background.
- Project cards may use a tinted image overlay to unify mixed media.

### Inputs / Forms
- Dark inputs only.
- Warm-neutral placeholders.
- Focus ring should be low-opacity `accent-red`, never default bright blue.
- Error states should be muted red, not saturated danger red.

### Badges / Tags
- Small uppercase pills.
- Use `accent-red-deep/40` or `bg-2` backgrounds with subtle borders.

### Modals / Drawers
- Background blur plus dark glass panel.
- Motion: fade + rise, 180-240ms.

## 11) Motion Rules
- Motion language: **calm, premium, frictionless**.
- Use fade, slight translate, soft scale. Avoid springy overshoot.
- Page transitions should be near invisible.
- Durations: micro `150-200ms`, standard `220-300ms`, hero reveals `400-600ms`.

## 12) Responsiveness
- On mobile, keep the image emotional but not oversized.
- Collapse multi-column layouts early.
- Prioritize title, image, CTA, then proof/work.
- Tap targets should be at least `44px`.

## 13) Accessibility Guardrails
- Preserve strong text contrast on dark surfaces.
- Do not place body copy on busy images without overlay.
- Keep visible focus states.
- Respect reduced-motion preferences.
- Decorative blur must never reduce readability.

## 14) Do / Don't
- **Do:** use warm-dark surfaces and ivory text, make components feel crafted and calm, reuse the same border radius and spacing rhythm, keep accents sparse and intentional.
- **Don't:** switch to bright SaaS blues or startup gradients, overuse red, use cheerful cards or cartoon icons, mix too many font families, or create sections lighter than the hero image.

## 15) Agent Instructions
- Future UI agents should treat this as the **design contract**.
- New components must inherit these semantic tokens before inventing new colors.
- New illustrations, mockups, and section graphics must match the same cinematic warm-dark palette.
- When uncertain, choose **less color, more structure, more contrast, more restraint**.
