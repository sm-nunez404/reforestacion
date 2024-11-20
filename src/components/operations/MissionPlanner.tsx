'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Target, Route, Save, Play } from 'lucide-react';

interface MissionPlannerProps {
  onCreateMission: (mission: any) => void;
}

export default function MissionPlanner({ onCreateMission }: MissionPlannerProps) {
  const [missionName, setMissionName] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h3 className="font-semibold">Planificador de Misión</h3>
        
        <div className="space-y-2">
          <Input
            placeholder="Nombre de la misión"
            value={missionName}
            onChange={(e) => setMissionName(e.target.value)}
          />
          
          <div className="flex space-x-2">
            <Button
              variant={isPlanning ? 'primary' : 'outline'}
              onClick={() => setIsPlanning(!isPlanning)}
            >
              <Target className="w-4 h-4 mr-2" />
              {isPlanning ? 'Finalizar Ruta' : 'Crear Ruta'}
            </Button>
            
            <Button
              variant="outline"
              disabled={!missionName}
            >
              <Route className="w-4 h-4 mr-2" />
              Optimizar Ruta
            </Button>
            
            <Button
              variant="outline"
              disabled={!missionName}
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            
            <Button
              variant="primary"
              disabled={!missionName}
            >
              <Play className="w-4 h-4 mr-2" />
              Iniciar Misión
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          {isPlanning ? 
            'Haz clic en el mapa para crear puntos de ruta' : 
            'Crea una nueva ruta o selecciona una existente'
          }
        </div>
      </div>
    </Card>
  );
}
