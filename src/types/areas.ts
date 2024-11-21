export interface AreaReforestacion {
    id: string;
    nombre: string;
    descripcion: string;
    tipo: string;
    progreso: number;
    superficie: number;
    semillasPlantadas: number;
    poligono: { lat: number; lng: number }[];
    especies: string[];
    fechaInicio: string;
    ultimaActualizacion: string;
    tipoTerreno: string;
    prioridad: string;
    condicionesOptimas: {
      temperatura: { min: number; max: number };
      humedad: { min: number; max: number };
      tipoSuelo: string[];
    };
  }