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

const germinacionData = [
  { nombre: 'Pino', tasa: 85 },
  { nombre: 'Eucalipto', tasa: 78 },
  { nombre: 'Roble', tasa: 92 },
  { nombre: 'Cedro', tasa: 88 },
  { nombre: 'Nogal', tasa: 75 },
]

const siembraMensual = [
  { mes: 'Ene', cantidad: 1200 },
  { mes: 'Feb', cantidad: 1500 },
  { mes: 'Mar', cantidad: 2200 },
  { mes: 'Abr', cantidad: 1800 },
  { mes: 'May', cantidad: 2500 },
  { mes: 'Jun', cantidad: 2100 },
]

export default function SemillaReports() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Reportes de Semillas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasas de Germinación */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Tasas de Germinación por Especie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={germinacionData}>
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
            <LineChart data={siembraMensual}>
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
              <p className="text-2xl font-semibold">25</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tasa Promedio</p>
              <p className="text-2xl font-semibold">83.6%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Stock Total</p>
              <p className="text-2xl font-semibold">15,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Especies en Riesgo</p>
              <p className="text-2xl font-semibold text-red-600">3</p>
            </div>
          </div>
        </Card>

        {/* Recomendaciones */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recomendaciones</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-yellow-400 mr-2" />
              <p className="text-sm text-gray-600">
                El stock de Pino está por debajo del nivel recomendado. Considere aumentar la producción.
              </p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-400 mr-2" />
              <p className="text-sm text-gray-600">
                La tasa de germinación del Roble muestra excelentes resultados. Mantener las condiciones actuales.
              </p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-red-400 mr-2" />
              <p className="text-sm text-gray-600">
                El Nogal requiere atención inmediata. La tasa de germinación ha disminuido un 15%.
              </p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
