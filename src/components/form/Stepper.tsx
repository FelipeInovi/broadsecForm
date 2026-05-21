import { cn } from '@/lib/utils'
import { PASOS } from '@/features/cad-form/data/options'

interface StepperProps {
  currentStep: number
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full mb-8">
      {PASOS.map((paso, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep

        return (
          <div key={paso.numero} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300',
                  isCompleted &&
                    'bg-accent border-accent text-bg-base',
                  isActive &&
                    'bg-transparent border-accent text-accent shadow-[0_0_12px_rgba(34,211,238,0.4)]',
                  !isCompleted &&
                    !isActive &&
                    'bg-transparent border-border text-text-muted',
                )}
              >
                {isCompleted ? '✓' : paso.numero}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center w-24 leading-tight',
                  isActive && 'text-accent',
                  isCompleted && 'text-text-primary',
                  !isActive && !isCompleted && 'text-text-muted',
                )}
              >
                {paso.titulo}
              </span>
            </div>

            {index < PASOS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-px mx-3 mb-6 transition-all duration-300',
                  isCompleted ? 'bg-accent' : 'bg-border',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
