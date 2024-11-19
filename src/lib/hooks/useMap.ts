'use client'

import { create } from 'zustand';
import { mapService } from '../services/mapService';
import { MapConfig, AreaReforestacion, MapLayer } from '@/types/map';
import { Drone } from '@/types/drones';

export type MapLayerId = 'areas' | 'drones' | 'semillas';

interface MapStore {
  center: [number, number];
  zoom: number;
  areas: AreaReforestacion[];
  drones: Drone[];
  layers: Record<MapLayerId, boolean>;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  toggleLayer: (layerId: MapLayerId) => void;
  loadAreas: () => Promise<void>;
  loadDrones: () => Promise<void>;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleMeasurement: () => void;
  downloadArea: () => void;
}

export const useMap = create<MapStore>((set, get) => ({
  center: [-17.7863, -63.1812],
  zoom: 13,
  areas: [],
  drones: [],
  layers: {
    areas: true,
    drones: true,
    semillas: true,
  },

  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),

  toggleLayer: (layerId) => set((state) => ({
    layers: {
      ...state.layers,
      [layerId]: !state.layers[layerId],
    },
  })),

  loadAreas: async () => {
    const areas = await mapService.getAreasReforestacion();
    set({ areas });
  },

  loadDrones: async () => {
    // Aquí iría la llamada al servicio de drones
    set({ drones: [] });
  },

  zoomIn: () => set((state) => ({ zoom: state.zoom + 1 })),
  zoomOut: () => set((state) => ({ zoom: state.zoom - 1 })),

  toggleMeasurement: () => {
    // Implementar lógica de medición
  },

  downloadArea: () => {
    // Implementar lógica de descarga
  },
}));
