'use client'

import { Semilla } from '@/types/semillas';
import { Leaf, Thermometer, Clock, Droplets, Trees, Shield, Sprout, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface SemillaCardProps {
  semilla: Semilla;
  onEdit: (semilla: Semilla) => void;
  onManageStock: (semilla: Semilla) => void;
}

export default function SemillaCard({ semilla, onEdit, onManageStock }: SemillaCardProps) {
  const getStockStatus = (stock: number) => {
    if (stock > 1000) return 'bg-green-100 text-green-800';
    if (stock > 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Función auxiliar para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) 
      ? date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      : 'No especificada';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{semilla.nombre}</h3>
          <p className="text-sm text-gray-500">{semilla.nombreComun}</p>
          <p className="text-xs text-gray-400">{semilla.especie}</p>
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
          <Shield className="text-purple-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Resistencia</p>
            <p className="font-medium">{semilla.resistenciaPlagasEnfermedades}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Sprout className="text-green-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Crecimiento</p>
            <p className="font-medium">{semilla.velocidadCrecimiento}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4 border-t pt-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Época de siembra:</span>
          <span className="text-sm">
            {semilla.temporadaSiembra.join(" - ")}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm font-medium">Tasa de germinación:</span>
          <span className="text-sm">{semilla.tasaGerminacion}%</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm font-medium">Fecha recolección:</span>
          <span className="text-sm">{formatDate(semilla.fechaCosecha)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm font-medium">Vencimiento:</span>
          <span className={`text-sm ${
            new Date(semilla.fechaVencimiento) < new Date() ? 'text-red-500' : 'text-green-500'
          }`}>
            {formatDate(semilla.fechaVencimiento)}
          </span>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Proveedor</p>
            <p className="font-medium">{semilla.proveedor}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <p className="font-medium">{semilla.estadoConservacion}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Riego</p>
            <p className="font-medium">{semilla.requisitosRiego}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Altura Máx.</p>
            <p className="font-medium">{semilla.alturaMaxima}m</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Compatibilidad:</p>
          <p className="text-sm">{semilla.compatibilidadEcologica}</p>
        </div>

        {semilla.observacionesAdicionales && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Observaciones:</p>
            <p className="text-sm">{semilla.observacionesAdicionales}</p>
          </div>
        )}
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
          onClick={() => onManageStock(semilla)}
        >
          Gestionar Stock
        </Button>
      </div>
    </div>
  );
}
