'use client'

import { motion } from 'framer-motion'

// ─── Update these values ───────────────────────────────────────────────────
const NAME = 'Hiral Patel'
const BIO_LINES = [
  "I'm a software engineer with a focus on building products that are both technically strong and a pleasure to use. I care about the intersection of engineering and design — the details that make software feel right.",
  'Currently building [Your Current Project or Role]. Previously [Previous Experience]. I like working across the stack but spend most of my time in React, TypeScript, and Node.js.',
  "Outside of code, I'm interested in [Your Interests]. I believe good software comes from curiosity, craft, and genuine care for the people using it.",
]
// ──────────────────────────────────────────────────────────────────────────

const highlights = [
  { label: 'Focus', value: 'Full-Stack Development' },
  { label: 'Currently', value: '[Your Status]' },
  { label: 'Based in', value: '[Your Location]' },
  { label: 'Open to', value: 'New Opportunities' },
]

export default function About() {
  return (
    <section id="about" className="py-28 sm:py-36 bg-zinc-50 border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-3">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-10 leading-tight">
              A bit about <br />
              {NAME}
            </h2>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">
                    {label}
                  </span>
                  <span className="text-sm text-zinc-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-5"
          >
            {BIO_LINES.map((line, i) => (
              <p key={i} className="text-base text-zinc-600 leading-[1.75]">
                {line}
              </p>
            ))}

            {/* Skills row */}
            <div className="pt-4">
              <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-4">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'TypeScript',
                  'React',
                  'Next.js',
                  'Node.js',
                  'PostgreSQL',
                  'Tailwind CSS',
                  'Figma',
                  'Docker',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium text-zinc-600 border border-black/[0.07] rounded-lg bg-black/[0.03]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
