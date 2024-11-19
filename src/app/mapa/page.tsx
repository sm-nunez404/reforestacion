'use client'

import dynamic from 'next/dynamic'
import { useDrones } from '@/lib/hooks/useDrones'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

// Cargamos el mapa dinámicamente para evitar problemas de SSR
const MapView = dynamic(
  () => import('../../components/maps/MapView'),
  { 
    loading: () => <LoadingSpinner />,
    ssr: false // Importante: deshabilitar SSR para el mapa
  }
)

export default function MapaPage() {
  const { drones, loading, error } = useDrones()

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <MapView drones={drones} />
    </div>
  )
}
