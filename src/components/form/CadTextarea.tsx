import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type CadTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const CadTextarea = forwardRef<HTMLTextAreaElement, CadTextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={3}
      className={cn(
        'w-full px-3 py-2.5 rounded-md text-sm bg-bg-input border border-border text-text-primary placeholder:text-text-muted resize-none',
        'focus:outline-none focus:border-accent focus:shadow-[0_0_8px_rgba(34,211,238,0.2)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-200',
        className,
      )}
      {...props}
    />
  ),
)
CadTextarea.displayName = 'CadTextarea'
