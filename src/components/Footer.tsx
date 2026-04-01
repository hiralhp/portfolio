// ─── Update this ──────────────────────────────────────────────────────────
const NAME = 'Hiral Patel'
// ──────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black/[0.04] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400">
          © {year} {NAME}. All rights reserved.
        </p>
        <p className="text-xs text-zinc-300">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
