import { useFormContext } from 'react-hook-form'
import { FieldWrapper } from '@/components/form/FieldWrapper'
import { CadInput } from '@/components/form/CadInput'
import { CadTextarea } from '@/components/form/CadTextarea'
import { CadToggle } from '@/components/form/CadToggle'
import { type CadFormData } from '../schema'

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-border pb-2 mb-4 col-span-full">
      {children}
    </h3>
  )
}

export function Step3() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CadFormData>()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* ── Partes involucradas ── */}
      <SectionTitle>Partes involucradas</SectionTitle>

      <FieldWrapper label="Nombre (sospechoso / víctima / testigo)" error={errors.nombreInvolucrado?.message}>
        <CadInput placeholder="Nombre completo" {...register('nombreInvolucrado')} />
      </FieldWrapper>

      <FieldWrapper label="Fecha de nacimiento / Edad" error={errors.fechaNacimientoEdad?.message}>
        <CadInput placeholder="Ej: 1990-05-12 / 34 años" {...register('fechaNacimientoEdad')} />
      </FieldWrapper>

      <FieldWrapper label="Placa del vehículo + descripción" error={errors.placaVehiculo?.message}>
        <CadInput placeholder="Ej: ABC-123 — Sedan azul" {...register('placaVehiculo')} />
      </FieldWrapper>

      <div className="flex flex-col gap-3">
        <CadToggle label="Involucrado con armas" {...register('tieneArmas')} />
        <CadToggle label="Material peligroso (Hazmat)" {...register('tieneHazmat')} />
      </div>

      <div className="flex flex-col gap-3">
        <CadToggle label="Antecedentes en ubicación" {...register('tieneAntecedentes')} />
        <CadToggle label="Orden de captura / búsqueda activa" {...register('tieneOrdenCaptura')} />
      </div>

      {/* ── Medios y auditoría ── */}
      <SectionTitle>Medios y auditoría</SectionTitle>

      <FieldWrapper label="Enlace grabación / audio llamada" error={errors.enlaceGrabacion?.message}>
        <CadInput
          type="url"
          placeholder="https://..."
          {...register('enlaceGrabacion')}
        />
      </FieldWrapper>

      <FieldWrapper label="Enlace cámara corporal / CCTV" error={errors.enlaceCamaraEscena?.message}>
        <CadInput
          type="url"
          placeholder="https://..."
          {...register('enlaceCamaraEscena')}
        />
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

      {/* ── Resumen del reporte ── */}
      <div className="col-span-full mt-4 p-4 rounded-lg border border-accent/30 bg-accent/5">
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
