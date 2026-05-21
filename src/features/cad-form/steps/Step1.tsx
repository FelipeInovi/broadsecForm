import { useFormContext } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { CadToggle } from '@/components/form/CadToggle'
import { type CadFormData } from '../schema'
import {
  CANALES,
  IDIOMAS,
  PRIORIDADES,
  TIPOS_INCIDENTE,
} from '../data/options'

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-border pb-2 mb-4 col-span-full">
      {children}
    </h3>
  )
}

export function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CadFormData>()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* ── Identificación del llamante ── */}
      <SectionTitle>Identificación del llamante</SectionTitle>

      <FieldWrapper label="Teléfono / ANI" error={errors.telefono?.message} required>
        <CadInput
          placeholder="+57 300 000 0000"
          {...register('telefono')}
        />
      </FieldWrapper>

      <FieldWrapper label="Nombre del llamante" error={errors.nombreLlamante?.message} required>
        <CadInput placeholder="Nombre completo" {...register('nombreLlamante')} />
      </FieldWrapper>

      <FieldWrapper label="Número de retorno" error={errors.numeroRetorno?.message}>
        <CadInput placeholder="Número alternativo" {...register('numeroRetorno')} />
      </FieldWrapper>

      <FieldWrapper label="Ubicación automática (ALI)" error={errors.ubicacionAuto?.message}>
        <CadInput placeholder="Dirección detectada" {...register('ubicacionAuto')} />
      </FieldWrapper>

      <FieldWrapper label="Idioma / Intérprete" error={errors.idioma?.message}>
        <CadSelect {...register('idioma')}>
          {IDIOMAS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </CadSelect>
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

      {/* ── Recepción de llamada ── */}
      <SectionTitle>Recepción de llamada</SectionTitle>

      <FieldWrapper label="Fecha y hora de recepción" error={errors.fechaHoraRecepcion?.message} required>
        <CadInput type="datetime-local" {...register('fechaHoraRecepcion')} />
      </FieldWrapper>

      <FieldWrapper label="ID Operador" error={errors.idOperador?.message} required>
        <CadInput placeholder="Ej: OPR-001" {...register('idOperador')} />
      </FieldWrapper>

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

      <FieldWrapper
        label="Narrativa de la queja"
        error={errors.narrativaQueja?.message}
        className="col-span-full"
      >
        <CadTextarea
          placeholder="Descripción libre del incidente reportado..."
          rows={4}
          {...register('narrativaQueja')}
        />
      </FieldWrapper>
    </div>
  )
}
