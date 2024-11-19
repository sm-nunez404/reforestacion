'use client'

import { Semilla } from '@/types/semillas';
import { Leaf, Thermometer, Clock, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface SemillaCardProps {
  semilla: Semilla;
  onEdit: (semilla: Semilla) => void;
}

export default function SemillaCard({ semilla, onEdit }: SemillaCardProps) {
  const getStockStatus = (stock: number) => {
    if (stock > 1000) return 'bg-green-100 text-green-800';
    if (stock > 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{semilla.especie}</h3>
          <p className="text-sm text-gray-500">{semilla.nombreComun}</p>
        </div>
        <Badge className={getStockStatus(semilla.stock)}>
          Stock: {semilla.stock}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-red-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Temperatura</p>
            <p className="font-medium">
              {semilla.condicionesOptimas.temperatura.min}°C - 
              {semilla.condicionesOptimas.temperatura.max}°C
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Humedad</p>
            <p className="font-medium">
              {semilla.condicionesOptimas.humedad.min}% - 
              {semilla.condicionesOptimas.humedad.max}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Leaf className="text-green-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Germinación</p>
            <p className="font-medium">{semilla.tasaGerminacion}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="text-orange-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Tiempo</p>
            <p className="font-medium">{semilla.tiempoGerminacion} días</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Temporada de siembra:</p>
        <div className="flex flex-wrap gap-2">
          {semilla.temporadaSiembra.map((mes, index) => (
            <Badge key={index} variant="outline">
              {mes}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onEdit(semilla)}
        >
          Editar
        </Button>
        <Button 
          variant="primary" 
          className="flex-1"
        >
          Gestionar Stock
        </Button>
      </div>
    </div>
  );
}
