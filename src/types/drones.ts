// Tipos de estados

export type DroneEstado = 'activo' | 'inactivo' | 'en_mantenimiento' | 'cargando';
export type MisionEstado = 'pendiente' | 'en_curso' | 'completada' | 'cancelada';

// Interfaz principal de Drone
export interface Drone {
  id: string;
  nombre: string;
  bateria: number;
  semillasRestantes: number;
  capacidadSemillas: number;
  ubicacion: {
    lat: number;
    lng: number;
  };
  modelo: string;
  estado: DroneEstado;
  ultimaActualizacion: Date;
  altitud: number;
  ultimaActividad: Date;
  misionActual?: DroneMission;
}

// Interfaz para misiones
export interface DroneMission {
  id: string;
  tipo: 'siembra' | 'monitoreo' | 'mantenimiento' | 'reconocimiento';
  progreso: number;
  inicio: Date;
  fin?: Date;
}

// Estadísticas de drones
export interface DroneStats {
  total: number;
  activos: number;
  inactivos: number;
  enMantenimiento: number;
}

// Configuración del drone
export interface DroneConfig {
  velocidadMaxima: number;
  altitudMaxima: number;
  altitudMinima: number;
  capacidadBateria: number;
  tiempoCargaCompleta: number; // en minutos
}

// Historial de actividades
export interface DroneActivity {
  id: string;
  droneId: string;
  tipo: 'inicio_mision' | 'fin_mision' | 'recarga' | 'mantenimiento';
  fecha: Date;
  detalles: string;
}

// Tipo para actualizaciones en tiempo real
export type DroneUpdate = Partial<Drone>;

// Utilidad para crear un drone nuevo
export const createNewDrone = (data: Partial<Drone>): Drone => {
  return {
    id: crypto.randomUUID(),
    nombre: '',
    bateria: 100,
    semillasRestantes: 0,
    capacidadSemillas: 1000,
    ubicacion: { lat: 0, lng: 0 },
    modelo: '',
    estado: 'inactivo',
    ultimaActualizacion: new Date(),
    altitud: 0,
    ultimaActividad: new Date(),
    ...data
  };
};