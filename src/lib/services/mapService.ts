import { MapConfig, AreaReforestacion, MapLayer } from '@/types/map';

export const mapService = {
  async getMapConfig(): Promise<MapConfig> {
    
    // Configuración inicial del mapa centrada en Santa Cruz, Bolivia
    return {
      center: {
        lat: -18.3323,
        lng: -59.7591
      },
      zoom: 12,
      minZoom: 8,
      maxZoom: 18
    };
  },

  async getAreasReforestacion(): Promise<AreaReforestacion[]> {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            nombre: 'Zona Norte - Sector A',
            tipo: 'en_proceso',
            poligono: [
              { lat: -17.7563, lng: -63.1712 },
              { lat: -17.7663, lng: -63.1812 },
              { lat: -17.7763, lng: -63.1912 }
            ],
            superficie: 150,
            fechaInicio: '2024-01-15',
            progreso: 65,
            semillasPlantadas: 25000,
            tipoTerreno: '',
            prioridad: '',
            condicionesOptimas: {
              temperatura: {
                min: 0,
                max: 0
              },
              humedad: {
                min: 0,
                max: 0
              }
            }
          },
          // Más áreas...
        ]);
      }, 1000);
    });
  },

  async getMapLayers(): Promise<MapLayer[]> {
    return [
      {
        id: 'drones',
        nombre: 'Drones Activos',
        visible: true,
        tipo: 'drones',
        datos: null
      },
      {
        id: 'areas',
        nombre: 'Áreas de Reforestación',
        visible: true,
        tipo: 'areas',
        datos: null
      },
      // Más capas...
    ];
  }
};
