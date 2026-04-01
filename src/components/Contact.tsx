'use client'

import { motion } from 'framer-motion'

// ─── Update these links ────────────────────────────────────────────────────
const EMAIL = 'patelh319@gmail.com'
const GITHUB = 'https://github.com/hiralhp'
const LINKEDIN = 'https://linkedin.com/in/hiralhp'
const TWITTER: string = '' // set to '' to hide
// ──────────────────────────────────────────────────────────────────────────

const links = [
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    value: EMAIL,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    external: false,
  },
  {
    label: 'GitHub',
    href: GITHUB,
    value: GITHUB.replace('https://', ''),
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    external: true,
  },
  {
    label: 'LinkedIn',
    href: LINKEDIN,
    value: LINKEDIN.replace('https://', ''),
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    external: true,
  },
  ...(TWITTER
    ? [
        {
          label: 'Twitter',
          href: TWITTER,
          value: TWITTER.replace('https://', ''),
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
          external: true,
        },
      ]
    : []),
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 sm:py-36 bg-white border-t border-black/[0.04]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4 leading-tight">
              Let&apos;s work together
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed mb-10">
              Open to interesting projects, collaborations, and conversations.
              Whether you have a concrete idea or just want to talk — reach out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-3"
          >
            {links.map(({ label, href, value, icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.06] bg-zinc-50 hover:bg-zinc-100 hover:border-black/[0.1] transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-200 text-zinc-600 group-hover:text-zinc-900 transition-colors shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm text-zinc-700 truncate">{value}</p>
                </div>
                <svg
                  className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 ml-auto shrink-0 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
