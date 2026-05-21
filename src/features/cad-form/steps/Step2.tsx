import { useFormContext } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { CadToggle } from '@/components/form/CadToggle'
import { type CadFormData } from '../schema'
import { TIPOS_UNIDAD } from '../data/options'

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-border pb-2 mb-4 col-span-full">
      {children}
    </h3>
  )
}

export function Step2() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CadFormData>()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* ── Registro del incidente ── */}
      <SectionTitle>Registro del incidente</SectionTitle>

      <FieldWrapper label="Número CAD" error={errors.numeroCad?.message} required>
        <CadInput placeholder="Ej: CAD-2026-00123" {...register('numeroCad')} />
      </FieldWrapper>

      <FieldWrapper label="Agencia" error={errors.agencia?.message} required>
        <CadInput placeholder="Ej: Policía Metropolitana" {...register('agencia')} />
      </FieldWrapper>

      <FieldWrapper label="Zona asignada" error={errors.zona?.message} required>
        <CadInput placeholder="Ej: Zona Centro" {...register('zona')} />
      </FieldWrapper>

      <div className="flex items-center">
        <CadToggle label="Requiere ayuda mutua (Mutual Aid)" {...register('esMutualAid')} />
      </div>

      {/* ── Asignación de recursos ── */}
      <SectionTitle>Asignación de recursos</SectionTitle>

      <FieldWrapper label="ID Unidad / Recurso" error={errors.idUnidad?.message} required>
        <CadInput placeholder="Ej: PAT-045" {...register('idUnidad')} />
      </FieldWrapper>

      <FieldWrapper label="Tipo de unidad" error={errors.tipoUnidad?.message} required>
        <CadSelect {...register('tipoUnidad')}>
          <option value="">Seleccionar tipo</option>
          {TIPOS_UNIDAD.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </CadSelect>
      </FieldWrapper>

      <FieldWrapper label="Hora de despacho" error={errors.horaDespacho?.message} required>
        <CadInput type="datetime-local" {...register('horaDespacho')} />
      </FieldWrapper>

      <FieldWrapper label="Hora en camino" error={errors.horaEnCamino?.message}>
        <CadInput type="datetime-local" {...register('horaEnCamino')} />
      </FieldWrapper>

      <FieldWrapper label="Tiempo estimado de llegada" error={errors.tiempoEstimadoLlegada?.message}>
        <CadInput type="datetime-local" {...register('tiempoEstimadoLlegada')} />
      </FieldWrapper>

      {/* ── Timestamps y cierre ── */}
      <SectionTitle>Timestamps y cierre</SectionTitle>

      <FieldWrapper label="Hora de llegada a escena" error={errors.horaLlegadaEscena?.message}>
        <CadInput type="datetime-local" {...register('horaLlegadaEscena')} />
      </FieldWrapper>

      <FieldWrapper label="Hora contacto paciente / sujeto" error={errors.horaContactoPaciente?.message}>
        <CadInput type="datetime-local" {...register('horaContactoPaciente')} />
      </FieldWrapper>

      <FieldWrapper label="Hora cierre del incidente" error={errors.horaCierreIncidente?.message}>
        <CadInput type="datetime-local" {...register('horaCierreIncidente')} />
      </FieldWrapper>

      <FieldWrapper label="Número de reporte (RMS)" error={errors.numeroReporte?.message}>
        <CadInput placeholder="Ej: RMS-2026-0441" {...register('numeroReporte')} />
      </FieldWrapper>

      <FieldWrapper
        label="Narrativa del resultado"
        error={errors.narrativaResultado?.message}
        className="col-span-full"
      >
        <CadTextarea
          placeholder="Descripción del resultado de la intervención..."
          rows={3}
          {...register('narrativaResultado')}
        />
      </FieldWrapper>
    </div>
  )
}
