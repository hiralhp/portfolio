// ─── Update this ──────────────────────────────────────────────────────────
const NAME = 'Your Name'
// ──────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.04] bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-600">
          © {year} {NAME}. All rights reserved.
        </p>
        <p className="text-xs text-zinc-700">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
