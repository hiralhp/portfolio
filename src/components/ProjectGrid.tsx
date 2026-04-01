'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'
import FeaturedProjectCard from './FeaturedProjectCard'

interface ProjectGridProps {
  projects: Project[]
  allTags: string[]
}

export default function ProjectGrid({ projects, allTags }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured),
    [projects]
  )

  const regularProjects = useMemo(
    () => projects.filter((p) => !p.featured),
    [projects]
  )

  const filteredFeatured = useMemo(
    () =>
      activeTag
        ? featuredProjects.filter((p) => p.tags.includes(activeTag))
        : featuredProjects,
    [featuredProjects, activeTag]
  )

  const filteredRegular = useMemo(
    () =>
      activeTag
        ? regularProjects.filter((p) => p.tags.includes(activeTag))
        : regularProjects,
    [regularProjects, activeTag]
  )

  const totalVisible = filteredFeatured.length + filteredRegular.length

  return (
    <section id="projects" className="py-28 sm:py-36 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase mb-3">
            Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
            Selected Projects
          </h2>
        </motion.div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                activeTag === null
                  ? 'bg-zinc-50 text-zinc-950 border-transparent'
                  : 'text-zinc-400 border-white/[0.08] hover:border-white/[0.15] hover:text-zinc-200 bg-transparent'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-zinc-50 text-zinc-950 border-transparent'
                    : 'text-zinc-400 border-white/[0.08] hover:border-white/[0.15] hover:text-zinc-200 bg-transparent'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {totalVisible === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="py-24 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-5 h-5 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-sm text-zinc-500">
                No projects tagged with{' '}
                <span className="text-zinc-300">{activeTag}</span>
              </p>
              <button
                onClick={() => setActiveTag(null)}
                className="mt-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-4"
              >
                Clear filter
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Featured projects */}
              {filteredFeatured.length > 0 && (
                <div className="space-y-4 mb-4">
                  {filteredFeatured.map((project, i) => (
                    <FeaturedProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      reversed={i % 2 === 1}
                    />
                  ))}
                </div>
              )}

              {/* Regular grid */}
              {filteredRegular.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRegular.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zero-project initial empty state (before any projects are added) */}
        {projects.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-7 h-7 text-zinc-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">
              Projects coming soon
            </h3>
            <p className="text-sm text-zinc-600 max-w-xs mx-auto">
              Edit <code className="text-zinc-500 font-mono">src/data/projects.ts</code> to add
              your first project.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
