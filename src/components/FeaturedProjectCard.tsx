'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Project } from '@/types/project'
import StatusBadge from './StatusBadge'

interface FeaturedProjectCardProps {
  project: Project
  index?: number
  /** Flip the layout (image right, text left) on alternating cards */
  reversed?: boolean
}

export default function FeaturedProjectCard({
  project,
  index = 0,
  reversed = false,
}: FeaturedProjectCardProps) {
  const hasImage = Boolean(project.image)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`group grid md:grid-cols-2 gap-0 bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:border-black/[0.1] transition-all duration-300 hover:shadow-[0_12px_60px_rgba(0,0,0,0.1)] ${reversed ? 'md:[&>*:first-child]:order-last' : ''}`}
    >
      {/* Image / Gradient */}
      <Link
        href={`/projects/${project.slug}`}
        className="block relative overflow-hidden aspect-video md:aspect-auto md:min-h-[260px]"
      >
        {hasImage ? (
          <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient ?? 'from-zinc-200 to-zinc-300'} group-hover:scale-[1.03] transition-transform duration-700`}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
                backgroundSize: '28px 28px',
              }}
            />
            {/* Decorative floating element */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-48 h-48 rounded-full border border-white/20" />
              <div className="absolute w-28 h-28 rounded-full border border-white/20" />
            </div>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 sm:p-10">
        {/* Featured label */}
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">
            Featured
          </span>
          {project.status && <StatusBadge status={project.status} />}
        </div>

        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 hover:text-black transition-colors mb-3 leading-tight">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
          {project.shortDescription}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs text-zinc-500 border border-black/[0.07] rounded-lg bg-black/[0.03]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3">
          {project.links?.primary && (
            <a
              href={project.links.primary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-zinc-50 text-sm font-semibold rounded-lg hover:bg-black transition-colors"
            >
              {project.links.primary.label}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.links?.secondary && (
            <a
              href={project.links.secondary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 border border-black/[0.08] hover:border-black/[0.15] rounded-lg hover:bg-black/[0.04] transition-all"
            >
              {project.links.secondary.label}
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            Case details
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
