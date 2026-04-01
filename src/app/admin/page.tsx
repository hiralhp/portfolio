'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectLink { label: string; url: string }
interface GalleryImage { src: string; caption?: string }

interface ProjectData {
  id: string
  slug: string
  title: string
  shortDescription: string
  description?: string
  image?: string
  gallery?: GalleryImage[]
  gradient?: string
  tags: string[]
  status?: 'Live' | 'In Progress' | 'Case Study' | 'Archived'
  featured?: boolean
  date?: string
  links?: { primary?: ProjectLink; secondary?: ProjectLink }
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls =
  'w-full px-3 py-2 text-sm text-zinc-900 border border-black/[0.1] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/[0.12] placeholder:text-zinc-300'
const textareaCls = inputCls + ' resize-none'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
      {children}
    </p>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label>{label}</Label>{children}</div>
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button type="button" onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-zinc-200'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
      <span className="text-sm text-zinc-600">{label}</span>
    </label>
  )
}

// ─── Image upload field ───────────────────────────────────────────────────────

function ImageUpload({ value, onChange, compact = false }: {
  value: string
  onChange: (path: string) => void
  compact?: boolean
}) {
  const [uploading, setUploading] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.path) onChange(data.path)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {value && !compact && (
        <div className="relative aspect-video max-w-xs rounded-xl overflow-hidden bg-zinc-100 group border border-black/[0.06]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="object-cover w-full h-full" />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm text-sm">
            ×
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input className={inputCls + ' flex-1'} placeholder="/images/projects/photo.jpg"
          value={value} onChange={e => onChange(e.target.value)} />
        <label className={`shrink-0 px-3 py-2 text-xs font-medium border border-black/[0.08] rounded-lg cursor-pointer transition-colors ${uploading ? 'opacity-40' : 'text-zinc-600 hover:bg-zinc-50'}`}>
          {uploading ? '…' : 'Upload'}
          <input type="file" accept="image/*" className="sr-only" disabled={uploading}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
        </label>
      </div>
    </div>
  )
}

// ─── Project editor card ──────────────────────────────────────────────────────

