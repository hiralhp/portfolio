'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/75 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name — update this */}
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-100 hover:text-white transition-colors tracking-tight"
        >
          Your Name
        </Link>

        {/* Navigation links */}
        <div className="hidden sm:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-white/[0.05] transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile: just show section anchors as dots or a simple row */}
        <div className="flex sm:hidden items-center gap-3">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
