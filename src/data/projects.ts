// ─── Projects Data ────────────────────────────────────────────────────────────
//
// HOW TO ADD A NEW PROJECT
// ────────────────────────
// 1. Copy one of the objects below and paste it at the top of the array.
// 2. Fill in the fields. Only id, slug, title, and shortDescription are required.
// 3. To add a preview image:
//    - Drop the image into /public/images/projects/ (e.g. my-project.jpg)
//    - Set image: "/images/projects/my-project.jpg"
//    - Recommended size: 1200×675px (16:9) or 1200×900px (4:3)
// 4. If no image, set gradient to a Tailwind gradient string (see examples below).
// 5. Run `npm run dev` to preview, then deploy.
//
// FIELDS REFERENCE
// ────────────────
// id           → unique string, no spaces
// slug         → URL-safe string (letters, numbers, hyphens only)
// title        → display name
// shortDescription → 1–2 sentences, shown on cards
// description  → longer text shown on detail page (optional)
// image        → path from /public, e.g. "/images/projects/foo.jpg"
// gradient     → Tailwind gradient classes used if no image
// tags         → string array, used for filtering
// status       → "Live" | "In Progress" | "Case Study" | "Archived"
// featured     → true to show at top with prominent treatment
// date         → display string, e.g. "2024"
// links.primary   → main CTA (View Live, Open App, etc.)
// links.secondary → optional second link (GitHub, Docs, etc.)

