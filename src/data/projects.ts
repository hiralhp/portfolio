import { Project } from '@/types/project'
import projectsData from './projects-data.json'

export const projects: Project[] = projectsData as Project[]

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
