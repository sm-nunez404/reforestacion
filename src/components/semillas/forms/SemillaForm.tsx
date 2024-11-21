'use client'

import { useState } from 'react';
import { Semilla } from '@/types/semillas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from "@/components/ui/Textarea";

interface SemillaFormProps {
  semilla?: Semilla;
  onSubmit: (data: Partial<Semilla>) => void;
  onCancel: () => void;
}

export default function SemillaForm({ semilla, onSubmit, onCancel }: SemillaFormProps) {
  const [formData, setFormData] = useState<Partial<Semilla>>(
    semilla || {
      especie: '',
      nombre: '',
      nombreComun: '',
      tasaGerminacion: 0,
      tiempoGerminacion: 0,
      profundidadSiembra: 0,
      espaciamiento: 0,
      temporadaSiembra: [],
      condicionesOptimas: {
        temperatura: { min: 0, max: 0 },
        humedad: { min: 0, max: 0 },
        tipoSuelo: []
      },
      origen: '',
      usos: [],
      fechaCosecha: '',
      proveedor: '',
      estadoConservacion: '',
      metodoAlmacenamiento: '',
      resistenciaPlagasEnfermedades: '',
      requisitosRiego: '',
      velocidadCrecimiento: '',
      alturaMaxima: 0,
      compatibilidadEcologica: '',
      observacionesAdicionales: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemperaturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      condicionesOptimas: {
        ...prev.condicionesOptimas!,
        temperatura: {
          ...prev.condicionesOptimas!.temperatura,
          [name]: Number(value)
        }
      }
    }));
  };

  const handleArrayChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto px-1">
      {/* Información Básica */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre de la semilla"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Especie
            </label>
            <Input
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              placeholder="Especie científica"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nombre Común
            </label>
            <Input
              name="nombreComun"
              value={formData.nombreComun}
              onChange={handleChange}
              placeholder="Nombre común"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Origen
            </label>
            <Input
              name="origen"
              value={formData.origen}
              onChange={handleChange}
              placeholder="Lugar de origen"
              required
            />
          </div>
        </div>
      </div>

      {/* Características de Germinación */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Características de Germinación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tasa de Germinación (%)
            </label>
            <Input
              type="number"
              name="tasaGerminacion"
              value={formData.tasaGerminacion}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tiempo de Germinación (días)
            </label>
            <Input
              type="number"
              name="tiempoGerminacion"
              value={formData.tiempoGerminacion}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>
      </div>

      {/* Condiciones Óptimas */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Condiciones Óptimas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Temperatura Mínima (°C)
            </label>
            <Input
              type="number"
              name="min"
              value={formData.condicionesOptimas?.temperatura.min}
              onChange={handleTemperaturaChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Temperatura Máxima (°C)
            </label>
            <Input
              type="number"
              name="max"
              value={formData.condicionesOptimas?.temperatura.max}
              onChange={handleTemperaturaChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Resistencia a Plagas
            </label>
            <Select
              name="resistenciaPlagasEnfermedades"
              value={formData.resistenciaPlagasEnfermedades}
              onChange={handleChange}
            >
              <option value="">Seleccionar resistencia</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Velocidad de Crecimiento
            </label>
            <Select
              name="velocidadCrecimiento"
              value={formData.velocidadCrecimiento}
              onChange={handleChange}
            >
              <option value="">Seleccionar velocidad</option>
              <option value="Rápido">Rápido</option>
              <option value="Moderado">Moderado</option>
              <option value="Lento">Lento</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Información Adicional</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Compatibilidad Ecológica
            </label>
            <Textarea
              name="compatibilidadEcologica"
              value={formData.compatibilidadEcologica}
              onChange={handleChange}
              rows={3}
              placeholder="Describe la compatibilidad ecológica..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Observaciones Adicionales
            </label>
            <Textarea
              name="observacionesAdicionales"
              value={formData.observacionesAdicionales}
              onChange={handleChange}
              rows={3}
              placeholder="Añade observaciones adicionales..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {semilla ? 'Actualizar' : 'Crear'} Semilla
        </Button>
      </div>
    </form>
  );
}
