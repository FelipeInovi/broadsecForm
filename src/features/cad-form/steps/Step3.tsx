import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { type CadFormData } from '../schema'

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-border pb-2 mb-4">
      {children}
    </h3>
  )
}

const TIPO_CONFIG = {
  persona:  { label: 'Identificación',   placeholder: 'Ej: CC 1020304050' },
  animal:   { label: 'Tipo de animal',    placeholder: 'Ej: Canino, Felino, Bovino' },
  vehiculo: { label: 'Placa',             placeholder: 'Ej: ABC-123' },
} as const

function InvolucradoRow({
  index,
  onRemove,
  canRemove,
}: {
  index: number
  onRemove: () => void
  canRemove: boolean
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CadFormData>()

  const tipo = useWatch({ control, name: `involucrados.${index}.tipo` }) ?? 'persona'
  const config = TIPO_CONFIG[tipo as keyof typeof TIPO_CONFIG] ?? TIPO_CONFIG.persona
  const valorError = errors.involucrados?.[index]?.valor?.message

  return (
    <div className="flex gap-3 items-end p-4 rounded-lg border border-border bg-bg-input/40">
      {/* Selector de tipo */}
      <div className="w-36 shrink-0">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
          Tipo
        </label>
        <CadSelect {...register(`involucrados.${index}.tipo`)}>
          <option value="persona">Persona</option>
          <option value="animal">Animal</option>
          <option value="vehiculo">Vehículo</option>
        </CadSelect>
      </div>

      {/* Campo dinámico según tipo */}
      <div className="flex-1">
        <FieldWrapper label={config.label} error={valorError}>
          <CadInput
            placeholder={config.placeholder}
            {...register(`involucrados.${index}.valor`)}
          />
        </FieldWrapper>
      </div>

      {/* Botón eliminar */}
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="mb-0.5 w-8 h-9 flex items-center justify-center rounded-md border border-border text-text-muted hover:border-error hover:text-error disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
        title="Eliminar involucrado"
      >
        ✕
      </button>
    </div>
  )
}

export function Step3() {
  const { control, register, formState: { errors } } = useFormContext<CadFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'involucrados',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* ── Partes involucradas ── */}
      <div>
        <SectionTitle>Partes involucradas</SectionTitle>

        <div className="flex flex-col gap-3">
          {fields.length === 0 && (
            <p className="text-sm text-text-muted italic py-2">
              Sin involucrados registrados. Agrega uno con el botón.
            </p>
          )}

          {fields.map((field, index) => (
            <InvolucradoRow
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ tipo: 'persona', valor: '' })}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold border border-dashed border-accent/40 text-accent hover:bg-accent/5 hover:border-accent transition-all duration-200"
        >
          <span className="text-base leading-none">+</span>
          Agregar involucrado
        </button>
      </div>

      {/* ── Medios y auditoría ── */}
      <div>
        <SectionTitle>Medios y auditoría</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FieldWrapper label="Enlace grabación / audio llamada" error={errors.enlaceGrabacion?.message}>
            <CadInput type="url" placeholder="https://..." {...register('enlaceGrabacion')} />
          </FieldWrapper>

          <FieldWrapper label="Enlace cámara corporal / CCTV" error={errors.enlaceCamaraEscena?.message}>
            <CadInput type="url" placeholder="https://..." {...register('enlaceCamaraEscena')} />
          </FieldWrapper>

          <FieldWrapper label="ID Despachador" error={errors.idDespachador?.message} required>
            <CadInput placeholder="Ej: DSP-007" {...register('idDespachador')} />
          </FieldWrapper>

          <FieldWrapper
            label="Notas de aseguramiento de calidad"
            error={errors.notasAseguramiento?.message}
            className="col-span-full"
          >
            <CadTextarea
              placeholder="Observaciones del supervisor / control de calidad..."
              rows={4}
              {...register('notasAseguramiento')}
            />
          </FieldWrapper>
        </div>
      </div>

      {/* ── Aviso final ── */}
      <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
          Listo para enviar
        </p>
        <p className="text-sm text-text-muted">
          Revisa la información ingresada en los pasos anteriores antes de enviar el reporte CAD.
          Los campos marcados con <span className="text-accent">*</span> son obligatorios.
        </p>
      </div>
    </div>
  )
}
