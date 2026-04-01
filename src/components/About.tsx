'use client'

import { motion } from 'framer-motion'

// ─── Update these values ───────────────────────────────────────────────────
const NAME = 'Hiral Patel'
const BIO_LINES = [
  "I'm a product and operations professional with experience across enterprise software, media, and CRM — including Microsoft, The New York Times, and Salesforce. I specialize in bridging the gap between technical systems and business outcomes, translating complexity into decisions that drive impact.",
  'My work sits at the intersection of product, data, and strategy. I\'ve led cross-functional initiatives, built AI-powered workflows, and designed operational systems that reduce friction while improving both user and business outcomes.',
  "I'm energized by roles where technical fluency and business judgment both matter — whether that's defining a product roadmap, scaling an operations function, or accelerating the adoption of AI-native tooling.",
]
// ──────────────────────────────────────────────────────────────────────────

const highlights = [
  { label: 'Focus', value: 'Product & Strategy' },
  { label: 'Companies', value: 'Microsoft · NYT · Salesforce' },
  { label: 'Based in', value: '[Your Location]' },
  { label: 'Open to', value: 'PM / Strategy & Ops / AI Roles' },
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
            <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">
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
              <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                Tools & Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'SQL',
                  'Python',
                  'Salesforce',
                  'Figma',
                  'TypeScript',
                  'dbt / Looker',
                  'JIRA / Linear',
                  'AI/ML Workflows',
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
