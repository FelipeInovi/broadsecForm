import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stepper } from '@/components/form/Stepper'
import { StepNavigation } from '@/components/form/StepNavigation'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { cadFormSchema, paso1Schema, paso2Schema, paso3Schema, type CadFormData } from './schema'
import { DEMO_POR_PASO } from './data/demoData'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'

const STEP_SCHEMAS = [paso1Schema, paso2Schema, paso3Schema]
const STEP_COMPONENTS = [<Step1 />, <Step2 />, <Step3 />]

function nowAsDateTimeLocal(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatDateTimeDisplay(iso: string): string {
  if (!iso) return '—'
  try {
    const [datePart, timePart] = iso.split('T')
    const [y, m, day] = datePart.split('-')
    return `${day}/${m}/${y}  ${timePart}`
  } catch {
    return iso
  }
}

export function MultiStepForm() {
  const { currentStep, isFirst, isLast, next, back } = useMultiStepForm(3)
  const [filled, setFilled] = useState<boolean[]>([false, false, false])

  const methods = useForm<CadFormData>({
    resolver: zodResolver(cadFormSchema),
    mode: 'onTouched',
    defaultValues: {
      fechaHoraRecepcion: nowAsDateTimeLocal(),
      idOperador: 'OPR-042',
      esDeLlamadaRepetida: false,
      esMutualAid: false,
    },
  })

  const fechaHoraRecepcion = methods.watch('fechaHoraRecepcion')
  const idOperador = methods.watch('idOperador')

  const handleFillDemo = () => {
    const demoData = DEMO_POR_PASO[currentStep]
    Object.entries(demoData).forEach(([key, value]) => {
      methods.setValue(key as keyof CadFormData, value as never, {
        shouldValidate: true,
        shouldDirty: true,
      })
    })
    setFilled((prev) => {
      const next = [...prev]
      next[currentStep] = true
      return next
    })
  }

  const handleNext = async () => {
    const stepSchema = STEP_SCHEMAS[currentStep]
    const fields = Object.keys(stepSchema.shape) as (keyof CadFormData)[]
    const valid = await methods.trigger(fields)
    if (valid) next()
  }

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('Reporte CAD enviado:', data)
    alert('Reporte enviado correctamente.')
  })

  const handleNavigate = () => {
    if (isLast) {
      handleSubmit()
    } else {
      handleNext()
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-bg-base flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-accent rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                  Sistema CAD
                </p>
                <h1 className="text-xl font-bold text-text-primary leading-none">
                  Nuevo reporte de incidente
                </h1>
              </div>
            </div>
            {/* Strip informativo: datos auto-cargados */}
            <div className="flex flex-col items-end gap-0.5 text-[11px] text-text-muted/70 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="text-accent/40 text-[10px] uppercase tracking-wider not-italic font-sans">recepción</span>
                {formatDateTimeDisplay(fechaHoraRecepcion)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent/40 text-[10px] uppercase tracking-wider not-italic font-sans">operador</span>
                {idOperador || '—'}
              </span>
            </div>
          </div>

          {/* Card principal */}
          <div className="bg-bg-panel border border-border rounded-xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Stepper currentStep={currentStep} />
              </div>
            </div>

            {/* Botón demo */}
            <div className="flex justify-end mb-6 -mt-4">
              <button
                type="button"
                onClick={handleFillDemo}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all duration-200 border-dashed border-text-muted/40 text-text-muted hover:border-accent hover:text-accent hover:bg-accent/5"
              >
                <span>⚡</span>
                {filled[currentStep] ? 'Rellenar demo de nuevo' : `Llenar paso ${currentStep + 1} con datos de prueba`}
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                {STEP_COMPONENTS[currentStep]}

              <StepNavigation
                isFirst={isFirst}
                isLast={isLast}
                onBack={back}
                onNext={handleNavigate}
              />
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-text-muted mt-6">
            Broadsec · Sistema de despacho asistido por computador
          </p>
        </div>
      </div>
    </FormProvider>
  )
}
