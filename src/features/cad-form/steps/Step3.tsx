import { useState, useRef, useEffect, type ReactNode } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { type CadFormData, type TipoInvolucrado, type TipoRecurso } from '../schema'
import { RECURSOS_INICIALES } from '../data/options'

const RECURSO_STYLE: Record<TipoRecurso, { bg: string; border: string; color: string; path: ReactNode }> = {
  grabacion: {
    bg: 'rgba(30,27,75,0.7)',
    border: 'rgba(99,102,241,0.4)',
    color: '#a5b4fc',
    path: (
      <>
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="8" y1="21" x2="16" y2="21" />
      </>
    ),
  },
  camara: {
    bg: 'rgba(5,46,22,0.7)',
    border: 'rgba(22,163,74,0.4)',
    color: '#86efac',
    path: (
      <>
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
  },
  cctv: {
    bg: 'rgba(67,20,7,0.7)',
    border: 'rgba(180,83,9,0.4)',
    color: '#fcd34d',
    path: (
      <>
        <path d="M2 8h14l4-4" />
        <path d="M2 8l4 8h6" />
        <circle cx="10" cy="19" r="2" />
        <line x1="6" y1="16" x2="6" y2="19" />
        <line x1="6" y1="19" x2="8" y2="19" />
      </>
    ),
  },
}

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
    watch,
    formState: { errors },
  } = useFormContext<CadFormData>()

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'involucrados',
  })

  const {
    fields: lesionadosFields,
    append: appendLesionado,
    remove: removeLesionado,
  } = useFieldArray({ control, name: 'lesionados' })

  const {
    fields: fallecidosFields,
    append: appendFallecido,
    remove: removeFallecido,
  } = useFieldArray({ control, name: 'fallecidos' })

  const {
    fields: recursosFields,
    remove: removeRecurso,
    replace: replaceRecursos,
  } = useFieldArray({ control, name: 'recursos' })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [obsAbiertas, setObsAbiertas] = useState(false)
  const obsValue = watch('notasAseguramiento')
  useEffect(() => { if (obsValue) setObsAbiertas(true) }, [obsValue])
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
                      className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base transition-all duration-150"
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

      {/* ── Lesionados y Fallecidos ── */}
      <div>
        <SectionTitle>Lesionados y fallecidos</SectionTitle>

        {/* Contadores */}
        <div className="flex justify-center gap-6 mb-4">
          {/* Lesionados */}
          <div className="inline-flex flex-col items-center rounded-lg border border-border/40 bg-bg-base/30 px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted/80 mb-3">
              Lesionados
            </p>
            <div className="flex items-center gap-2 bg-bg-base/60 border border-border/40 rounded-full px-1 py-0.5">
              <button
                type="button"
                onClick={() => lesionadosFields.length > 0 && removeLesionado(lesionadosFields.length - 1)}
                className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base transition-all duration-150"
              >−</button>
              <span className="min-w-[1.25rem] text-center text-sm font-semibold text-text-primary tabular-nums">
                {lesionadosFields.length}
              </span>
              <button
                type="button"
                onClick={() => appendLesionado({ identificacion: '', gravedad: undefined, infoAdicional: '' })}
                className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base transition-all duration-150"
              >+</button>
            </div>
          </div>

          {/* Fallecidos */}
          <div className="inline-flex flex-col items-center rounded-lg border border-border/40 bg-bg-base/30 px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted/80 mb-3">
              Fallecidos
            </p>
            <div className="flex items-center gap-2 bg-bg-base/60 border border-border/40 rounded-full px-1 py-0.5">
              <button
                type="button"
                onClick={() => fallecidosFields.length > 0 && removeFallecido(fallecidosFields.length - 1)}
                className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base transition-all duration-150"
              >−</button>
              <span className="min-w-[1.25rem] text-center text-sm font-semibold text-text-primary tabular-nums">
                {fallecidosFields.length}
              </span>
              <button
                type="button"
                onClick={() => appendFallecido({ identificacion: '', infoAdicional: '' })}
                className="w-6 h-6 rounded-full border border-accent/60 bg-accent/10 flex items-center justify-center text-base leading-none font-light text-accent hover:bg-accent hover:text-bg-base transition-all duration-150"
              >+</button>
            </div>
          </div>
        </div>

        {/* Cards lesionados */}
        {lesionadosFields.length > 0 && (
          <div className="flex flex-col gap-2 mb-3">
            {lesionadosFields.map((field, idx) => (
              <div key={field.id} className="rounded-lg border border-border/40 bg-bg-base/30 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent/70">
                    Lesionado {idx + 1}
                  </p>
                  <button type="button" onClick={() => removeLesionado(idx)} className="text-xs text-text-muted hover:text-red-400 transition-colors">✕</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FieldWrapper label="Identificación">
                    <CadInput
                      placeholder="Ej: CC 123456"
                      {...register(`lesionados.${idx}.identificacion`)}
                    />
                  </FieldWrapper>
                  <FieldWrapper label="Gravedad">
                    <CadSelect {...register(`lesionados.${idx}.gravedad`)}>
                      <option value="">Seleccionar</option>
                      <option value="leve">Leve</option>
                      <option value="moderado">Moderado</option>
                      <option value="grave">Grave</option>
                      <option value="critico">Crítico</option>
                    </CadSelect>
                  </FieldWrapper>
                </div>
                <FieldWrapper label="Info adicional">
                  <CadInput
                    placeholder="Observaciones..."
                    {...register(`lesionados.${idx}.infoAdicional`)}
                  />
                </FieldWrapper>
              </div>
            ))}
          </div>
        )}

        {/* Cards fallecidos */}
        {fallecidosFields.length > 0 && (
          <div className="flex flex-col gap-2">
            {fallecidosFields.map((field, idx) => (
              <div key={field.id} className="rounded-lg border border-border/40 bg-bg-base/30 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent/70">
                    Fallecido {idx + 1}
                  </p>
                  <button type="button" onClick={() => removeFallecido(idx)} className="text-xs text-text-muted hover:text-red-400 transition-colors">✕</button>
                </div>
                <FieldWrapper label="Identificación">
                  <CadInput
                    placeholder="Ej: CC 123456"
                    {...register(`fallecidos.${idx}.identificacion`)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Info adicional">
                  <CadInput
                    placeholder="Observaciones..."
                    {...register(`fallecidos.${idx}.infoAdicional`)}
                  />
                </FieldWrapper>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Medios y recursos ── */}
      <div>
        <SectionTitle>Medios y recursos</SectionTitle>

        {/* Grupos de recursos — misma fila */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {(
            [
              { titulo: 'Grabación / Audio', tipos: ['grabacion', 'camara'] as TipoRecurso[] },
              { titulo: 'Cámaras CCTV',      tipos: ['cctv']               as TipoRecurso[] },
            ] as const
          ).map(({ titulo, tipos }) => {
            const grupo = recursosFields
              .map((f, idx) => ({ field: f, idx }))
              .filter(({ field }) => tipos.includes(field.tipo as TipoRecurso))

            const initialCount = RECURSOS_INICIALES.filter(r => tipos.includes(r.tipo)).length
            const needsRestore = grupo.length < initialCount

            const restoreGroup = () => {
              // field.id es generado por RHF, usamos tipo+label como clave única
              const nonGroupKeys = new Set(
                recursosFields
                  .filter(f => !tipos.includes(f.tipo as TipoRecurso))
                  .map(f => `${f.tipo}|${f.label}`)
              )
              const restored = RECURSOS_INICIALES.filter(
                r => tipos.includes(r.tipo) || nonGroupKeys.has(`${r.tipo}|${r.label}`)
              )
              replaceRecursos(restored)
            }

            return (
              <div key={titulo}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    {titulo}
                  </p>
                  {needsRestore && (
                    <button
                      type="button"
                      onClick={restoreGroup}
                      className="flex items-center gap-1 text-[10px] text-text-muted/60 hover:text-accent transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.5L1 10"/>
                      </svg>
                      Restaurar
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {grupo.map(({ field, idx }) => {
                    const tipo = field.tipo as TipoRecurso
                    const style = RECURSO_STYLE[tipo]
                    return (
                      <div
                        key={field.id}
                        className="relative w-24 h-24 rounded-lg border flex flex-col items-center justify-center gap-1.5 overflow-hidden"
                        style={{ background: style.bg, borderColor: style.border }}
                      >
                        <button
                          type="button"
                          onClick={() => removeRecurso(idx)}
                          className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:text-red-400 text-[10px] transition-colors"
                        >✕</button>
                        <svg viewBox="0 0 24 24" fill="none" stroke={style.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
                          {style.path}
                        </svg>
                        <p className="text-[9px] text-center leading-tight px-1" style={{ color: style.color }}>
                          {field.label}
                        </p>
                      </div>
                    )
                  })}

                  {grupo.length === 0 && (
                    <p className="text-xs text-text-muted/40 italic self-center">Sin recursos</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Auditoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-full mt-1">
            {!obsAbiertas ? (
              <button
                type="button"
                onClick={() => setObsAbiertas(true)}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-150 py-1 group"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded border border-border/50 text-base leading-none group-hover:border-accent group-hover:text-accent transition-colors">+</span>
                <span>Agregar observaciones</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent/80">Observaciones</span>
                  <button type="button" onClick={() => setObsAbiertas(false)} className="text-xs text-text-muted hover:text-accent transition-colors">✕ cerrar</button>
                </div>
                <CadTextarea
                  placeholder="Observaciones del supervisor / control de calidad..."
                  rows={4}
                  {...register('notasAseguramiento')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
