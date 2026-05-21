import { type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CadToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function CadToggle({ label, className, ...props }: CadToggleProps) {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer group', className)}>
      <div className="relative">
        <input type="checkbox" className="sr-only peer" {...props} />
        <div className="w-10 h-5 rounded-full border border-border bg-bg-input peer-checked:border-accent peer-checked:bg-accent/20 transition-all duration-200" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-text-muted peer-checked:bg-accent peer-checked:translate-x-5 transition-all duration-200" />
      </div>
      <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
        {label}
      </span>
    </label>
  )
}
