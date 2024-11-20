'use client'

import { create } from 'zustand';
import areasData from '@/data/mock/areas.json'
import dronesData from '@/data/mock/drones.json'
import { AreaReforestacion } from '@/types/map'
import { Drone } from '@/types/drones'

interface MapState {
  center: [number, number]
  zoom: number
  areas: AreaReforestacion[]
  drones: Drone[]
  layers: {
    areas: boolean
    drones: boolean
    semillas: boolean
  }
  toggleLayer: (layerId: 'areas' | 'drones' | 'semillas') => void
  setCenter: (center: [number, number]) => void
  setZoom: (zoom: number) => void
}

export const useMap = create<MapState>((set) => ({
  center: [-17.7863, -63.1812], // Santa Cruz coordinates
  zoom: 13,
  areas: areasData.areas,
  drones: dronesData.drones,
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
}))
