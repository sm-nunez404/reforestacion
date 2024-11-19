'use client'

import { SemillaStats as Stats } from '@/types/semillas';
import { Leaf, Sprout, TrendingUp, AlertTriangle } from 'lucide-react';

interface SemillaStatsProps {
  stats: Stats;
}

export default function SemillaStats({ stats }: SemillaStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Especies</p>
            <p className="text-2xl font-semibold mt-1">{stats.totalEspecies}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Semillas</p>
            <p className="text-2xl font-semibold mt-1">{stats.totalSemillas}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Sprout className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tasa de Éxito</p>
            <p className="text-2xl font-semibold mt-1">{stats.tasaExitoPromedio}%</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
            <p className="text-2xl font-semibold mt-1">{stats.stockBajo}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
