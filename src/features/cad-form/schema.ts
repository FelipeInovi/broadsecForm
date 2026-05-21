import { z } from 'zod'

// ─── Paso 1: Recepción de llamada ──────────────────────────────────────────

const identificacionLlamante = z.object({
  telefono: z.string().min(7, 'Ingrese un número válido'),
  ubicacionAuto: z.string().optional(),
  nombreLlamante: z.string().min(2, 'Nombre requerido'),
  numeroRetorno: z.string().optional(),
  idioma: z.string().default('Español'),
  esDeLlamadaRepetida: z.boolean().default(false),
  esTTY: z.boolean().default(false),
})

const ubicacionIncidente = z.object({
  direccion: z.string().min(3, 'Dirección requerida'),
  nombreCalle: z.string().min(2, 'Calle requerida'),
  calleTransversal: z.string().optional(),
  ciudad: z.string().min(2, 'Ciudad requerida'),
  coordenadas: z
    .object({ lat: z.number(), lon: z.number() })
    .optional(),
  pisoApartamento: z.string().optional(),
  referenciaMapas: z.string().optional(),
})

const recepcionLlamada = z.object({
  fechaHoraRecepcion: z.string().min(1, 'Fecha y hora requeridas'),
  idOperador: z.string().min(1, 'ID operador requerido'),
  canal: z.enum(['telefono', 'radio', 'app'], {
    errorMap: () => ({ message: 'Seleccione un canal' }),
  }),
  prioridad: z.number().min(1).max(5),
  tipoIncidente: z.string().min(1, 'Tipo de incidente requerido'),
  subtipoIncidente: z.string().optional(),
  narrativaQueja: z.string().optional(),
})

export const paso1Schema = identificacionLlamante
  .merge(ubicacionIncidente)
  .merge(recepcionLlamada)

// ─── Paso 2: Despacho del incidente ───────────────────────────────────────

const registroIncidente = z.object({
  numeroCad: z.string().min(1, 'Número CAD requerido'),
  estadoIncidente: z.enum([
    'activo',
    'despachado',
    'en_camino',
    'en_escena',
    'cerrado',
  ]),
  claseIncidente: z.string().min(1, 'Clase requerida'),
  nivelRespuesta: z.string().min(1, 'Nivel de respuesta requerido'),
  agenciaZona: z.string().min(1, 'Agencia o zona requerida'),
  sectorDistrito: z.string().optional(),
  esMutualAid: z.boolean().default(false),
  incidentesRelacionados: z.array(z.string()).optional(),
})

const asignacionRecursos = z.object({
  idUnidad: z.string().min(1, 'ID de unidad requerido'),
  tipoUnidad: z.enum(['patrulla', 'bomberos', 'ems', 'otro'], {
    errorMap: () => ({ message: 'Seleccione tipo de unidad' }),
  }),
  idOficialTripulacion: z.string().min(1, 'ID oficial requerido'),
  estadoUnidad: z.string().min(1, 'Estado de unidad requerido'),
  metodoDespacho: z.enum(['radio', 'mdt'], {
    errorMap: () => ({ message: 'Seleccione método de despacho' }),
  }),
  horaDespacho: z.string().min(1, 'Hora de despacho requerida'),
  horaEnCamino: z.string().optional(),
  tiempoEstimadoLlegada: z.string().optional(),
})

const timestampsCierre = z.object({
  horaLlegadaEscena: z.string().optional(),
  horaContactoPaciente: z.string().optional(),
  horaDisponible: z.string().optional(),
  horaCierreIncidente: z.string().optional(),
  codigoDisposicion: z.string().min(1, 'Código de disposición requerido'),
  narrativaResultado: z.string().optional(),
  numeroReporte: z.string().optional(),
  requiereRevisionSupervisor: z.boolean().default(false),
})

export const paso2Schema = registroIncidente
  .merge(asignacionRecursos)
  .merge(timestampsCierre)

// ─── Paso 3: Información extendida ────────────────────────────────────────

const partesInvolucradas = z.object({
  nombreInvolucrado: z.string().optional(),
  fechaNacimientoEdad: z.string().optional(),
  placaVehiculo: z.string().optional(),
  tieneArmas: z.boolean().default(false),
  tieneHazmat: z.boolean().default(false),
  tieneAntecedentes: z.boolean().default(false),
  tieneOrdenCaptura: z.boolean().default(false),
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
