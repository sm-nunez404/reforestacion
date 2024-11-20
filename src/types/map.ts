export interface MapConfig {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
}

export interface AreaReforestacion {
  id: string;
  nombre: string;
  tipo: 'completada' | 'en_proceso' | 'pendiente';
  poligono: {
    lat: number;
    lng: number;
  }[];
  superficie: number;
  fechaInicio: string | null;
  fechaFin?: string;
  progreso: number;
  semillasPlantadas: number;
  tipoTerreno: string;
  prioridad: string;
  condicionesOptimas: {
    temperatura: {
      min: number;
      max: number;
    };
    humedad: {
      min: number;
      max: number;
    };
  };
}

export interface MapLayer {
  id: string;
  nombre: string;
  visible: boolean;
  tipo: 'drones' | 'areas' | 'semillas' | 'terreno';
  datos: any;
}

export type MapLayerId = 'areas' | 'drones' | 'semillas';

export interface DrawnArea {
  id: string;
  type: 'polygon' | 'rectangle' | 'circle';
  coordinates: any;
  properties: {
    name: string;
    description?: string;
    status: 'pendiente' | 'en_proceso' | 'completada';
    area: number;
    perimeter?: number;
    progress: number;
    seedsPlanted: number;
    createdAt: Date;
    updatedAt: Date;
  }
}
