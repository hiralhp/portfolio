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
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  'In Progress': {
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  'Case Study': {
    dot: 'bg-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  Archived: {
    dot: 'bg-zinc-400',
    text: 'text-zinc-600',
    bg: 'bg-zinc-100',
    border: 'border-zinc-300',
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
