'use client'

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

interface StockManagerProps {
  semillaId: string;
  stockActual: number;
  onUpdateStock: (cantidad: number, tipo: string, motivo: string) => void;
}

export default function StockManager({ semillaId, stockActual, onUpdateStock }: StockManagerProps) {
  const [cantidad, setCantidad] = useState(0);
  const [tipo, setTipo] = useState('entrada');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStock(cantidad, tipo, motivo);
    setCantidad(0);
    setMotivo('');
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Gestión de Stock</h3>
      <p className="text-sm text-gray-600 mb-4">
        Stock actual: <span className="font-semibold">{stockActual}</span> unidades
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Movimiento
            </label>
            <Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="perdida">Pérdida</option>
              <option value="ajuste">Ajuste de Inventario</option>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <Input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              min={0}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivo
          </label>
          <Input
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Especifique el motivo del movimiento"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={cantidad <= 0 || !motivo}
        >
          Registrar Movimiento
        </Button>
      </form>
    </Card>
  );
}
