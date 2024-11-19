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
  tipo: 'pendiente' | 'en_proceso' | 'completada';
  poligono: {
    lat: number;
    lng: number;
  }[];
  superficie: number; // en hectáreas
  fechaInicio?: Date;
  fechaFin?: Date;
  progreso: number;
  semillasPlantadas: number;
}

export interface MapLayer {
  id: string;
  nombre: string;
  visible: boolean;
  tipo: 'drones' | 'areas' | 'semillas' | 'terreno';
  datos: any;
}

export type MapLayerId = 'areas' | 'drones' | 'semillas';
