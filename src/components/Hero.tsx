'use client'

import { motion } from 'framer-motion'

// ─── Update these values ───────────────────────────────────────────────────
const NAME = 'Hiral Patel'
const HEADLINE = 'Building AI-powered products and scaling data-driven operations'
const SUBHEADLINE =
  'Experience across Microsoft, New York Times, and Salesforce building systems that drive efficiency, reduce cost, and improve user experience.'
const AVAILABLE = true // Set to false to hide the availability badge
// ──────────────────────────────────────────────────────────────────────────

const ease = [0.21, 0.47, 0.32, 0.98] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-indigo-50/70 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-36 text-center">

        {/* Availability badge */}
        {AVAILABLE && (
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-indigo-200 bg-indigo-50 text-xs text-indigo-600 font-medium select-none"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Available for new opportunities
          </motion.div>
        )}

        {/* Name label */}
        <motion.p
          custom={0.06}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm font-semibold text-indigo-500 tracking-widest uppercase mb-6 select-none"
        >
          {NAME}
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={0.14}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[clamp(2.1rem,5.5vw,4.25rem)] font-bold tracking-tight text-zinc-900 leading-[1.1] mb-7 max-w-3xl mx-auto"
        >
          {HEADLINE}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={0.26}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-xl mx-auto text-base sm:text-lg text-zinc-500 leading-relaxed mb-12"
        >
          {SUBHEADLINE}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.38}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            View Work
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-2.5 bg-transparent text-zinc-600 text-sm font-medium rounded-lg border border-black/10 hover:border-black/20 hover:text-zinc-900 hover:bg-black/[0.04] transition-all duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-indigo-300 to-transparent" />
      </motion.div>
    </section>
  )
}
