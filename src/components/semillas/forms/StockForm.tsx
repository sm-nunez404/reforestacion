'use client'

import { useState } from 'react';
import { StockMovement } from '@/types/stock';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface StockFormProps {
  semillaId: string;
  onSubmit: (data: Partial<StockMovement>) => void;
  onCancel: () => void;
}

export default function StockForm({ semillaId, onSubmit, onCancel }: StockFormProps) {
  const [formData, setFormData] = useState<Partial<StockMovement>>({
    semillaId,
    tipo: 'entrada',
    cantidad: 0,
    fecha: new Date().toISOString(),
    motivo: '',
    lote: '',
    proveedor: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Movimiento
        </label>
        <Select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
          <option value="ajuste">Ajuste</option>
          <option value="perdida">Pérdida</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <Input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      {formData.tipo === 'entrada' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Lote
            </label>
            <Input
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Proveedor
            </label>
            <Input
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Motivo
        </label>
        <Input
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Registrar Movimiento
        </Button>
      </div>
    </form>
  );
}
