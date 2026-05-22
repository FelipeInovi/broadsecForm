import { z } from 'zod'

// ─── Paso 1: Recepción de llamada ──────────────────────────────────────────

const identificacionLlamante = z.object({
  nombreLlamante: z.string().min(2, 'Nombre requerido'),
  telefono: z.string().min(7, 'Ingrese un número válido'),
  esDeLlamadaRepetida: z.boolean().default(false),
})

const ubicacionIncidente = z.object({
  direccion: z.string().min(3, 'Dirección requerida'),
  ciudad: z.string().min(2, 'Ciudad requerida'),
  coordenadas: z
    .object({ lat: z.number(), lon: z.number() })
    .optional(),
  pisoApartamento: z.string().optional(),
})

const recepcionLlamada = z.object({
  fechaHoraRecepcion: z.string().min(1, 'Fecha y hora requeridas'),
  idOperador: z.string().min(1, 'ID operador requerido'),
  prioridad: z.number().min(1).max(5),
  tipoIncidente: z.string().min(1, 'Tipo de incidente requerido'),
  notasAdicionales: z.string().optional(),
})

export const paso1Schema = identificacionLlamante
  .merge(ubicacionIncidente)
  .merge(recepcionLlamada)

// ─── Paso 2: Despacho del incidente ───────────────────────────────────────

const registroIncidente = z.object({
  numeroCad: z.string().min(1, 'Número CAD requerido'),
  agencia: z.string().min(1, 'Agencia requerida'),
  zona: z.string().min(1, 'Zona requerida'),
  esMutualAid: z.boolean().default(false),
  incidentesRelacionados: z.array(z.string()).optional(),
})

const asignacionRecursos = z.object({
  idUnidad: z.string().min(1, 'ID de unidad requerido'),
  tipoUnidad: z.enum(['patrulla', 'bomberos', 'ems', 'otro'], {
    errorMap: () => ({ message: 'Seleccione tipo de unidad' }),
  }),
  horaDespacho: z.string().min(1, 'Hora de despacho requerida'),
  horaEnCamino: z.string().optional(),
  tiempoEstimadoLlegada: z.string().optional(),
})

const timestampsCierre = z.object({
  horaLlegadaEscena: z.string().optional(),
  horaContactoPaciente: z.string().optional(),
  horaCierreIncidente: z.string().optional(),
  narrativaResultado: z.string().optional(),
  numeroReporte: z.string().optional(),
})

export const paso2Schema = registroIncidente
  .merge(asignacionRecursos)
  .merge(timestampsCierre)

// ─── Paso 3: Información extendida ────────────────────────────────────────

export const involucradoSchema = z.object({
  tipo: z.enum(['persona', 'animal', 'vehiculo']),
  valor: z.string().min(1, 'Campo requerido'),
})

export type Involucrado = z.infer<typeof involucradoSchema>

const partesInvolucradas = z.object({
  involucrados: z.array(involucradoSchema).optional(),
})

const mediaAuditoria = z.object({
  enlaceGrabacion: z.string().url('URL inválida').optional().or(z.literal('')),
  enlaceCamaraEscena: z
    .string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
  notasAseguramiento: z.string().optional(),
  idDespachador: z.string().min(1, 'ID despachador requerido'),
})

export const paso3Schema = partesInvolucradas.merge(mediaAuditoria)

// ─── Schema completo ───────────────────────────────────────────────────────

export const cadFormSchema = paso1Schema.merge(paso2Schema).merge(paso3Schema)

export type CadFormData = z.infer<typeof cadFormSchema>
export type Paso1Data = z.infer<typeof paso1Schema>
export type Paso2Data = z.infer<typeof paso2Schema>
export type Paso3Data = z.infer<typeof paso3Schema>
