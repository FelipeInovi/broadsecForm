import { useState, useRef, useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadTextarea } from '@/components/form/CadTextarea'
import { type CadFormData, type TipoInvolucrado } from '../schema'

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-border pb-2 mb-4">
      {children}
    </h3>
  )
}

const TIPOS_OPTIONS: { value: TipoInvolucrado; label: string }[] = [
  { value: 'adulto_mayor', label: 'Adulto Mayor' },
  { value: 'animal',       label: 'Animal' },
  { value: 'hombre',       label: 'Hombre' },
  { value: 'infante',      label: 'Infante' },
  { value: 'mujer',        label: 'Mujer' },
  { value: 'motocicleta',  label: 'Motocicleta' },
  { value: 'vehiculo',     label: 'Vehículo' },
]

function getPlaceholder(tipo: TipoInvolucrado, n: number): string {
  if (['adulto_mayor', 'hombre', 'infante', 'mujer'].includes(tipo)) return `DNI ${n}`
  if (tipo === 'animal') return `Tipo ${n}`
  return `Placa ${n}`
}

export function Step3() {
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<CadFormData>()

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'involucrados',
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [dropdownOpen])

  const selectedTipos = new Set(fields.map((f) => f.tipo))

  const toggleTipo = (tipo: TipoInvolucrado) => {
    const idx = fields.findIndex((f) => f.tipo === tipo)
    if (idx !== -1) {
      remove(idx)
    } else {
      append({ tipo, valores: [''] })
    }
  }

  const adjustCount = (fieldIdx: number, delta: number) => {
    const currentValores = getValues(`involucrados.${fieldIdx}.valores`) ?? []
    const newCount = Math.max(1, currentValores.length + delta)
    const newValores = Array.from({ length: newCount }, (_, i) => currentValores[i] ?? '')
    update(fieldIdx, { tipo: fields[fieldIdx].tipo, valores: newValores })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Partes involucradas ── */}
      <div>
        <SectionTitle>Partes involucradas</SectionTitle>

        {/* Dropdown multi-select */}
        <div className="relative mb-4" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold border border-dashed border-accent/40 text-accent hover:bg-accent/5 hover:border-accent transition-all duration-200"
          >
            <span className="text-base leading-none">+</span>
            {fields.length === 0
              ? 'Agregar involucrado'
              : `${fields.length} tipo${fields.length > 1 ? 's' : ''} seleccionado${fields.length > 1 ? 's' : ''}`}
            <span className="text-accent/50 text-[10px] ml-1">{dropdownOpen ? '▲' : '▼'}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 z-20 bg-bg-panel border border-border rounded-lg shadow-xl overflow-hidden min-w-[200px]">
              {TIPOS_OPTIONS.map(({ value, label }) => {
                const isSelected = selectedTipos.has(value)
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleTipo(value)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                      isSelected
                        ? 'text-accent bg-accent/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-input/60'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] flex-shrink-0 ${
                        isSelected ? 'border-accent bg-accent text-bg-base font-bold' : 'border-border/60'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                    {label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Cards por tipo */}
        <div className="flex flex-col gap-3">
          {fields.map((field, fieldIdx) => {
            const tipo = field.tipo
            const label = TIPOS_OPTIONS.find((o) => o.value === tipo)?.label ?? tipo
            const valores = field.valores

            return (
              <div
                key={field.id}
                className="rounded-lg border border-border/40 bg-bg-base/30 p-4"
              >
                {/* Fila superior: nombre izquierda | contador + X derecha */}
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted/80 flex-1">
                    {label}
                  </p>

                  <div className="flex items-center gap-2 bg-bg-base/60 border border-border/40 rounded-full px-1 py-0.5">
                    <button
                      type="button"
                      onClick={() => adjustCount(fieldIdx, -1)}
                      disabled={valores.length <= 1}
                      className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                    >
                      −
                    </button>
                    <span className="min-w-[1.25rem] text-center text-sm font-semibold text-text-primary tabular-nums">
                      {valores.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustCount(fieldIdx, 1)}
                      className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base transition-all duration-150"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(fieldIdx)}
                    className="text-xs text-text-muted hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Inputs — uno por elemento */}
                <div className="flex flex-wrap gap-1.5">
                  {valores.map((_, valueIdx) => (
                    <div key={valueIdx} className="w-28">
                      <CadInput
                        placeholder={getPlaceholder(tipo, valueIdx + 1)}
                        className="text-xs py-1.5 px-2"
                        {...register(`involucrados.${fieldIdx}.valores.${valueIdx}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
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
