'use client'

import dynamic from 'next/dynamic'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

// Cambiamos la importación de MapView a MapPreview
const MapPreview = dynamic(
  () => import('@/components/maps/MapPreview'),
  { 
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

export default function MapaPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <MapPreview />
    </div>
  )
}
