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
  estado: string;
  ultimaActualizacion: Date;
  altitud: number;
  ultimaActividad: Date;
}

export interface DroneStats {
  total: number;
  activos: number;
  inactivos: number;
  enMantenimiento: number;
}

export interface DroneMission {
  id: string;
  droneId: string;
  estado: 'pendiente' | 'en_curso' | 'completada' | 'cancelada';
  areaObjetivo: {
    lat: number;
    lng: number;
    radio: number;
  };
  fechaInicio?: Date;
  fechaFin?: Date;
  semillasObjetivo: number;
  progreso: number;
}