import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'nexus',
    slug: 'nexus',
    title: 'Nexus',
    shortDescription:
      'An AI-powered productivity dashboard that learns your workflow and surfaces what matters most.',
    description: `Nexus is a next-generation productivity platform built around the idea that your tools should adapt to you — not the other way around.

It integrates with your calendar, email, and project management tools, then uses a fine-tuned language model to prioritize your day, draft responses, and surface relevant context at the right moment.

The AI layer uses a retrieval-augmented generation (RAG) pipeline that builds a personal knowledge graph over time. The more you use it, the more accurate it becomes.

Built with React, TypeScript, and a custom Node.js backend. Deployed on Vercel with edge functions for low-latency inference.`,
    gradient: 'from-violet-900 via-purple-950 to-indigo-950',
    tags: ['React', 'TypeScript', 'AI/ML', 'Node.js'],
    status: 'Live',
    featured: true,
    date: '2024',
    links: {
      primary: { label: 'View Live', url: '#' },
      secondary: { label: 'GitHub', url: '#' },
    },
  },
  {
    id: 'forma',
    slug: 'forma',
    title: 'Forma',
    shortDescription:
      'A comprehensive design system and component library for building consistent product interfaces at scale.',
    description: `Forma is a design system built for teams who care about consistency and velocity. It provides a complete set of accessible, composable components that map directly to design tokens.

The library ships with full Storybook documentation, automated visual regression tests, and a Figma token sync workflow. Every component is fully typed, tree-shakable, and tested across browsers and assistive technologies.

The token architecture follows a three-tier model: primitive → semantic → component-specific. This makes theming straightforward and prevents token coupling.

Built to support teams from early-stage startups to enterprise products without sacrificing developer experience.`,
    gradient: 'from-zinc-700 via-zinc-800 to-zinc-900',
    tags: ['TypeScript', 'Storybook', 'CSS', 'Design Systems'],
    status: 'Live',
    featured: true,
    date: '2024',
    links: {
      primary: { label: 'View Docs', url: '#' },
      secondary: { label: 'GitHub', url: '#' },
    },
  },
  {
    id: 'relay',
    slug: 'relay',
    title: 'Relay',
    shortDescription:
      'Real-time collaborative workspace with multiplayer editing, presence awareness, and structured async communication.',
    description: `Relay reimagines how distributed teams collaborate. It combines a real-time document editor with threaded discussions, task tracking, and video presence — all in a single, minimal interface.

Built on a WebSocket-based CRDT engine for conflict-free collaborative editing. Multiple users can edit simultaneously with no conflicts and instant sync across all connected clients.

The backend uses PostgreSQL with Redis for pub/sub, deployed on Railway. The frontend is a Next.js app with a custom canvas-based rich text editor.

Currently in active development with a small beta group. Sign up to get early access.`,
    gradient: 'from-teal-900 via-cyan-950 to-slate-950',
    tags: ['Next.js', 'WebSockets', 'PostgreSQL', 'Redis'],
    status: 'In Progress',
    date: '2025',
    links: {
      primary: { label: 'Join Waitlist', url: '#' },
      secondary: { label: 'GitHub', url: '#' },
    },
  },
  {
    id: 'beacon',
    slug: 'beacon',
    title: 'Beacon',
    shortDescription:
      'Product analytics platform focused on user journey visualization and conversion funnel analysis.',
    description: `Beacon gives product teams clarity on how users actually move through their product. Instead of aggregate metrics, it visualizes individual user journeys and surfaces the paths that lead to conversion — or drop-off.

The visualization layer is built with D3.js on a custom canvas renderer for performance with large datasets. Typical deployments handle 10M+ events per day with sub-second query response times.

The backend is a Node.js service ingesting events via a lightweight client SDK (~2kb gzipped). Events flow through a Kafka pipeline into ClickHouse for analytics storage.

This project is fully documented as a case study exploring the technical and product decisions made along the way.`,
    gradient: 'from-blue-900 via-indigo-950 to-slate-950',
    tags: ['React', 'D3.js', 'Node.js', 'ClickHouse'],
    status: 'Case Study',
    date: '2023',
    links: {
      primary: { label: 'Read Case Study', url: '#' },
    },
  },
  {
    id: 'mint',
    slug: 'mint',
    title: 'Mint',
    shortDescription:
      'Personal finance tracker with automatic categorization, spending insights, and a beautiful mobile interface.',
    description: `Mint is a personal finance app built for people who want clarity on their spending without the noise of a complex tool.

It connects to bank accounts via the Plaid API, automatically categorizes transactions using a rules engine layered with an ML classifier, and surfaces weekly spending summaries in a clean mobile interface.

The categorization model was trained on a labeled dataset of 200k+ transactions and achieves 94% accuracy out of the box, improving further with user corrections over time.

Built with React Native and Expo for cross-platform delivery. The backend runs on Supabase with edge functions for real-time transaction processing and push notification delivery.`,
    gradient: 'from-emerald-900 via-green-950 to-teal-950',
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    status: 'Live',
    date: '2023',
    links: {
      primary: { label: 'App Store', url: '#' },
      secondary: { label: 'GitHub', url: '#' },
    },
  },
  {
    id: 'echo',
    slug: 'echo',
    title: 'Echo',
    shortDescription:
      'Interactive audio visualizer that generates reactive 3D environments from music using WebGL and the Web Audio API.',
    description: `Echo is a creative experiment at the intersection of music and real-time graphics. It uses the Web Audio API to analyze frequency and amplitude data, then drives a Three.js scene with reactive GLSL shaders.

The result is a unique visual environment for every song — particles, geometry, and lighting all respond to the music in real time. Different frequency bands control different visual parameters: bass drives geometry scale, mids influence color, and highs control particle behavior.

Runs entirely in the browser with no server required. Supports file upload, microphone input, and a curated set of built-in tracks.

Built as an exploration of creative coding and browser-native graphics capabilities.`,
    gradient: 'from-rose-900 via-pink-950 to-purple-950',
    tags: ['WebGL', 'Three.js', 'Web Audio API', 'GLSL'],
    status: 'Live',
    date: '2023',
    links: {
      primary: { label: 'Open App', url: '#' },
      secondary: { label: 'GitHub', url: '#' },
    },
  },
]

// ─── Utility Helpers ─────────────────────────────────────────────────────────

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured)

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const getAllTags = (): string[] => {
  const tags = new Set<string>()
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}
