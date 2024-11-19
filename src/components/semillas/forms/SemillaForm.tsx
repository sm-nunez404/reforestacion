'use client'

import { useState } from 'react';
import { Semilla } from '@/types/semillas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface SemillaFormProps {
  semilla?: Semilla;
  onSubmit: (data: Partial<Semilla>) => void;
  onCancel: () => void;
}

export default function SemillaForm({ semilla, onSubmit, onCancel }: SemillaFormProps) {
  const [formData, setFormData] = useState<Partial<Semilla>>(
    semilla || {
      especie: '',
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
      }
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Especie
          </label>
          <Input
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre Común
          </label>
          <Input
            name="nombreComun"
            value={formData.nombreComun}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
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
      </div>

      <div className="mt-6 flex justify-end space-x-3">
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
