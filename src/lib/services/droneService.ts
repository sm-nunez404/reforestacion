import { Drone } from '@/types/drones';

export const droneService = {
  async getDrones(): Promise<Drone[]> {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            nombre: 'Drone-01',
            modelo: 'DJI Agras T30',
            estado: 'activo',
            bateria: 85,
            ubicacion: {
              lat: -17.7863,
              lng: -63.1812
            },
            ultimaActualizacion: new Date(),
            capacidadSemillas: 1000,
            semillasRestantes: 750,
            altitud: 100,
            ultimaActividad: new Date()
          },
          {
            id: '2',
            nombre: 'Drone-02',
            modelo: 'DJI Agras T30',
            estado: 'activo',
            bateria: 92,
            ubicacion: {
              lat: -17.7763,
              lng: -63.1912
            },
            ultimaActualizacion: new Date(),
            capacidadSemillas: 1000,
            semillasRestantes: 850,
            altitud: 120,
            ultimaActividad: new Date()
          },
        ]);
      }, 1000);
    });
  }
};
