import { type CadFormData } from '../schema'

export const DEMO_PASO1: Partial<CadFormData> = {
  telefono: '+57 300 123 4567',
  ubicacionAuto: 'Cra 45 # 23-10, Medellín',
  nombreLlamante: 'Carlos Andrés Mejía',
  numeroRetorno: '+57 311 987 6543',
  idioma: 'Español',
  esDeLlamadaRepetida: false,
  esTTY: false,
  direccion: 'Cra 45 # 23-10',
  nombreCalle: 'Avenida El Poblado',
  calleTransversal: 'Frente al Parque Laureles',
  ciudad: 'Medellín',
  pisoApartamento: 'Local 3',
  referenciaMapas: 'G-14',
  fechaHoraRecepcion: '2026-05-21T14:35',
  idOperador: 'OPR-042',
  canal: 'telefono',
  prioridad: 2,
  tipoIncidente: 'accidente_transito',
  subtipoIncidente: 'Colisión entre vehículos',
  narrativaQueja:
    'Ciudadano reporta accidente de tránsito en vía principal con dos vehículos involucrados. Hay al menos una persona herida que solicita atención médica urgente.',
}

export const DEMO_PASO2: Partial<CadFormData> = {
  numeroCad: 'CAD-2026-00841',
  estadoIncidente: 'despachado',
  claseIncidente: 'Seguridad vial',
  nivelRespuesta: 'Alpha',
  agenciaZona: 'Policía Metropolitana — Zona Centro',
  sectorDistrito: 'Sector 4-B',
  esMutualAid: false,
  idUnidad: 'PAT-117',
  tipoUnidad: 'patrulla',
  idOficialTripulacion: 'OF-334',
  estadoUnidad: 'En ruta',
  metodoDespacho: 'radio',
  horaDespacho: '2026-05-21T14:38',
  horaEnCamino: '2026-05-21T14:40',
  tiempoEstimadoLlegada: '2026-05-21T14:50',
  horaLlegadaEscena: '2026-05-21T14:49',
  horaContactoPaciente: '2026-05-21T14:52',
  horaDisponible: '2026-05-21T15:30',
  horaCierreIncidente: '2026-05-21T15:35',
  codigoDisposicion: 'D-07',
  narrativaResultado:
    'Unidad llegó a escena. Se asistió a los heridos. Paciente trasladado a Clínica Las Américas. Vía despejada a las 15:20.',
  numeroReporte: 'RMS-2026-0441',
  requiereRevisionSupervisor: false,
}

export const DEMO_PASO3: Partial<CadFormData> = {
  nombreInvolucrado: 'Juan Pablo Rodríguez',
  fechaNacimientoEdad: '1985-03-22 / 41 años',
  placaVehiculo: 'HJK-392 — Sedan gris Toyota Corolla',
  tieneArmas: false,
  tieneHazmat: false,
  tieneAntecedentes: false,
  tieneOrdenCaptura: false,
  enlaceGrabacion: 'https://storage.broadsec.co/recordings/2026-05-21-14h35.mp3',
  enlaceCamaraEscena: 'https://cctv.medellin.gov.co/cam/G14-2026-05-21',
  notasAseguramiento:
    'Caso documentado correctamente. Sin irregularidades. Supervisado por operador jefe de turno.',
  idDespachador: 'DSP-019',
}

export const DEMO_POR_PASO = [DEMO_PASO1, DEMO_PASO2, DEMO_PASO3]
