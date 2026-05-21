import { useFormContext } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadSelect } from '@/components/form/CadSelect'
import { CadTextarea } from '@/components/form/CadTextarea'
import { CadToggle } from '@/components/form/CadToggle'
import { type CadFormData } from '../schema'
import {
  ESTADOS_INCIDENTE,
  METODOS_DESPACHO,
  TIPOS_UNIDAD,
} from '../data/options'

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

      <FieldWrapper label="Estado del incidente" error={errors.estadoIncidente?.message} required>
        <CadSelect {...register('estadoIncidente')}>
          <option value="">Seleccionar estado</option>
          {ESTADOS_INCIDENTE.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </CadSelect>
      </FieldWrapper>

      <FieldWrapper label="Clase / Categoría" error={errors.claseIncidente?.message} required>
        <CadInput placeholder="Ej: Seguridad ciudadana" {...register('claseIncidente')} />
      </FieldWrapper>

      <FieldWrapper label="Nivel de respuesta" error={errors.nivelRespuesta?.message} required>
        <CadInput placeholder="Ej: Alpha, Bravo, Charlie" {...register('nivelRespuesta')} />
      </FieldWrapper>

      <FieldWrapper label="Agencia / Zona asignada" error={errors.agenciaZona?.message} required>
        <CadInput placeholder="Ej: Zona Centro, Policía M." {...register('agenciaZona')} />
      </FieldWrapper>

      <FieldWrapper label="Beat / Sector / Distrito" error={errors.sectorDistrito?.message}>
        <CadInput placeholder="Ej: Sector 4-B" {...register('sectorDistrito')} />
      </FieldWrapper>

      <div className="flex items-center col-span-full">
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

      <FieldWrapper label="ID Oficial / Tripulación" error={errors.idOficialTripulacion?.message} required>
        <CadInput placeholder="Ej: OF-221" {...register('idOficialTripulacion')} />
      </FieldWrapper>

      <FieldWrapper label="Estado de la unidad" error={errors.estadoUnidad?.message} required>
        <CadInput placeholder="Ej: Disponible, En ruta" {...register('estadoUnidad')} />
      </FieldWrapper>

      <FieldWrapper label="Método de despacho" error={errors.metodoDespacho?.message} required>
        <CadSelect {...register('metodoDespacho')}>
          <option value="">Seleccionar método</option>
          {METODOS_DESPACHO.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
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

      <FieldWrapper label="Hora disponible / libre" error={errors.horaDisponible?.message}>
        <CadInput type="datetime-local" {...register('horaDisponible')} />
      </FieldWrapper>

      <FieldWrapper label="Hora cierre del incidente" error={errors.horaCierreIncidente?.message}>
        <CadInput type="datetime-local" {...register('horaCierreIncidente')} />
      </FieldWrapper>

      <FieldWrapper label="Código de disposición" error={errors.codigoDisposicion?.message} required>
        <CadInput placeholder="Ej: D-01, CERRADO-SIN-NOVEDAD" {...register('codigoDisposicion')} />
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

      <div className="flex items-center col-span-full">
        <CadToggle
          label="Requiere revisión del supervisor"
          {...register('requiereRevisionSupervisor')}
        />
      </div>
    </div>
  )
}
