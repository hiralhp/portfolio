// ─── Project Data Schema ─────────────────────────────────────────────────────
// This is the source of truth for what a project looks like.
// To add a new project, edit src/data/projects.ts and follow this shape.

export type ProjectStatus = 'Live' | 'In Progress' | 'Case Study' | 'Archived'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string

  /** Used in the URL: /projects/[slug] */
  slug: string

  title: string
  shortDescription: string

  /** Full markdown-ish description shown on the detail page */
  description?: string

  /**
   * Path to image in /public, e.g. "/images/projects/nexus.jpg"
   * If omitted, the gradient fallback is used.
   */
  image?: string

  /**
   * Tailwind gradient color classes (from-* via-* to-*).
   * Used when no image is provided.
   * Example: "from-violet-900 via-purple-950 to-indigo-950"
   */
  gradient?: string

  tags: string[]
  status?: ProjectStatus

  /** Featured projects get more prominent placement */
  featured?: boolean

  /** Display year, e.g. "2024" */
  date?: string

  links?: {
    primary?: ProjectLink
    secondary?: ProjectLink
  }
}
