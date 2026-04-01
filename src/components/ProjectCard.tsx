'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Project } from '@/types/project'
import StatusBadge from './StatusBadge'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const hasImage = Boolean(project.image)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative flex flex-col bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:border-black/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
    >
      {/* Image / Gradient */}
      <Link href={`/projects/${project.slug}`} className="block shrink-0">
        <div className="relative aspect-video overflow-hidden">
          {hasImage ? (
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient ?? 'from-zinc-200 to-zinc-300'} group-hover:scale-[1.04] transition-transform duration-500`}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />
            </div>
          )}

          {/* Status badge overlay */}
          {project.status && (
            <div className="absolute bottom-3 left-3">
              <StatusBadge status={project.status} />
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 text-xs font-medium text-zinc-700 bg-white/70 border border-black/10 rounded-full backdrop-blur-sm">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          {project.date && (
            <span className="text-xs text-zinc-400 font-medium">{project.date}</span>
          )}
        </div>

        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-black transition-colors mb-2 tracking-tight">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.shortDescription}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs text-zinc-500 border border-black/[0.07] rounded-md bg-black/[0.03]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA row */}
        <div className="flex items-center gap-3 pt-1 border-t border-black/[0.06]">
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 pt-3"
          >
            View Details
            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {project.links?.primary && (
            <a
              href={project.links.primary.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto text-xs font-medium text-zinc-700 bg-black/[0.05] hover:bg-black/[0.1] border border-black/[0.08] px-3 py-1.5 mt-2 rounded-lg transition-all flex items-center gap-1.5"
            >
              {project.links.primary.label}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
