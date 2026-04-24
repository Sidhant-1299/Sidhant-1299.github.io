# AGENTS.md

## Sources Of Truth
- `reference/` is the component/layout reference for the Kirschberg-inspired UI. Use it for composition, spacing, card rhythm, and page feel. Do not copy its colors blindly.
- `reference/features.md` is the extracted summary of the archived Work page. Read it before rebuilding the Work page layout patterns.
- `THEME.md` is the visual contract. Use it for tokens, palette, typography, surfaces, motion, and accessibility guardrails.
- `DESIGN.md` is the route/page/component contract. Use it for page goals, route inventory, and the intended UI pieces: `/`, `/work`, `/academic`, `/about`, optional `/projects/[slug]`.
- If they conflict, keep structure and interaction direction from `reference/` + `DESIGN.md`, but keep color/texture/contrast decisions from `THEME.md`.

## Required Principles
- Every downstream agent should follow: Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution.
- Adapt to the code that exists. Do not force a full architecture from the design docs before the implementation actually needs it.

## Repo Reality
- `README.md` is still the default Vite template and is not a reliable description of the product.
- The real entrypoint is `src/main.jsx`, which only renders `src/App.jsx`.
- The current app is a single-page Tailwind shell. There is no router, page directory, or reusable component system yet.
- Styling is Tailwind v4 through `src/index.css`, which currently contains only `@import "tailwindcss";`. There is no Tailwind config file in use.
- `vite.config.js` enables `@vitejs/plugin-react`, `@rolldown/plugin-babel`, and `reactCompilerPreset()`. Keep changes compatible with the React Compiler setup.
- The repo is plain JS/JSX ESM, not TypeScript.
- No test, typecheck, formatter, or CI workflow is configured right now.

## React Guidance
- `skills/react-best-practices/SKILL.md` exists locally in the repo. Use it as the React guidance source when writing or refactoring components.
- Apply those React patterns pragmatically to this small app: prefer direct imports, early returns, parallel async work when independent, and avoid adding memoization or abstraction without a measured need.

## Route Contract
- Do not add an `/archive` route, nav item, redirect, or page. The portfolio uses `/academic` instead.
- The top-level nav should be: Home, Work, Academic, About.
- `/academic` may include education, certifications, skills, tools, and academic-adjacent proof. It should not become an archive page under a different name.
- `src/assets/me.jpg` must be used in the home hero/poster composition or another prominent hero card.

## Verification
- Start local dev with `npm run dev`.
- Use `npm run build` as the reliable end-to-end check.
- Run repo-wide lint with `npm run lint`.
- For focused lint on touched files, use `npx eslint path/to/file`.
- Current baseline may include user or legacy-data changes. Separate pre-existing worktree/lint issues from failures introduced by the current feature.

## Legacy Data Gotchas
- `src/Data/*` is not wired into the current `App.jsx`; treat it as dormant content, not proven infrastructure.
- Prefer replacing or dropping stale legacy data over adding compatibility code. Keep legacy modules only when they directly serve the current feature.
- Verify asset imports before reviving any legacy module.
- `src/Data/SkillData.jsx` pointed at `src/assets/Skills/*`, but that folder was missing. If skills are rebuilt, create fresh current data instead of reviving broken imports.
- `src/assets/Academic/` now exists and contains `coursera.svg`, `seneca.jpg`, `sxc.jpg`, and `sxc.png`.
- If you revive `src/Data/AcademicData.jsx`, verify its current image import paths before wiring it into the app.
- `src/Data/ProjectData.jsx` imports `semantic_book_recommender_cropped_processed_by_imagy.png` and `youtube_sentiment_analyzer_cropped_processed_by_imagy.png`, but only the non-processed filenames exist under `src/assets/Projects/`.

## UI Work Split
- If work is split across agents, split by real UI seams from `DESIGN.md`: `Shell/Nav`, `Home/Hero`, `Work/Card Grid`, `Project Detail`, `Academic`, `About`.
- `Shell/Nav` owns the app shell, sticky navigation behavior, shared spacing, and shared tokens.
- `Work/Card Grid` must study `reference/` first for card rhythm and layout, then apply surfaces and color from `THEME.md`.
- `Project Detail`, `Academic`, and `About` should reuse the same token, radius, spacing, and motion system instead of inventing page-specific themes.

