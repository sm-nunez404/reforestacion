'use client'

import { Card } from '@/components/ui/Card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const summary = {
  completadas: 12,
  fallidas: 2,
  enProceso: 5,
  eficiencia: 85.7
};

export default function OperationsSummary() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Resumen de Operaciones</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.completadas}</p>
          <p className="text-sm text-gray-500">Completadas</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.fallidas}</p>
          <p className="text-sm text-gray-500">Fallidas</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.enProceso}</p>
          <p className="text-sm text-gray-500">En Proceso</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 mx-auto mb-2 text-blue-500 font-bold">%</div>
          <p className="text-2xl font-bold text-gray-900">{summary.eficiencia}</p>
          <p className="text-sm text-gray-500">Eficiencia</p>
        </div>
      </div>
    </Card>
  );
}
