## Vision

A premium, dark-mode agency site that feels like a piece of interactive art: real-time WebGL fluid simulation in the hero, a magnetic morphing cursor, buttery Lenis smooth scroll, kinetic typography, and liquid page transitions between routes. Built for 60fps on a laptop, graceful on mobile.

## Design system

- **Palette**: Obsidian `#0B0C10` base, Charcoal `#1F2833` surfaces, Electric Cyan `#66FCF1` accent, Liquid Silver gradient (`#C8CCD1 → #FFFFFF → #6B7280`) for headlines and chrome details. Subtle cyan glow via `box-shadow` + `filter: drop-shadow`.
- **Typography**: Clash Display (headings, 600/700), Space Grotesk (body), JetBrains Mono (micro-labels / time widget). Loaded via Fontshare + Google Fonts.
- **Grid**: Asymmetric 12-col with generous negative space, overlapping z-layers, oversized numerals as section markers ("01 — Services").
- **Motion language**: easing `cubic-bezier(0.16, 1, 0.3, 1)`, durations 400–900ms, staggered reveals, GPU-only transforms.

## Site structure (routes)

```text
/                   Home / landing
/work               Portfolio index (list on desktop, carousel on mobile)
/work/$slug         Case study detail with its own hero + gallery
/services           Services / capabilities
/about              Philosophy + team
/contact            Contact + magnetic CTA
```

Each route gets its own `head()` metadata (title, description, og:title, og:description). Hero/case study images feed og:image on leaf routes.

## Global shell

- **Custom cursor**: two-layer (dot + ring), magnetic snap to `[data-cursor="magnetic"]` elements, color-invert (`mix-blend-mode: difference`) over images, morphs into "VIEW" / "DRAG" label on interactive targets. Hidden on touch devices; native cursor restored.
- **Lenis smooth scroll** driving a global RAF; all scroll animations hook into Lenis (not native scroll) to stay in sync with the cursor + WebGL.
- **Glassmorphism nav**: sticky, `backdrop-blur`, thin cyan hairline, logo mark left, minimal route links + hamburger. Hamburger opens a full-screen overlay with staggered link reveals, oversized Clash Display links with hover image previews, social links, and local time.
- **Page transitions**: liquid/geometric wipe using a fixed full-viewport SVG clip-path + cyan shimmer layer, triggered on route change via TanStack Router's location listener. ~700ms total; content fades up behind the wipe.
- **Preloader** (first visit only): centered counter 00→100 with a cyan progress bar, then the wipe reveals the hero.

## Page-by-page

**Home (`/`)**
- **Hero**: WebGL fluid simulation (real-time Navier–Stokes via a ping-pong FBO shader, cursor velocity injects cyan pigment over obsidian). Headline "We Build The Future of the Web." in Clash Display, kinetic line reveal (mask + translateY per line). Magnetic "Start a Project" CTA with glowing trail. Bottom row: scroll hint, local time, coordinates micro-label.
- **Marquee strip**: infinite horizontal tape of service keywords ("WEBGL / 3D / E-COMMERCE / BRANDING / MOTION") with cyan separators.
- **Featured work teaser**: 3 projects as list rows; hover swaps the background to the project image with a liquid distortion shader (WebGL plane with displacement map).
- **Philosophy snippet**: kinetic typography — lines subtly rotate/skew on scroll, pinned section.
- **Final CTA + footer**.

**Work (`/work`)**
- **Desktop**: vertical list of project names (huge Clash Display). Hover reveals the project's hero media in a floating WebGL plane near the cursor with liquid distortion; click triggers liquid wipe into the case study.
- **Mobile**: horizontal snap carousel of large image cards with parallax captions.
- Filter chips (All / 3D / E-com / Brand) with animated underline.

**Work detail (`/work/$slug`)**
- Full-bleed hero image with parallax, project meta (client, year, role, stack).
- Long-form sections: challenge, approach, gallery (scroll-triggered scale-ins), outcome metrics (count-up numbers).
- Prev/next project with magnetic hover.

**Services (`/services`)**
- Sticky-scroll accordion: left column stays pinned with big numeral + title, right column scrolls through capability cards (UI/UX, 3D & WebGL, E-commerce, Brand Systems, Motion, Dev). Each card has its own cyan icon and deliverables list.

**About (`/about`)**
- Kinetic typography manifesto (text shifts/rotates subtly on scroll).
- Team grid: portraits with hover distortion and role labels.
- Timeline/awards strip.

**Contact (`/contact`)**
- Massive "Let's Talk." headline, kinetic reveal.
- Form (name, email, budget select, message) with floating labels, cyan focus glow, magnetic submit.
- Sidebar: email, studio locations with local times, magnetic social links.

**Footer (every page)**
- Oversized "LET'S TALK" with magnetic arrow, email, local time widget (updates every second), socials, year + colophon.

## Placeholder content

I'll seed with clearly-marked placeholders (e.g. `NOCTURNE ▸ replace`) for agency name, tagline, 6 project case studies (titles, clients, years, 1–2 paragraph descriptions), services copy, and about manifesto. You can swap them in after approval — the code structure won't change.

## Technical notes

- **Stack**: TanStack Start + React 19, Tailwind v4 (existing `styles.css`), new tokens added for obsidian/charcoal/cyan + silver gradient.
- **Libraries to add**: `three`, `@react-three/fiber`, `@react-three/drei`, `lenis`, `gsap` (+ ScrollTrigger), `split-type` (line/char splitting). All client-only; heavy WebGL components wrapped in `ClientOnly` guards to avoid SSR issues on the Worker runtime.
- **Fluid sim**: custom GLSL (advection / divergence / pressure / gradient-subtract passes) on a half-resolution FBO for perf; DPR capped at 1.5; auto-pauses when tab hidden or reduced-motion is set.
- **Perf budget**: transforms + opacity only for DOM animations; images as AVIF/WebP with `loading="lazy"`; WebGL canvases use `powerPreference: "high-performance"` and dispose on unmount. Graceful fallback (static gradient hero) when `navigator.gpu`/WebGL2 unavailable or `prefers-reduced-motion: reduce`.
- **SEO/SSR**: each route defines its own `head()`; WebGL and cursor only mount client-side so SSR HTML stays clean.
- **Accessibility**: full keyboard nav, visible focus rings (cyan), reduced-motion disables fluid sim + parallax, cursor hidden for touch/keyboard users.

## Deliverables in the first build

1. Design tokens + fonts wired up in `styles.css`.
2. Global shell: Lenis provider, custom cursor, glass nav + full-screen menu, page-transition layer, footer.
3. All six routes with real layouts and scroll animations.
4. WebGL fluid hero + WebGL liquid-distortion hover for work list.
5. Placeholder copy + 6 placeholder project entries (swap-ready).

Paste the agency name, tagline, services copy, and project list whenever ready — I can apply them in a quick follow-up pass without touching the structure.