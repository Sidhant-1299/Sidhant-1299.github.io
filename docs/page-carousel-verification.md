# Primary-page carousel verification

## Scope

- Ordered, bounded routes: Home (`/`), Work (`/work`), Academic (`/academic`), About (`/about`). No looping at either end.
- Keep History API URLs, navbar links, and browser back/forward navigation.
- Project routes, navigation controls, forms, editable content, and independently scrolling panels are excluded. Touch swipes across ordinary content/card links navigate pages; taps still open links. Mouse text selection and link dragging remain native.
- Vertical scrolling and pinch zoom remain native. Reduced-motion users retain navigation without the sliding animation.
- Academic Direction is removed; Probability is part of the existing Math skills group.

## Reproduction checklist

Start the site with `npm ci` and `npm run dev`. Check a desktop viewport and a 390 × 844 mobile viewport:

1. Visit each primary route directly and via its navbar link; verify the visible heading, URL, and `aria-current="page"` link agree.
2. Drag/swipe left through Home → Work → Academic → About, then right back to Home. Verify the end pages do not wrap.
3. On desktop, use horizontal trackpad scrolling to move one route at a time. Normal vertical scrolling must not navigate.
4. Scroll down long pages, then navigate. Check overflow during and after transitions.
5. Use browser back/forward, including after multiple gestures and navbar clicks.
6. Touch-swipe over project and credential cards, then tap the same links: swipes navigate pages, taps open links. Mouse link/text dragging and About form fields must not trigger page navigation.
7. Open a project detail route and try both horizontal directions: it must remain a normal detail page.
8. On Academic, inspect credentials, Skills map, Math (Linear Algebra and Probability), and Tools in rotation. Academic Direction and its card must be absent.
9. Repeat navigation with reduced motion enabled. Inspect the browser console for errors.

## Historical carousel checks (before the full-area gesture fix)

- `npm ci`: completed.
- `npm run build`: passed.
- `npm run lint`: passed repository-wide.
- `git diff --check`: passed.
- Production preview HTTP smoke check: direct visits to all four primary routes and `/projects/semantic-book-recommender` returned the built app successfully.
- Data regression assertions: Probability is in Math; all original skills, tools, and project skill-label lookups remain unchanged; no duplicate skill IDs.
- No separate test or typecheck script is configured (plain JS/JSX repository).
- Actual `@playwright/mcp` stdio browser verification: 138 checks passed in Chromium at 1440 × 900 and 390 × 844.
- All four primary pages and navbar links rendered and stayed synchronized with URLs and active states.
- Sequential forward/reverse mouse drags and real mobile CDP touch input passed, including gestures beginning on headings/images, bounded ends, native vertical touch scrolling, and two-touch cancellation.
- Browser back/forward, horizontal wheel navigation, normal vertical wheel scrolling, project detail exclusions, ordinary project links, and About form exclusions passed.
- No horizontal overflow during sampled animation frames or after transitions; no console warnings/errors or uncaught page errors; route images loaded.
- Academic Direction is absent. Math contains Linear Algebra and Probability; credentials, other skills, and tools remain intact.
- Reduced-motion exits are hidden and navigation does not use horizontal animation.
- Regression fixes verified: descendant touch capture transfer, and repeated boundary/reverse desktop drags on selected heading text without clearing selection.
- Screenshots and MCP driver/report artifacts are retained in `/tmp/opencode/mcp-browser/`, including desktop/mobile views of every page and the Math group.

Touch was tested using browser-level Chromium CDP `Input.dispatchTouchEvent` through an actual Playwright MCP tool, not synthetic DOM events. Physical handset/trackpad and Safari/Firefox hardware testing was not performed. Drag navigation uses a deliberate horizontal threshold and commits on release, rather than following the pointer continuously.

## Existing dependency caveat

`npm ci` / `npm audit` reports seven advisories in the existing lockfile (one low, one moderate, five high). No dependency versions were changed for this feature; dependency upgrades are outside its scope.

## Full-area gesture fix — 2026-10-01, local only

- Reproduced dead zones before editing: handlers covered only the content stage, excluding header/footer whitespace and large linked cards. Release detection also rejected horizontal-first swipes after later vertical drift.
- Handlers now cover the app root. A 9px / 1.5-ratio direction decision permanently yields vertical/ambiguous gestures to native scrolling; horizontal gestures retain their lock. Nonpassive touch cancellation replaces ancestor `pan-y`, preserving native nested horizontal scrolling.
- Live bounded drag feedback continues into a 280ms release transition, retaining the outgoing scrolled visible slice. Small primary-page modules warm in parallel to avoid first-navigation loading-frame flashes; project details remain lazy.
- Primary-only horizontal overscroll suppression targets html/body and resets outside carousel routes. It cannot guarantee overriding OS edge-Back gestures.
- Final actual Playwright MCP Chromium run: **60 region checks, 5 intent checks, 29 interaction assertions, 24 responsive route checks, and outgoing-frame continuity passed**. Regions cover all four routes at 390×844, 768×1024, and 1440×900: header, upper/middle/lower content, and scrolled bottoms. Additional screenshots cover 320px and short landscape layouts.
- Nested horizontal/vertical touch scrolling, linked-card taps/swipes, bounds/reversal, controls, mouse selection, wheel momentum, keyboard/history/pagination, reduced motion, and viewport overscroll restoration passed. No fresh warnings/errors, failed requests, broken images, or sampled horizontal overflow.
- A cache-disabled first-navigation check sampled 28 frames with no loading placeholder or overflow after primary-page warmup. Build and repository-wide lint passed.
- Artifacts: gitignored `.playwright-mcp/gesture-review/`; MCP snippets `regions.js`, `intent.js`, `validation.js`, `visual.js`, screenshots, report, and manual checklist.
- **Limitations:** Chromium CDP touch is not actual Brave, Chrome, Safari, or Orion device testing. WebKit launch failed (missing ICU 74, JPEG Turbo 8, GStreamer libav). Native long-press menus, actual pinch zoom, screen-reader speech, physical edge gestures, and subjective smoothness require device verification.
- Manual approval: swipe at top/middle/bottom and scrolled bottoms; compare vertical/diagonal scrolling, card taps, short swipes, repeated reversals, selection/zoom, and Back/Forward. Check interior gestures separately from physical-edge browser/OS navigation.
