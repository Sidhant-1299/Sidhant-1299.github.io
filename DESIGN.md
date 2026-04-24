# Kirschberg-Inspired Portfolio Design Overview

## 1. Purpose
Recreate the feel of the archived Kirschberg site using the user's cinematic warm-dark theme system, while simplifying motion-heavy behavior into a React + Tailwind architecture that is easier to build, maintain, and extend.

## 2. Product Framing
This is not a generic portfolio. It should feel like a curated design archive with a calm, premium, editorial tone.

Core read:
- sparse navigation
- oversized typographic statements
- image-led work presentation
- motion used as atmosphere, not gimmick
- strong sense of curation and authorship

## 3. Design Translation Rule
Use the archived Kirschberg site as the layout and interaction reference.
Use `theme.md` as the visual authority.
When the two conflict, keep the structure of Kirschberg but the color, texture, contrast, and image treatment from `theme.md`.

## 4. Primary Routes
Implement four top-level routes:
- `/` Home
- `/work` Work
- `/archive` Archive
- `/about` About

Optional detail routes:
- `/projects/[slug]`

## 5. Global Experience
### Navigation
- persistent minimal top nav
- left aligned or center-balanced wordmark / name
- route links with low visual weight
- subtle active state only
- translucent dark background with blur on scroll

### Page Rhythm
- pages should feel airy and deliberate
- large gaps between blocks
- copy should never fight the imagery
- content width should stay controlled even on wide screens

### Motion Direction
Since the original depends on motion, recreate the feeling without overengineering:
- use fade + slide reveals
- use marquee or loop only where it adds value
- use hover zoom, overlay shifts, and soft parallax sparingly
- no flashy spring physics
- treat motion as continuity between sections

## 6. Home Page
### Goal
Establish identity fast.

### Structure
1. hero heading with the name broken across lines or spaced deliberately
2. short positioning statement
3. tiny metadata line such as last updated, city, local time, availability, or role
4. optional featured work preview strip

### Tone
The home page should feel like a poster frame. Minimal, high confidence, very little clutter.

## 7. Work Page
### Goal
This is the core showcase page.

### Structure
1. page heading such as "Recent work"
2. one-sentence framing paragraph
3. vertically stacked or looped project card field
4. each card links into a project detail page

### Layout Behavior
Use one of these implementations:
- desktop: two-column staggered card field
- large screens: multi-column masonry-like rhythm with controlled offsets
- mobile: single-column stacked cards

### Project Card Anatomy
Each work card should include:
- hero image / screenshot
- client name
- year
- project title
- optional "View project" micro label
- hover state with image scale, darker overlay, and subtle metadata shift

### Card Styling
- large rounded containers
- warm-dark overlay to unify inconsistent imagery
- muted borders
- shadow depth, not glow
- preserve photography / product screenshot richness

## 8. Project Detail Page
### Goal
Each project page should feel like a case study, but still editorial.

### Structure
1. close/back control
2. project title
3. year and client
4. short summary / thesis
5. info block with role, collaborators, awards, or links
6. large media sections
7. narrative sub-sections with headings
8. next project link

### Content Rhythm
Alternate between:
- full-width media
- narrow text blocks
- metadata strips
- callout sections

### Media Rules
- use wide cinematic crops
- use dark framing around images
- add captions only when useful
- avoid busy collage layouts unless the project genuinely needs them

## 9. Archive Page
### Goal
A secondary visual scrapbook.

### Structure
- dense grid of experiments, photos, branding fragments, posters, and older work
- lighter metadata than the main Work page
- items can open in modal, lightbox, or detail overlay

### Design Feel
This page can be slightly more raw and exploratory, but it still belongs to the same system.

## 10. About Page
### Goal
Show personality, credibility, and contact pathways without turning it into a resume dump.

### Structure
1. large intro paragraph
2. current role and location line
3. short expertise paragraph
4. contact links
5. awards / publications block
6. client list block

### Tone
Confident and human. Short paragraphs. No fake startup voice.

## 11. Visual System Mapping
Apply the user's theme directly:
- background: `bg-0`, `bg-1`, `bg-2`
- text: `text-0`, `text-1`, `text-2`
- borders: `line-0`, `line-1`
- accent: `accent-red` used sparingly
- image overlays: warm black + faint tobacco / clay tint

## 12. Tailwind Component Rules
### Page shell
- `min-h-screen bg-[var(--bg-0)] text-[var(--text-0)]`
- `max-w-7xl mx-auto px-6 md:px-10 lg:px-16`

### Nav
- `sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-0)]/55 border-b border-[var(--line-0)]`

### Cards
- `rounded-3xl overflow-hidden border border-[var(--line-0)] bg-[var(--bg-1)]/80`
- hover: slightly warmer surface, stronger border, `translate-y-[-2px]`

### Buttons / text links
- understated, no filled bright buttons by default
- text links can use ivory with red underline on hover

### Case study metadata
- uppercase labels
- wide tracking
- muted secondary text

## 13. Responsive Rules
- mobile first, single-column by default
- reduce decorative motion on mobile
- avoid side-by-side text and media when width is tight
- keep headings dramatic but not oversized
- ensure thumbnails keep enough height to feel cinematic

## 14. Image Direction
When generating or editing future images:
- low-light editorial
- warm dark neutrals
- restrained saturation
- soft blur or bloom allowed
- strong composition and negative space
- no cheerful startup illustration look

## 15. Motion Substitutions for a React Build
Where the original site likely used heavy motion, use these substitutes:
- looping card field -> CSS marquee or Framer Motion translate loop
- page transitions -> fast fade between routes
- hover reveals -> overlay opacity + image scale + metadata shift
- hero entry -> staggered text reveal with 300-500ms timing
- section entry -> once-only intersection observer fade-up

## 16. Implementation Boundaries
Do not rebuild the reference literally.
Do not import visual choices that fight the user's own theme.
Do not let motion dominate readability.
Do not use bright white backgrounds, neon gradients, or loud SaaS cards.

## 17. Screenshot Inventory for the Work Page
The archived Work page appears to use these unique project thumbnail/card references:
1. At Home
2. Fluid Engine
3. Fruitful App
4. Squarespace Expressibility Products
5. Gemini
6. Collletttivo x Squarespace
7. Violent White Supremacy
8. Accessibility Ally
9. Existing While Black
10. Exit Films
11. Listen To America
12. Shadows in the Dark
13. Flavour Finder

The page then repeats cards to create a looped or extended scrolling field. Treat the list above as the unique set.

## 18. Recommended Build Order
1. app shell + nav
2. home hero
3. work page card system
4. project detail template
5. about page
6. archive grid
7. motion polish
8. responsive pass
9. accessibility and contrast pass

## 19. One-Line North Star
Build it like a quiet, cinematic design archive: dark, warm, image-led, restrained, and unmistakably intentional.
