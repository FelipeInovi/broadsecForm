import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { CadToggle } from '@/components/form/CadToggle'
import { type CadFormData } from '../schema'
import { CANALES, PRIORIDADES, TIPOS_INCIDENTE } from '../data/options'

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

export function Step1() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CadFormData>()

  const [notasAbiertas, setNotasAbiertas] = useState(false)

  const fechaHoraRecepcion = watch('fechaHoraRecepcion')
  const idOperador = watch('idOperador')
  const notasValue = watch('notasAdicionales')

  // Si el demo llena las notas, abrirlas automáticamente
  useEffect(() => {
    if (notasValue) setNotasAbiertas(true)
  }, [notasValue])

  return (
    <>
      {/* ── Info fija: datos auto-cargados ── */}
      <div className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-md border border-border/30 bg-bg-base/50 px-4 py-2.5 mb-5 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="text-accent/50">⏱</span>
          <span className="text-text-muted/60 uppercase tracking-wider text-[10px]">Recepción:</span>
          <span className="font-mono text-text-primary/70">{formatDateTimeDisplay(fechaHoraRecepcion)}</span>
        </span>
        <span className="text-border">·</span>
        <span className="flex items-center gap-1.5">
          <span className="text-accent/50">◈</span>
          <span className="text-text-muted/60 uppercase tracking-wider text-[10px]">Operador:</span>
          <span className="font-mono text-text-primary/70">{idOperador || '—'}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* ── Identificación del llamante ── */}
        <SectionTitle>Identificación del llamante</SectionTitle>

        <FieldWrapper label="Nombre del llamante" error={errors.nombreLlamante?.message} required>
          <CadInput placeholder="Nombre completo" {...register('nombreLlamante')} />
        </FieldWrapper>

        <FieldWrapper label="Teléfono / ANI" error={errors.telefono?.message} required>
          <CadInput placeholder="+57 300 000 0000" {...register('telefono')} />
        </FieldWrapper>

        <div className="flex flex-col gap-3 justify-center">
          <CadToggle label="Llamante involucrado" {...register('esDeLlamadaRepetida')} />
        </div>

        {/* ── Ubicación del incidente ── */}
        <SectionTitle>Ubicación del incidente</SectionTitle>

        <FieldWrapper label="Dirección / Número cívico" error={errors.direccion?.message} required>
          <CadInput placeholder="Ej: Cra 45 # 23-10" {...register('direccion')} />
        </FieldWrapper>

        <FieldWrapper label="Ciudad / Municipio" error={errors.ciudad?.message} required>
          <CadInput placeholder="Ej: Medellín" {...register('ciudad')} />
        </FieldWrapper>

        <FieldWrapper label="Piso / Apartamento / Unidad" error={errors.pisoApartamento?.message}>
          <CadInput placeholder="Ej: Apto 301, Piso 3" {...register('pisoApartamento')} />
        </FieldWrapper>

        <FieldWrapper label="Tipo de incidente" error={errors.tipoIncidente?.message} required>
          <CadSelect {...register('tipoIncidente')}>
            <option value="">Seleccionar tipo</option>
            {TIPOS_INCIDENTE.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </CadSelect>
        </FieldWrapper>

        {/* ── Recepción de llamada ── */}
        <SectionTitle>Recepción de llamada</SectionTitle>

        <FieldWrapper label="Canal de recepción" error={errors.canal?.message} required>
          <CadSelect {...register('canal')}>
            <option value="">Seleccionar canal</option>
            {CANALES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </CadSelect>
        </FieldWrapper>

        <FieldWrapper label="Prioridad (1–5)" error={errors.prioridad?.message} required>
          <CadSelect {...register('prioridad', { valueAsNumber: true })}>
            <option value="">Seleccionar prioridad</option>
            {PRIORIDADES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </CadSelect>
        </FieldWrapper>

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
              {errors.notasAdicionales?.message && (
                <p className="text-xs text-red-400">{errors.notasAdicionales.message}</p>
              )}
              <CadTextarea
                placeholder="Descripción libre del incidente reportado..."
                rows={4}
                {...register('notasAdicionales')}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
