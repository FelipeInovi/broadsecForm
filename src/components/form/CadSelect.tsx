import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type CadSelectProps = SelectHTMLAttributes<HTMLSelectElement>

export const CadSelect = forwardRef<HTMLSelectElement, CadSelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'w-full px-3 py-2.5 rounded-md text-sm bg-bg-input border border-border text-text-primary',
        'focus:outline-none focus:border-accent focus:shadow-[0_0_8px_rgba(34,211,238,0.2)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-200 appearance-none cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
)
CadSelect.displayName = 'CadSelect'
