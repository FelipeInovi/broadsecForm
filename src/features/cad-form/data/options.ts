export const CANALES = [
  { value: 'telefono', label: 'Teléfono' },
  { value: 'radio', label: 'Radio' },
  { value: 'app', label: 'Aplicación' },
]

export const PRIORIDADES = [
  { value: 1, label: '1 — Crítica' },
  { value: 2, label: '2 — Alta' },
  { value: 3, label: '3 — Media' },
  { value: 4, label: '4 — Baja' },
  { value: 5, label: '5 — Rutinaria' },
]

export const TIPOS_INCIDENTE = [
  { value: 'accidente_transito', label: 'Accidente de tránsito' },
  { value: 'incendio', label: 'Incendio' },
  { value: 'emergencia_medica', label: 'Emergencia médica' },
  { value: 'robo', label: 'Robo' },
  { value: 'disturbio', label: 'Disturbio' },
  { value: 'hurto', label: 'Hurto' },
  { value: 'violencia_intrafamiliar', label: 'Violencia intrafamiliar' },
  { value: 'herido', label: 'Persona herida' },
  { value: 'otro', label: 'Otro' },
]

export const TIPOS_UNIDAD = [
  { value: 'patrulla', label: 'Patrulla' },
  { value: 'bomberos', label: 'Bomberos' },
  { value: 'ems', label: 'EMS / Ambulancia' },
  { value: 'otro', label: 'Otro' },
]

export const ESTADOS_INCIDENTE = [
  { value: 'activo', label: 'Activo' },
  { value: 'despachado', label: 'Despachado' },
  { value: 'en_camino', label: 'En camino' },
  { value: 'en_escena', label: 'En escena' },
  { value: 'cerrado', label: 'Cerrado' },
]

export const METODOS_DESPACHO = [
  { value: 'radio', label: 'Radio' },
  { value: 'mdt', label: 'MDT (Terminal digital)' },
]

export const IDIOMAS = [
  { value: 'Español', label: 'Español' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Portugués', label: 'Portugués' },
  { value: 'Otro', label: 'Otro / Intérprete' },
]

export const PASOS = [
  { numero: 1, titulo: 'Recepción de llamada' },
  { numero: 2, titulo: 'Despacho del incidente' },
  { numero: 3, titulo: 'Información extendida' },
]
