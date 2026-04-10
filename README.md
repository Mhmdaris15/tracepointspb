# TracePoint SPB

High-performance landing page for **TracePoint SPB** — a data-driven flyer distribution & web development startup based in Saint Petersburg, Russia.

**Live site:** [mhmdaris15.github.io/tracepointspb](https://mhmdaris15.github.io/tracepointspb)

---

## Features

- **Dark glassmorphism design** — animated mesh gradients, frosted glass cards, glint sweep effects
- **Framer Motion animations** — reveal-on-scroll, spring-physics counters, scroll-driven timeline
- **Bilingual (EN / RU)** — switch languages instantly via the navbar toggle; page fades and all text swaps
- **Two services showcased** — Flyer Distribution + Website Development
- **Contact ready** — Telegram and email buttons linked directly in CTA and footer

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js (App Router) | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 |
| Framer Motion | 12 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.tsx              # Entry point (Server Component)
├── layout.tsx            # Root layout + metadata
├── globals.css           # Tailwind v4 import + custom animations/glassmorphism
├── lib/
│   └── content.ts        # ALL copy for EN + RU — edit here to update any text
└── components/
    ├── LandingPage.tsx   # Client wrapper — holds locale (EN↔RU) state
    ├── MeshBackground.tsx
    ├── Navbar.tsx
    ├── LanguageSwitcher.tsx
    ├── HeroSection.tsx
    ├── FeaturesSection.tsx
    ├── PlansSection.tsx
    ├── StatsSection.tsx
    ├── ProcessSection.tsx
    ├── CTASection.tsx
    └── Footer.tsx
```

## Editing Content

All text lives in [`app/lib/content.ts`](app/lib/content.ts). Edit `content.en` or `content.ru` — the change reflects across the whole site automatically.

**Contact details** (email, Telegram) are in the `contact` export at the top of that file.

## Adding a New Language

1. Add the locale to the `Locale` type: `export type Locale = 'en' | 'ru' | 'de'`
2. Add a matching block `de: { ... }` in the `content` object (copy the `en` block as a template)
3. Update `LandingPage.tsx` if you want a multi-locale dropdown instead of a two-way toggle

## Deployment

Deployed to **GitHub Pages** via GitHub Actions on every push to `main`.

### First-time setup (do once)

1. Go to your repo → **Settings → Pages**
2. Under **Source**, select **"GitHub Actions"**
3. Push to `main` — the action runs, and the site goes live in ~2 minutes

### Manual trigger

Go to **Actions → Deploy to GitHub Pages → Run workflow**.

### Build locally (preview the static export)

```bash
npm run build   # outputs static files to ./out
npx serve out   # preview at http://localhost:3000
```

## Contact

| Channel | Details |
|---------|---------|
| Email | [muhammadaris1945@gmail.com](mailto:muhammadaris1945@gmail.com) |
| Telegram | [+79810409453](https://t.me/+79810409453) |
| Location | Saint Petersburg, Russia |
