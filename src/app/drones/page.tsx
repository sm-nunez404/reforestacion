'use client'

import DroneList from '@/components/drones/DroneList';

export default function DronesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Control de Drones</h1>
        <p className="text-gray-600">
          Monitorea y controla la flota de drones para reforestación
        </p>
      </div>
      
      <DroneList />
    </div>
  );
}
