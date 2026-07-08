import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: {
    label: string
    href: string
  }
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps): ReactNode {
  return (
    <div className="flex items-start justify-between mb-6 md:mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && <p className="text-text-secondary text-sm md:text-base">{subtitle}</p>}
      </div>
      {action && (
        <a
          href={action.href}
          className="text-cyan-primary text-sm md:text-base font-medium hover:text-cyan-primary/80 transition-colors whitespace-nowrap ml-4"
        >
          {action.label}
        </a>
      )}
    </div>
  )
}
