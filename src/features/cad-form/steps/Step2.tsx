import { useState, useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { type CadFormData } from '../schema'
import { TIPOS_UNIDAD } from '../data/options'

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-border pb-2 mb-4 col-span-full">
      {children}
    </h3>
  )
}

function formatDateTimeDisplay(iso: string): string {
  if (!iso) return '—'
  try {
    const [datePart, timePart] = iso.split('T')
    const [y, m, d] = datePart.split('-')
    return `${d}/${m}/${y}  ${timePart}`
  } catch {
    return iso
  }
}

const EMPTY_ASIGNACION = {
  agencia: '',
  idUnidad: '',
  tipoUnidad: 'patrulla' as const,
  horaDespacho: '',
  horaLlegadaEscena: '',
  tiempoEstimadoLlegada: '',
}

export function Step2() {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<CadFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'asignacionesAdicionales',
  })

  const [notasAbiertas, setNotasAbiertas] = useState(false)
  const notasValue = watch('notasDespacho')

  useEffect(() => {
    if (notasValue) setNotasAbiertas(true)
  }, [notasValue])

  // Valores auto-cargados del sistema padre (read-only display)
  const agencia = watch('agencia')
  const idUnidad = watch('idUnidad')
  const tipoUnidad = watch('tipoUnidad')
  const horaDespacho = watch('horaDespacho')
  const horaLlegadaEscena = watch('horaLlegadaEscena')
  const tiempoEstimadoLlegada = watch('tiempoEstimadoLlegada')

  const tipoLabel = TIPOS_UNIDAD.find((t) => t.value === tipoUnidad)?.label ?? tipoUnidad ?? '—'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* ── Asignación de recursos (sistema padre) ── */}
      <SectionTitle>Asignación de recursos</SectionTitle>

      {/* Tarjetas read-only — datos del sistema padre */}
      <div className="col-span-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Agencia',                   value: agencia },
          { label: 'ID Unidad / Recurso',        value: idUnidad },
          { label: 'Tipo de unidad',             value: tipoLabel },
          { label: 'Hora de despacho',           value: formatDateTimeDisplay(horaDespacho) },
          { label: 'Hora de llegada a escena',   value: formatDateTimeDisplay(horaLlegadaEscena) },
          { label: 'Tiempo est. de llegada',     value: formatDateTimeDisplay(tiempoEstimadoLlegada) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-md border border-border/25 bg-bg-base/40 px-3 py-2">
            <p className="text-[10px] uppercase tracking-widest text-text-muted/60 mb-1">{label}</p>
            <p className="text-sm font-mono text-text-primary/80 truncate">{value || '—'}</p>
          </div>
        ))}
      </div>

      {/* ── Asignaciones adicionales (registro manual) ── */}
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="col-span-full rounded-lg border border-border/40 bg-bg-base/30 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent/70">
              Asignación manual #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="text-xs text-text-muted hover:text-red-400 transition-colors"
            >
              ✕ eliminar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FieldWrapper
              label="Agencia"
              error={errors.asignacionesAdicionales?.[idx]?.agencia?.message}
              required
            >
              <CadInput
                placeholder="Ej: Policía Metropolitana"
                {...register(`asignacionesAdicionales.${idx}.agencia`)}
              />
            </FieldWrapper>

            <FieldWrapper
              label="ID Unidad / Recurso"
              error={errors.asignacionesAdicionales?.[idx]?.idUnidad?.message}
              required
            >
              <CadInput
                placeholder="Ej: PAT-045"
                {...register(`asignacionesAdicionales.${idx}.idUnidad`)}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Tipo de unidad"
              error={errors.asignacionesAdicionales?.[idx]?.tipoUnidad?.message}
              required
              className="col-span-full"
            >
              <CadSelect {...register(`asignacionesAdicionales.${idx}.tipoUnidad`)}>
                <option value="">Seleccionar tipo</option>
                {TIPOS_UNIDAD.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </CadSelect>
            </FieldWrapper>

            <FieldWrapper
              label="Hora de despacho"
              error={errors.asignacionesAdicionales?.[idx]?.horaDespacho?.message}
              required
            >
              <CadInput
                type="datetime-local"
                {...register(`asignacionesAdicionales.${idx}.horaDespacho`)}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Hora de llegada a escena"
              error={errors.asignacionesAdicionales?.[idx]?.horaLlegadaEscena?.message}
            >
              <CadInput
                type="datetime-local"
                {...register(`asignacionesAdicionales.${idx}.horaLlegadaEscena`)}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Tiempo estimado de llegada"
              error={errors.asignacionesAdicionales?.[idx]?.tiempoEstimadoLlegada?.message}
            >
              <CadInput
                type="datetime-local"
                {...register(`asignacionesAdicionales.${idx}.tiempoEstimadoLlegada`)}
              />
            </FieldWrapper>
          </div>
        </div>
      ))}

      {/* Botón agregar asignación manual */}
      <div className="col-span-full">
        <button
          type="button"
          onClick={() => append(EMPTY_ASIGNACION)}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-150 py-1 group"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded border border-border/50 text-base leading-none group-hover:border-accent group-hover:text-accent transition-colors">
            +
          </span>
          <span>Agregar asignación de recursos manual</span>
        </button>
      </div>

      {/* ── Notas adicionales (colapsable) ── */}
      <div className="col-span-full mt-1">
        {!notasAbiertas ? (
          <button
            type="button"
            onClick={() => setNotasAbiertas(true)}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-150 py-1 group"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded border border-border/50 text-base leading-none group-hover:border-accent group-hover:text-accent transition-colors">
              +
            </span>
            <span>Agregar notas adicionales</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-accent/80">
                Notas adicionales
              </span>
              <button
                type="button"
                onClick={() => setNotasAbiertas(false)}
                className="text-xs text-text-muted hover:text-accent transition-colors"
              >
                ✕ cerrar
              </button>
            </div>
            {errors.notasDespacho?.message && (
              <p className="text-xs text-red-400">{errors.notasDespacho.message}</p>
            )}
            <CadTextarea
              placeholder="Notas adicionales sobre el despacho..."
              rows={4}
              {...register('notasDespacho')}
            />
          </div>
        )}
      </div>
    </div>
  )
}
