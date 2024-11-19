'use client'

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plane, Leaf, MapPin, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    tipo: 'drone',
    mensaje: 'Drone D001 completó misión en Sector A',
    tiempo: '10 min',
    icono: Plane,
    color: 'text-blue-500'
  },
  {
    id: 2,
    tipo: 'siembra',
    mensaje: '500 semillas plantadas en Zona Norte',
    tiempo: '25 min',
    icono: Leaf,
    color: 'text-green-500'
  },
  {
    id: 3,
    tipo: 'area',
    mensaje: 'Nueva área marcada para reforestación',
    tiempo: '1h',
    icono: MapPin,
    color: 'text-purple-500'
  },
  {
    id: 4,
    tipo: 'alerta',
    mensaje: 'Nivel bajo de batería en Drone D003',
    tiempo: '2h',
    icono: AlertTriangle,
    color: 'text-yellow-500'
  }
];

export default function ActivityList() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icono;
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`mt-1 ${activity.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.mensaje}</p>
                <p className="text-xs text-gray-500">Hace {activity.tiempo}</p>
              </div>
              <Badge variant="secondary">{activity.tipo}</Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
