import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { projects, getProjectBySlug } from '@/data/projects'
import StatusBadge from '@/components/StatusBadge'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

// Pre-generate all project pages at build time
export async function generateStaticParams() {
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Hiral Patel`,
    description: project.shortDescription,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const hasImage = Boolean(project.image)
  // Split description into paragraphs for clean rendering
  const paragraphs = project.description?.split('\n\n').filter(Boolean) ?? []

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero image / gradient */}
        <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] overflow-hidden">
          {hasImage ? (
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient ?? 'from-zinc-800 to-zinc-900'}`}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
                  backgroundSize: '28px 28px',
                }}
              />
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-96 h-96 rounded-full border border-white/20" />
                <div className="absolute w-64 h-64 rounded-full border border-white/20" />
                <div className="absolute w-32 h-32 rounded-full border border-white/20" />
              </div>
            </div>
          )}
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-10">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-700 transition-colors mb-8 group"
          >
            <svg
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>

          {/* Title block */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.status && <StatusBadge status={project.status} />}
              {project.date && (
                <span className="text-xs text-zinc-400 font-medium">{project.date}</span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-4 leading-tight">
              {project.title}
            </h1>

            <p className="text-lg text-zinc-600 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-black/[0.06]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-600 border border-black/[0.08] rounded-lg bg-black/[0.03]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {paragraphs.length > 0 && (
            <div className="space-y-5 mb-12">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-base text-zinc-600 leading-[1.8]">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.filter(g => g.src).length > 0 && (
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-5">Gallery</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.gallery.filter(g => g.src).map((img, i) => (
                  <figure key={i} className="space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100">
                      <Image
                        src={img.src}
                        alt={img.caption ?? `Gallery image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="text-xs text-zinc-400 leading-relaxed px-0.5">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.links?.primary || project.links?.secondary) && (
            <div className="flex flex-wrap gap-3 pb-20">
              {project.links.primary && (
                <a
                  href={project.links.primary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-zinc-50 text-sm font-semibold rounded-xl hover:bg-black transition-colors"
                >
                  {project.links.primary.label}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {project.links.secondary && (
                <a
                  href={project.links.secondary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-600 border border-black/[0.1] hover:border-black/[0.2] hover:text-zinc-900 rounded-xl hover:bg-black/[0.04] transition-all"
                >
                  {project.links.secondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
