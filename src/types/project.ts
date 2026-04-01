// ─── Project Data Schema ─────────────────────────────────────────────────────

export type ProjectStatus = 'Live' | 'In Progress' | 'Case Study' | 'Archived'

export interface ProjectLink {
  label: string
  url: string
}

export interface GalleryImage {
  src: string
  caption?: string
}

export interface Project {
  id: string

  /** Used in the URL: /projects/[slug] */
  slug: string

  title: string
  shortDescription: string

  /** Full description shown on the detail page (paragraphs separated by \n\n) */
  description?: string

  /** Path to header image in /public, e.g. "/images/projects/nexus.jpg" */
  image?: string

  /** Additional images shown in a gallery on the detail page */
  gallery?: GalleryImage[]

  /**
   * Tailwind gradient used when no image is provided.
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
