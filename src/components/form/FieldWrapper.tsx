import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FieldWrapperProps {
  label: string
  error?: string
  children: ReactNode
  className?: string
  required?: boolean
}

export function FieldWrapper({
  label,
  error,
  children,
  className,
  required,
}: FieldWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-error flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
