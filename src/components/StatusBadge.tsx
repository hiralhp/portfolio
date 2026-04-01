import { ProjectStatus } from '@/types/project'

interface StatusBadgeProps {
  status: ProjectStatus
  className?: string
}

const statusConfig: Record<
  ProjectStatus,
  { dot: string; text: string; bg: string; border: string }
> = {
  Live: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-800/50',
  },
  'In Progress': {
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    bg: 'bg-amber-950/60',
    border: 'border-amber-800/50',
  },
  'Case Study': {
    dot: 'bg-blue-400',
    text: 'text-blue-300',
    bg: 'bg-blue-950/60',
    border: 'border-blue-800/50',
  },
  Archived: {
    dot: 'bg-zinc-500',
    text: 'text-zinc-400',
    bg: 'bg-zinc-800/60',
    border: 'border-zinc-700/50',
  },
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  )
}
