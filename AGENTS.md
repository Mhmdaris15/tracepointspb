<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-context -->
# TracePoint SPB — Project Context

## What This Is
A production landing page for **TracePoint SPB**, a flyer distribution & web development startup based in Saint Petersburg, Russia. Dark-mode glassmorphism aesthetic with Framer Motion animations.

## Tech Stack
- **Next.js 16** (App Router, static export via `output: 'export'`)
- **TypeScript 5**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in globals.css, NO tailwind.config file
- **Framer Motion v12** — all animated components require `'use client'`
- **Deployed**: GitHub Pages at `https://mhmdaris15.github.io/tracepointspb`

## Architecture
```
app/
  page.tsx          ← Server Component, renders <LandingPage />
  layout.tsx        ← Sets metadata, imports Geist font + globals.css
  globals.css       ← Tailwind v4 import + custom CSS (glass, gradient-text, keyframes)
  lib/
    content.ts      ← ALL copy for EN + RU. Edit here for translations.
                       Also exports `contact` (email/telegram) used site-wide.
  components/
    LandingPage.tsx ← 'use client' — holds locale state (EN↔RU), AnimatePresence wrapper
    MeshBackground  ← Fixed animated gradient orbs + grid overlay
    Navbar          ← Glass navbar with scroll blur + LanguageSwitcher
    LanguageSwitcher← EN/RU toggle button
    HeroSection     ← Full-screen hero, staggered entrance animations
    FeaturesSection ← 3 glassmorphism cards (key/camera/network icons)
    PlansSection    ← 2 service cards: Flyer Distribution + Website Development
    StatsSection    ← Animated number counters (useSpring + useInView)
    ProcessSection  ← 4-step timeline, scroll-driven connector line
    CTASection      ← Contact section with Telegram + Email buttons
    Footer          ← 3-column: brand / nav / contact info
```

## i18n Pattern
- All text lives in `app/lib/content.ts` under `content.en` and `content.ru`
- `LandingPage.tsx` holds `locale` state, toggled by the navbar `LanguageSwitcher`
- To add a language: add a new key to `Locale` type and a matching block in `content`
- Page fades out/in via `AnimatePresence mode="wait"` on locale change

## Contact Info (in `app/lib/content.ts` → `contact` export)
- Email: `muhammadaris1945@gmail.com`
- Telegram: `+79810409453` → `https://t.me/+79810409453`

## Deployment
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` branch
- Build: `npm ci && npm run build` → outputs to `./out`
- Deploys via `actions/deploy-pages` to the `github-pages` environment
- **Requires**: Repo Settings → Pages → Source → "GitHub Actions"
- basePath is `/tracepointspb` (set in next.config.ts)

## Key Conventions
- Every component that uses hooks or Framer Motion needs `'use client'` at the top
- Tailwind v4: use arbitrary values like `bg-[#080b14]` freely, NO config file needed
- Glassmorphism pattern: `backdrop-filter: blur(Xpx)` + `rgba` bg + colored border
- Framer Motion ease bezier arrays need `as [number, number, number, number]` cast for TS
- `next/image` is NOT used in this project (static export, no optimization needed)
- Google Fonts (Geist) are fetched at build time — works fine with static export
<!-- END:project-context -->
