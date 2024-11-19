import { create } from 'zustand'
import { Drone } from '../../types/drones'
import { Semilla } from '../../types/semillas'

interface AppState {
  selectedDrone: Drone | null;
  selectedSemilla: Semilla | null;
  setSelectedDrone: (drone: Drone | null) => void;
  setSelectedSemilla: (semilla: Semilla | null) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedDrone: null,
  selectedSemilla: null,
  setSelectedDrone: (drone) => set({ selectedDrone: drone }),
  setSelectedSemilla: (semilla) => set({ selectedSemilla: semilla }),
}))
