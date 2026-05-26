# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite with HMR)
- **Build:** `npm run build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint:** `npm run lint` (ESLint with TypeScript + React Hooks + React Refresh rules)
- **Preview production build:** `npm run preview`
- **Type-check only:** `npx tsc -b`

## Architecture

React 19 + TypeScript + Vite single-page portfolio site. No routing, no state management, no Tailwind build step (Tailwind is used via CDN/utility classes in JSX, not installed as a dependency).

### WiredBackground — the visual centerpiece

The entire animated background is a single React component at `src/components/WiredBackground/`. It renders a full-viewport fixed layer (`z-index: -1`) behind scrollable page content. Two layers compose the effect:

1. **Canvas noise field** (`noise.ts` + `content.ts:drawNoiseFrame`) — a 3D value-noise stipple pattern rendered per-frame via `requestAnimationFrame`. Dark background with sparse magenta/rose dots that drift over time.

2. **DOM panel system** (`panels.ts` + `WiredBackground.tsx`) — floating monospace "terminal" panels positioned absolutely over the canvas. Panel types: `ide`, `search`, `sysinfo`, `charmatrix`, `copland_login`, `quote_panel`, `ascii_organic`. Each type has a content builder in `content.ts` that returns either a `textContent` string or an `innerHTML` string.

Panels are either **persistent** (stay forever: IDE, login, matrix) or **ephemeral** (spawn/despawn on timers, managed by a 1.2s interval that maintains 1-2 active ephemeral panels). Panel configs live in `PANEL_CONFIGS` array in `panels.ts`.

The centered Copland login panel (`copland.ts` for ASCII art, `boot.ts` for typewriter sequence) runs a character-by-character boot animation driven by `BOOT_LINES` config.

### Page content

`App.tsx` renders `<WiredBackground />` then a `<main>` with placeholder sections (hero spacer, About, Projects) that scroll over the background. Content sections use inline Tailwind classes with a rose/magenta color scheme (`#c89098`, `#e0b0b8`, `#08040a`).

### Styling split

- **Bespoke panel/background visuals:** `WiredBackground.css` (plain CSS — shadows, glows, monospace ASCII layout)
- **Page content layout:** Tailwind utility classes in JSX

## Key conventions

- Panel content builders in `content.ts` are pure functions returning strings — no DOM side effects, which keeps them testable
- The `WiredBackground` component manages all DOM panel lifecycle imperatively inside a single `useEffect` (create, animate in, refresh on interval, despawn with fade-out, cleanup on unmount)
- Color palette is rose/magenta on near-black: primary accent `#c04070`/`#d04070`, text `#c89098`/`#e0b0b8`, background `#08040a`
