# Portfolio

A minimal, premium personal portfolio built with Next.js 15, Tailwind CSS v4, and Framer Motion.

## Quick Start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Personalizing the Site

### 1. Update your name, role, and intro

Edit the constants at the top of each file:

| File | What to update |
|------|---------------|
| `src/components/Hero.tsx` | Name, role, tagline, availability status |
| `src/components/About.tsx` | Name, bio paragraphs, highlights, tech stack |
| `src/components/Contact.tsx` | Email, GitHub, LinkedIn, Twitter URLs |
| `src/components/Navigation.tsx` | Name shown in the nav bar |
| `src/components/Footer.tsx` | Name in the footer |
| `src/app/layout.tsx` | Page title and SEO meta description |

---

## Adding a New Project

**1. Open `src/data/projects.ts`**

**2. Add a new object to the `projects` array** (paste at the top to show it first):

```typescript
{
  id: 'my-project',           // unique string, no spaces
  slug: 'my-project',         // appears in URL: /projects/my-project
  title: 'My Project',
  shortDescription: 'One or two sentences shown on the card.',
  description: `Full description shown on the detail page.

You can use multiple paragraphs — just separate them with a blank line.

Each paragraph renders as its own <p> element.`,
  image: '/images/projects/my-project.jpg',  // optional — see below
  gradient: 'from-violet-900 via-purple-950 to-indigo-950', // fallback if no image
  tags: ['React', 'TypeScript'],
  status: 'Live',             // 'Live' | 'In Progress' | 'Case Study' | 'Archived'
  featured: false,            // true = shown prominently above the grid
  date: '2025',
  links: {
    primary: { label: 'View Live', url: 'https://your-project.com' },
    secondary: { label: 'GitHub', url: 'https://github.com/you/repo' },
  },
},
```

**3. Save the file** — the dev server hot-reloads instantly.

### Gradient options (when no image)

Pick any Tailwind gradient string for the card background. Examples:

```
from-violet-900 via-purple-950 to-indigo-950   ← purple/indigo
from-teal-900 via-cyan-950 to-slate-950         ← teal/cyan
from-blue-900 via-indigo-950 to-slate-950       ← blue
from-emerald-900 via-green-950 to-teal-950      ← green
from-rose-900 via-pink-950 to-purple-950        ← rose/pink
from-zinc-700 via-zinc-800 to-zinc-900          ← neutral
from-amber-900 via-orange-950 to-red-950        ← warm
```

---

## Adding Project Images

1. **Prepare your image** — recommended size: `1200 × 675px` (16:9) or `1200 × 900px` (4:3). JPG or WebP.
2. **Drop it into** `public/images/projects/`
3. **Reference it in your project data:**
   ```typescript
   image: '/images/projects/my-project.jpg',
   ```
4. The `gradient` field becomes the fallback if the image fails to load.

---

## Deployment

### Vercel (recommended — free, one click)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy — done. Vercel auto-detects Next.js.

### Adding a project after deploying

1. Edit `src/data/projects.ts` locally
2. Commit and push: `git add . && git commit -m "add project: X" && git push`
3. Vercel redeploys automatically in ~30 seconds

### Other hosts (Netlify, Cloudflare Pages, etc.)

```bash
npm run build    # produces .next/ output
```

Use the standard Next.js adapter for your host, or run `npm start` on a Node.js server.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout, metadata, fonts
│   ├── page.tsx                ← Home page (assembles all sections)
│   ├── globals.css             ← Global styles, Tailwind config
│   └── projects/[slug]/
│       └── page.tsx            ← Project detail page
├── components/
│   ├── Navigation.tsx          ← Sticky top nav
│   ├── Hero.tsx                ← Hero section
│   ├── ProjectGrid.tsx         ← Projects section with tag filter
│   ├── ProjectCard.tsx         ← Regular project card
│   ├── FeaturedProjectCard.tsx ← Large featured project card
│   ├── StatusBadge.tsx         ← Live / In Progress / etc. badge
│   ├── About.tsx               ← About section
│   ├── Contact.tsx             ← Contact links section
│   └── Footer.tsx              ← Footer
├── data/
│   └── projects.ts             ← ← ← EDIT THIS to add projects
├── types/
│   └── project.ts              ← TypeScript types for Project
public/
└── images/projects/            ← Drop project images here
```

---

## Admin / Editing

There is no CMS or admin route. The data file **is** the content management system.

- **Public visitors** see only the portfolio — no edit buttons, no auth, nothing to hide.
- **You** add projects by editing `src/data/projects.ts` and redeploying.
- Redeployment on Vercel takes ~30 seconds and is triggered automatically on `git push`.

This is intentional: it keeps the site fast, secure, and dependency-free.
