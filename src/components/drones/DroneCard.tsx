'use client'

import { Drone } from '@/types/drones';
import { Battery, Signal, Navigation2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface DroneCardProps {
  drone: Drone;
}

export default function DroneCard({ drone }: DroneCardProps) {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      case 'en_mantenimiento':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (nivel: number) => {
    if (nivel > 70) return 'text-green-500';
    if (nivel > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{drone.nombre}</h3>
          <Badge className={getStatusColor(drone.estado)}>
            {drone.estado.replace('_', ' ')}
          </Badge>
        </div>
        <Signal className={
          drone.estado === 'activo' ? 'text-green-500' : 'text-gray-400'
        } />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Battery className={getBatteryColor(drone.bateria)} />
            <span>{drone.bateria}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Navigation2 className="text-blue-500" />
            <span>{drone.altitud}m</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Semillas</p>
            <p className="font-medium">
              {drone.semillasRestantes}/{drone.capacidadSemillas}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Última actividad</p>
            <p className="font-medium">
              {new Date(drone.ultimaActividad).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            Detalles
          </Button>
          <Button 
            variant={drone.estado === 'activo' ? 'danger' : 'primary'}
            size="sm"
            className="flex-1"
          >
            {drone.estado === 'activo' ? 'Detener' : 'Iniciar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