## Agent Coordination
- Project agents live in `.opencode/agents/`. They may stay dormant after a feature completes so they can be reused later without polluting the main context.
- The main agent coordinates feature scope, final integration, verification, user validation, staging, and commits.
- Feature agents should return focused implementation or review output and should not create commits.
- Use `react-code` for React structure, route lazy loading, state, and component wiring.
- Use `tailwind-responsive` for theme tokens, responsive layout, visual polish, and accessibility guardrails.
- Use `playwright-feedback` after a feature runs locally to inspect desktop/mobile behavior and write reusable feedback here.
- Create or use narrower feature agents when helpful: `home-hero`, `work-grid`, `academic-page`, `about-page`, `project-detail`, `shared-ui`, and `cleanup-legacy`.

## Feature Validation And Commits
- Every feature should follow: implement, build/lint, Playwright desktop/mobile pass, fix blocking bugs, ask the user to validate, then commit only after approval.
- Use `npm run build` as the reliable end-to-end check for every code feature.
- Use focused lint on touched JS/JSX when repo-wide lint is blocked by unrelated legacy issues.
- Do not commit unrelated dirty files. Stage only files that belong to the validated feature.
- Do not push unless the user explicitly asks.

## Archived Work Notes
- The archived Work page is driven by a few repeating patterns, not a dense variety of card types: one lead full-bleed card, repeated two-column medium-card rows, and one asymmetric row with two stacked small cards beside one large feature card.
- The hero is a centered oversized title with a tiny uppercase summary, followed by imagery entering from below. Keep that poster-like intro feel.
- The bottom floating pill menu with a thin active underline is part of the composition. If recreated, treat it as a compositional anchor, not just navigation chrome.
- Lower rows repeat the project set to create a long curated field. Preserve that rhythmic repetition instead of inventing many new layouts.
- Cards are image-first with generous radius and wide gutters. If text or metadata is added, keep it light and overlaid rather than turning cards into text-heavy panels.

## Academic Notes
- Any changes to `/academic` should include or update an academic card flow based on current education, certification, skills, and tools content.
- Academic items should inherit spacing, radius, and surface rules from `THEME.md`; do not invent a separate visual system.
- `reference/features.md` is still the reference summary for captured layout behavior. Use it for page rhythm discipline, then map academic and skills content into the current warm-dark theme.

## Playwright Feedback Notes
- Add durable findings here after browser review. Keep notes short, reusable, and tied to the feature that produced them.
- Separate blocking fixes from optional polish.
- Shell/Lazy Routes 2026-04-24: Desktop and 390px mobile route checks passed for `/`, `/work`, `/academic`, `/about`, and `/projects/sample-study`; no console warnings/errors and no mobile horizontal overflow.
- Shell/Lazy Routes 2026-04-24: `/archive` is intentionally absent from nav and resolves to the generic not-found frame. Keep this behavior unless the route contract changes.
- Work/Card Grid 2026-04-24: Desktop and 390px mobile checks passed for `/work`; project cards render once from `src/Data/ProjectData.jsx` with lead, paired, and asymmetric rows, with no console warnings/errors or horizontal overflow.
- Work/Card Grid 2026-04-24: Project card links route to `/projects/[slug]` placeholders successfully. Detail template polish can wait for the Project Detail feature.
- Work/Card Grid 2026-04-24: Card metadata/title panels are anchored consistently at the bottom of every project card to avoid image/text overlap.

## Change Strategy
- Because the current app is tiny, prefer the smallest working change in `src/App.jsx` until a second page or genuinely reusable UI forces extraction.
- When you do extract, mirror the planned top-level UI from `DESIGN.md` instead of inventing arbitrary folders.

## Workspace Notes
- `reference/` and `.playwright-mcp/` are gitignored local reference material. Use them for design inspection, not as runtime app assets.
- This workspace currently has Playwright MCP configured in `opencode.json`; use it for visual checks when available.


<claude-mem-context>
# Memory Context

# $CMEM Sidhant-1299.github.io 2026-04-23 11:36pm EDT

No previous sessions found.
</claude-mem-context>
