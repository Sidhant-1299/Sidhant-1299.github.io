# Primary-page carousel verification

## Scope

- Ordered, bounded routes: Home (`/`), Work (`/work`), Academic (`/academic`), About (`/about`). No looping at either end.
- Keep History API URLs, navbar links, and browser back/forward navigation.
- Project routes and gestures starting on links, controls, or editable content are excluded.
- Vertical scrolling and pinch zoom remain native. Reduced-motion users retain navigation without the sliding animation.
- Academic Direction is removed; Probability is part of the existing Math skills group.

## Reproduction checklist

Start the site with `npm ci` and `npm run dev`. Check a desktop viewport and a 390 × 844 mobile viewport:

1. Visit each primary route directly and via its navbar link; verify the visible heading, URL, and `aria-current="page"` link agree.
2. Drag/swipe left through Home → Work → Academic → About, then right back to Home. Verify the end pages do not wrap.
3. On desktop, use horizontal trackpad scrolling to move one route at a time. Normal vertical scrolling must not navigate.
4. Scroll down long pages, then navigate. Check overflow during and after transitions.
5. Use browser back/forward, including after multiple gestures and navbar clicks.
6. Check that dragging on project links, credential links, and About form fields does not navigate between primary pages. Ordinary links must still work.
7. Open a project detail route and try both horizontal directions: it must remain a normal detail page.
8. On Academic, inspect credentials, Skills map, Math (Linear Algebra and Probability), and Tools in rotation. Academic Direction and its card must be absent.
9. Repeat navigation with reduced motion enabled. Inspect the browser console for errors.

## Automated checks and browser results

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
