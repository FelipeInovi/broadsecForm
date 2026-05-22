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
  notasDespacho: 'Unidad llegó a escena. Se asistió a los heridos. Paciente trasladado a Clínica Las Américas.',
  asignacionesAdicionales: [
    {
      agencia: 'Cuerpo de Bomberos',
      idUnidad: 'BOM-003',
      tipoUnidad: 'bomberos',
      horaDespacho: '2026-05-21T14:42',
      horaLlegadaEscena: '2026-05-21T14:55',
      tiempoEstimadoLlegada: '2026-05-21T14:58',
    },
  ],
}

export const DEMO_PASO3: Partial<CadFormData> = {
  involucrados: [
    { tipo: 'hombre',    valores: ['CC 1020304050'] },
    { tipo: 'mujer',     valores: ['CC 87654321'] },
    { tipo: 'vehiculo',  valores: ['HJK-392'] },
    { tipo: 'animal',    valores: ['Canino'] },
  ],
  enlaceGrabacion: 'https://storage.broadsec.co/recordings/2026-05-21-14h35.mp3',
  enlaceCamaraEscena: 'https://cctv.medellin.gov.co/cam/G14-2026-05-21',
  notasAseguramiento:
    'Caso documentado correctamente. Sin irregularidades. Supervisado por operador jefe de turno.',
  idDespachador: 'DSP-019',
}

export const DEMO_POR_PASO = [DEMO_PASO1, DEMO_PASO2, DEMO_PASO3]
