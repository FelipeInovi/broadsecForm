interface StepNavigationProps {
  isFirst: boolean
  isLast: boolean
  onBack: () => void
  onNext: () => void
  isSubmitting?: boolean
}

export function StepNavigation({
  isFirst,
  isLast,
  onBack,
  onNext,
  isSubmitting,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className="px-6 py-2.5 rounded-md text-sm font-medium border border-border text-text-muted hover:border-accent hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        ← Anterior
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="px-8 py-2.5 rounded-md text-sm font-bold bg-accent text-bg-base hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_16px_rgba(34,211,238,0.3)]"
      >
        {isLast ? (isSubmitting ? 'Enviando...' : 'Enviar reporte') : 'Siguiente →'}
      </button>
    </div>
  )
}
