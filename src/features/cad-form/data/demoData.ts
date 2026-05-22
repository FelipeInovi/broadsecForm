import { type CadFormData } from '../schema'

export const DEMO_PASO1: Partial<CadFormData> = {
  nombreLlamante: 'Carlos Andrés Mejía',
  telefono: '+57 300 123 4567',
  esDeLlamadaRepetida: false,
  direccion: 'Cra 45 # 23-10',
  ciudad: 'Medellín',
  pisoApartamento: 'Local 3',
  tipoIncidente: 'accidente_transito',
  prioridad: 2,
  notasAdicionales:
    'Ciudadano reporta accidente de tránsito en vía principal con dos vehículos involucrados. Hay al menos una persona herida que solicita atención médica urgente.',
}

export const DEMO_PASO2: Partial<CadFormData> = {
  numeroCad: 'CAD-2026-00841',
  agencia: 'Policía Metropolitana',
  zona: 'Zona Centro',
  esMutualAid: false,
  idUnidad: 'PAT-117',
  tipoUnidad: 'patrulla',
  horaDespacho: '2026-05-21T14:38',
  horaEnCamino: '2026-05-21T14:40',
  tiempoEstimadoLlegada: '2026-05-21T14:50',
  horaLlegadaEscena: '2026-05-21T14:49',
  horaContactoPaciente: '2026-05-21T14:52',
  horaCierreIncidente: '2026-05-21T15:35',
  narrativaResultado:
    'Unidad llegó a escena. Se asistió a los heridos. Paciente trasladado a Clínica Las Américas. Vía despejada a las 15:20.',
  numeroReporte: 'RMS-2026-0441',
}

export const DEMO_PASO3: Partial<CadFormData> = {
  involucrados: [
    { tipo: 'persona',  valor: 'CC 1020304050' },
    { tipo: 'persona',  valor: 'CC 87654321' },
    { tipo: 'vehiculo', valor: 'HJK-392' },
    { tipo: 'animal',   valor: 'Canino' },
  ],
  enlaceGrabacion: 'https://storage.broadsec.co/recordings/2026-05-21-14h35.mp3',
  enlaceCamaraEscena: 'https://cctv.medellin.gov.co/cam/G14-2026-05-21',
  notasAseguramiento:
    'Caso documentado correctamente. Sin irregularidades. Supervisado por operador jefe de turno.',
  idDespachador: 'DSP-019',
}

export const DEMO_POR_PASO = [DEMO_PASO1, DEMO_PASO2, DEMO_PASO3]
