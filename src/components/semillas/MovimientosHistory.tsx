'use client'

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface StockMovement {
  id: string;
  tipo: 'entrada' | 'salida' | 'perdida' | 'ajuste';
  cantidad: number;
  motivo: string;
  fecha: string;
}

interface MovimientosHistoryProps {
  movimientos: StockMovement[];
}

export default function MovimientosHistory({ movimientos }: MovimientosHistoryProps) {
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'entrada':
        return 'bg-green-100 text-green-800';
      case 'salida':
        return 'bg-blue-100 text-blue-800';
      case 'perdida':
        return 'bg-red-100 text-red-800';
      case 'ajuste':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Historial de Movimientos</h3>
      
      {movimientos.length === 0 ? (
        <p className="text-center text-gray-500 py-4">
          No hay movimientos registrados
        </p>
      ) : (
        <div className="space-y-4">
          {movimientos.map((movimiento) => (
            <div 
              key={movimiento.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <Badge className={getTipoColor(movimiento.tipo)}>
                  {movimiento.tipo.toUpperCase()}
                </Badge>
                <p className="text-sm mt-1">{movimiento.motivo}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {movimiento.tipo === 'entrada' ? '+' : '-'}{movimiento.cantidad}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(movimiento.fecha).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
