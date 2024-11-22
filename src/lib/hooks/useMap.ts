import create from 'zustand';
import areasData from '@/data/mock/areas.json';
import dronesData from '@/data/mock/drones.json';
import { AreaReforestacion } from '@/types/areas';
import { Drone } from '@/types/drones';

interface MapState {
  center: [number, number];
  zoom: number;
  areas: AreaReforestacion[];
  drones: Drone[];
  layers: {
    areas: boolean;
    drones: boolean;
    semillas: boolean;
  };
  toggleLayer: (layerId: 'areas' | 'drones' | 'semillas') => void;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
}

const convertDroneDates = (drones: any[]): Drone[] => {
  return drones.map((drone) => ({
    ...drone,
    ultimaActualizacion: new Date(drone.ultimaActualizacion),
    ultimaActividad: new Date(drone.ultimaActividad),
    misionActual: drone.misionActual
      ? {
          ...drone.misionActual,
          inicio: new Date(drone.misionActual.inicio),
          fin: drone.misionActual.fin ? new Date(drone.misionActual.fin) : undefined,
        }
      : null,
  }));
};

export const useMap = create<MapState>((set) => ({
  center: [-18.3323, -59.7591], // Roboré coordinates
  
  zoom: 13,
  areas: areasData.areas,
  drones: convertDroneDates(dronesData.drones),
  layers: {
    areas: true,
    drones: true,
    semillas: false,
  },
  toggleLayer: (layerId) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layerId]: !state.layers[layerId],
      },
    })),
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
}));