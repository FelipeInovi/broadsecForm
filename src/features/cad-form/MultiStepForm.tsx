import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stepper } from '@/components/form/Stepper'
import { StepNavigation } from '@/components/form/StepNavigation'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { cadFormSchema, paso1Schema, paso2Schema, paso3Schema, type CadFormData } from './schema'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'

const STEP_SCHEMAS = [paso1Schema, paso2Schema, paso3Schema]
const STEP_COMPONENTS = [<Step1 />, <Step2 />, <Step3 />]

export function MultiStepForm() {
  const { currentStep, isFirst, isLast, next, back } = useMultiStepForm(3)

  const methods = useForm<CadFormData>({
    resolver: zodResolver(cadFormSchema),
    mode: 'onTouched',
    defaultValues: {
      idioma: 'Español',
      esDeLlamadaRepetida: false,
      esTTY: false,
      esMutualAid: false,
      requiereRevisionSupervisor: false,
      tieneArmas: false,
      tieneHazmat: false,
      tieneAntecedentes: false,
      tieneOrdenCaptura: false,
    },
  })

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
          <div className="mb-8 flex items-center gap-3">
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

          {/* Card principal */}
          <div className="bg-bg-panel border border-border rounded-xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Stepper currentStep={currentStep} />

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
