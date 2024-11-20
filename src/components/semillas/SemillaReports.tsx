'use client'

import { Card } from '@/components/ui/Card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts'
import reportesData from '@/data/mock/reportes.json'
import semillasData from '@/data/mock/semillas.json'

const getRecomendacionColor = (tipo: string) => {
  switch (tipo) {
    case 'warning':
      return 'bg-yellow-500';
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function SemillaReports() {
  const stats = semillasData.stats;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Reportes de Semillas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasas de Germinación */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Tasas de Germinación por Especie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportesData.germinacionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasa" fill="#4ade80" name="Tasa de Germinación (%)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Siembra Mensual */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Siembra Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportesData.siembraMensual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cantidad" 
                stroke="#3b82f6" 
                name="Semillas Plantadas"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Resumen Estadístico */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Resumen Estadístico</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Especies</p>
              <p className="text-2xl font-semibold">{stats.totalEspecies}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tasa Promedio</p>
              <p className="text-2xl font-semibold">{stats.tasaExitoPromedio}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Stock Total</p>
              <p className="text-2xl font-semibold">{stats.totalSemillas.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Especies en Riesgo</p>
              <p className="text-2xl font-semibold text-red-600">{stats.stockBajo}</p>
            </div>
          </div>
        </Card>

        {/* Recomendaciones */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recomendaciones</h3>
          <ul className="space-y-3">
            {reportesData.recomendaciones.map((recomendacion, index) => (
              <li key={index} className="flex items-start">
                <span 
                  className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${getRecomendacionColor(recomendacion.tipo)} mr-2`}
                />
                <p className="text-sm text-gray-600">
                  {recomendacion.mensaje}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
