'use client'

import { Card } from '@/components/ui/Card'
import { Cloud, Plane, Leaf, Map as MapIcon } from 'lucide-react'
import WeatherCard from '@/components/dashboard/WeatherCard'
import ActivityChart from '@/components/dashboard/ActivityChart'
import ActivityList from '@/components/dashboard/ActivityList'
import OperationsSummary from '@/components/dashboard/OperationsSummary'

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center p-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Plane className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drones Activos</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center p-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Leaf className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Semillas Plantadas</p>
              <p className="text-2xl font-semibold">12,543</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center p-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <MapIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Área Cubierta</p>
              <p className="text-2xl font-semibold">256 ha</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center p-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Cloud className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clima</p>
              <p className="text-2xl font-semibold">23°C</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivityChart />
        <WeatherCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityList />
        <OperationsSummary />
      </div>
    </div>
  )
}