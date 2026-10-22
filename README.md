# SF Startup Labs — landing page

Next.js (App Router) + GSAP + Lenis.

```bash
npm install
npm run dev   # http://localhost:3000
```

Design references: HIFI (black technical sections, acid accent, hairline tables, scroll-lit text, sticky panels) and Jeton (brand-colour panels, oversized headlines, floating cards, coloured word stack, phone stepper, pill dock).

- `components/Hero.tsx` — orange photo panel; the scribble draws itself into the bridge
- `components/White.tsx` — statement with floating mentor cards; Pitch / Raise / Land word stack
- `components/Dark.tsx` — pipeline table, "included" horizon grid, people + roster, sticky support panels
- `components/Cinema.tsx` — preloader curtain, cursor ring, magnetic buttons
- `components/Scenes.tsx` — pinned wipe sequence (Pitch/Raise/Land), scroll-driven numbers band, horizontal schedule
- `components/Stepper.tsx` — five-step apply flow in a phone
- `components/Rest.tsx` — photo panel, fit, FAQ, closing bridge, footer
- `lib/data.ts` — mentors, photos, FAQ. Photos load from https://sfstartuplabs.com; copy them into `public/` before launch.

## Before you send it
Edit `lib/profile.ts` (name, role, email, portfolio, GitHub). It feeds the "Concept by …" pill and the build-notes drawer.

- `components/HeroGL.tsx` — OGL shader: cursor-driven liquid push, RGB split, duotone grade
- `app/api/img/route.ts` — same-origin image route so WebGL can use photos from sfstartuplabs.com
- `components/Concept.tsx` — build-notes drawer
