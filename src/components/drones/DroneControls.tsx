'use client'

import { useState } from 'react';
import { Drone } from '@/types/drones';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { ArrowUp, ArrowDown, RotateCw, Pause, Play } from 'lucide-react';

interface DroneControlsProps {
  drone: Drone;
  onUpdateStatus: (status: string) => void;
}

export default function DroneControls({ drone, onUpdateStatus }: DroneControlsProps) {
  const [altitude, setAltitude] = useState(25);
  const [speed, setSpeed] = useState(15);

  const handleAltitudeChange = (value: number) => {
    setAltitude(value);
    // Aquí iría la lógica para actualizar la altitud del drone
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    // Aquí iría la lógica para actualizar la velocidad del drone
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Control de Drone</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Altitud (metros)
          </label>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleAltitudeChange(altitude - 5)}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Slider
              value={altitude}
              onChange={handleAltitudeChange}
              min={10}
              max={50}
              step={1}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleAltitudeChange(altitude + 5)}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Velocidad (km/h)
          </label>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSpeedChange(speed - 5)}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Slider
              value={speed}
              onChange={handleSpeedChange}
              min={5}
              max={30}
              step={1}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSpeedChange(speed + 5)}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onUpdateStatus('retornar')}
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Retornar
          </Button>
          <Button 
            variant={drone.estado === 'activo' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={() => onUpdateStatus(drone.estado === 'activo' ? 'pausar' : 'iniciar')}
          >
            {drone.estado === 'activo' ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