function ProjectEditor({ project, isOpen, onToggle, onChange, onDelete }: {
  project: ProjectData
  isOpen: boolean
  onToggle: () => void
  onChange: (p: ProjectData) => void
  onDelete: () => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const setPrimary = (field: keyof ProjectLink, value: string) =>
    onChange({ ...project, links: { ...project.links, primary: { label: project.links?.primary?.label ?? '', url: project.links?.primary?.url ?? '', [field]: value } } })

  const setSecondary = (field: keyof ProjectLink, value: string) =>
    onChange({ ...project, links: { ...project.links, secondary: { label: project.links?.secondary?.label ?? '', url: project.links?.secondary?.url ?? '', [field]: value } } })

  const gallery = project.gallery ?? []

  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      {/* Header row */}
      <button type="button"
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-zinc-50 transition-colors"
        onClick={onToggle}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-zinc-900 truncate">{project.title || 'Untitled Project'}</span>
            {project.featured && <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">Featured</span>}
            {project.status && <span className="text-xs text-zinc-400">{project.status}</span>}
            {project.date && <span className="text-xs text-zinc-300">{project.date}</span>}
          </div>
          {!isOpen && project.shortDescription && (
            <p className="text-xs text-zinc-400 truncate mt-0.5">{project.shortDescription}</p>
          )}
        </div>
        <svg className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Edit form */}
      {isOpen && (
        <div className="border-t border-black/[0.05] p-5 space-y-5">

          {/* Title + Slug */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input className={inputCls} value={project.title}
                onChange={e => {
                  const title = e.target.value
                  const autoSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  onChange({ ...project, title, slug: project.slug === project.id ? autoSlug : project.slug })
                }} />
            </Field>
            <Field label="Slug (URL)">
              <input className={inputCls} value={project.slug}
                onChange={e => onChange({ ...project, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} />
            </Field>
          </div>

          {/* Descriptions */}
          <Field label="Short Description">
            <textarea className={textareaCls} rows={2} value={project.shortDescription}
              onChange={e => onChange({ ...project, shortDescription: e.target.value })} />
          </Field>
          <Field label="Full Description (detail page)">
            <textarea className={textareaCls} rows={6}
              placeholder="Separate paragraphs with a blank line."
              value={project.description ?? ''}
              onChange={e => onChange({ ...project, description: e.target.value })} />
          </Field>

          {/* Status / Date / Featured */}
          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <Field label="Status">
              <select className={inputCls} value={project.status ?? ''}
                onChange={e => onChange({ ...project, status: (e.target.value || undefined) as ProjectData['status'] })}>
                <option value="">None</option>
                <option value="Live">Live</option>
                <option value="In Progress">In Progress</option>
                <option value="Case Study">Case Study</option>
                <option value="Archived">Archived</option>
              </select>
            </Field>
            <Field label="Year">
              <input className={inputCls} placeholder="2024" value={project.date ?? ''}
                onChange={e => onChange({ ...project, date: e.target.value })} />
            </Field>
            <div className="pb-1">
              <Toggle checked={project.featured ?? false} onChange={v => onChange({ ...project, featured: v })} label="Featured" />
            </div>
          </div>

          {/* Tags */}
          <Field label="Tags">
            <div className="space-y-2">
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 bg-zinc-100 rounded-lg text-xs text-zinc-700">
                      {tag}
                      <button type="button" onClick={() => onChange({ ...project, tags: project.tags.filter((_, j) => j !== i) })}
                        className="text-zinc-400 hover:text-red-400 transition-colors">×</button>
                    </span>
                  ))}
                </div>
              )}
              <input className={inputCls} placeholder="Type a tag and press Enter…"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const val = e.currentTarget.value.trim()
                    if (val) { onChange({ ...project, tags: [...project.tags, val] }); e.currentTarget.value = '' }
                  }
                }} />
            </div>
          </Field>

          {/* Links */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <Label>Primary Link</Label>
              <Field label="Label"><input className={inputCls} placeholder="View Live" value={project.links?.primary?.label ?? ''} onChange={e => setPrimary('label', e.target.value)} /></Field>
              <Field label="URL"><input className={inputCls} placeholder="https://…" value={project.links?.primary?.url ?? ''} onChange={e => setPrimary('url', e.target.value)} /></Field>
            </div>
            <div className="space-y-3">
              <Label>Secondary Link (optional)</Label>
              <Field label="Label"><input className={inputCls} placeholder="GitHub" value={project.links?.secondary?.label ?? ''} onChange={e => setSecondary('label', e.target.value)} /></Field>
              <Field label="URL"><input className={inputCls} placeholder="https://…" value={project.links?.secondary?.url ?? ''} onChange={e => setSecondary('url', e.target.value)} /></Field>
            </div>
          </div>

          {/* ── Images ───────────────────────────────────────────────────── */}
          <div className="pt-1 border-t border-black/[0.05] space-y-5">

            {/* Header image */}
            <Field label="Header Image">
              <ImageUpload value={project.image ?? ''} onChange={v => onChange({ ...project, image: v || undefined })} />
            </Field>

            {/* Gradient fallback */}
            <Field label="Gradient (fallback when no image)">
              <input className={inputCls} placeholder="from-violet-900 via-purple-950 to-indigo-950"
                value={project.gradient ?? ''} onChange={e => onChange({ ...project, gradient: e.target.value })} />
            </Field>

            {/* Gallery */}
            <div>
              <Label>Gallery</Label>
              <div className="space-y-3">
                {gallery.map((img, i) => (
                  <div key={i} className="p-3 bg-zinc-50 rounded-xl border border-black/[0.05] space-y-2">
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      {img.src && (
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-zinc-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.src} alt="" className="object-cover w-full h-full" />
                        </div>
                      )}
                      {/* Controls */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <ImageUpload compact value={img.src}
                          onChange={src => {
                            const g = [...gallery]; g[i] = { ...img, src }
                            onChange({ ...project, gallery: g })
                          }} />
                        <input className={inputCls} placeholder="Caption (optional)" value={img.caption ?? ''}
                          onChange={e => {
                            const g = [...gallery]; g[i] = { ...img, caption: e.target.value }
                            onChange({ ...project, gallery: g })
                          }} />
                      </div>
                      {/* Remove */}
                      <button type="button"
                        onClick={() => onChange({ ...project, gallery: gallery.filter((_, j) => j !== i) })}
                        className="text-zinc-300 hover:text-red-400 transition-colors shrink-0 self-start mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button"
                  onClick={() => onChange({ ...project, gallery: [...gallery, { src: '' }] })}
                  className="text-xs text-zinc-400 hover:text-zinc-700 flex items-center gap-1.5 transition-colors pt-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add gallery image
                </button>
              </div>
            </div>
          </div>

          {/* Delete */}
          <div className="pt-3 border-t border-black/[0.05] flex justify-end">
            {confirmDelete ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500">Delete this project?</span>
                <button type="button" onClick={onDelete} className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors">Yes, delete</button>
                <button type="button" onClick={() => setConfirmDelete(false)} className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Cancel</button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmDelete(true)}
                className="text-xs text-zinc-300 hover:text-red-400 transition-colors">
                Delete project
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saved' | 'error'>('idle')
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjects(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function save() {
    if (!projects) return
    setSaving(true); setSaveState('idle')
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects),
      })
      if (!res.ok) throw new Error()
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    } catch {
      setSaveState('error')
    } finally {
      setSaving(false)
    }
  }

  function addProject() {
    const id = `project-${Date.now()}`
    const blank: ProjectData = { id, slug: id, title: '', shortDescription: '', tags: [] }
    setProjects(prev => [blank, ...(prev ?? [])])
    setOpenId(id)
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-black/[0.06] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-zinc-900">Projects Editor</h1>
            <span className="hidden sm:inline text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">local only</span>
          </div>
          <div className="flex items-center gap-3">
            {saveState === 'saved' && <span className="text-xs text-emerald-600 font-medium">Saved ✓</span>}
            {saveState === 'error' && <span className="text-xs text-red-500">Save failed</span>}
            <Link href="/" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">← View site</Link>
            <button onClick={save} disabled={saving || !projects}
              className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors disabled:opacity-40">
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-sm text-zinc-400 text-center py-20">Loading…</p>
        ) : !projects ? (
          <p className="text-sm text-red-500 text-center py-20">Could not load projects. Make sure the dev server is running.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-zinc-400">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
              <button onClick={addProject}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-black/[0.08] hover:border-black/[0.15] px-3 py-1.5 rounded-lg transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add project
              </button>
            </div>

            {projects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-sm text-zinc-400 mb-4">No projects yet</p>
                <button onClick={addProject} className="text-sm text-zinc-600 hover:text-zinc-900 underline underline-offset-4">Add your first project</button>
              </div>
            )}

            {projects.map(project => (
              <ProjectEditor key={project.id} project={project}
                isOpen={openId === project.id}
                onToggle={() => setOpenId(openId === project.id ? null : project.id)}
                onChange={updated => setProjects(projects.map(p => p.id === updated.id ? updated : p))}
                onDelete={() => { setProjects(projects.filter(p => p.id !== project.id)); setOpenId(null) }}
              />
            ))}

            <p className="text-center text-xs text-zinc-300 pt-6">
              Click <strong className="text-zinc-400">Save changes</strong> to write to disk · Deploy to publish
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
