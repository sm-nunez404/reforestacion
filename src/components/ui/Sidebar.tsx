'use client'
import Link from 'next/link'
import { Home, Map, Leaf, Plane, ChevronLeft, ChevronRight, Brain } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { href: '/dashboard', icon: Home, label: 'Inicio' },
    { href: '/mapa', icon: Map, label: 'Mapa' },
    { href: '/semillas', icon: Leaf, label: 'Semillas' },
    { href: '/drones', icon: Plane, label: 'Drones' },
    {
      icon: Brain,
      label: 'Análisis IA',
      href: '/analisis'
    }
  ]

  return (
    <div className={`bg-white flex flex-col items-center py-4 border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-white border rounded-full p-1.5 hover:bg-gray-100"
      >
        {isCollapsed ? 
          <ChevronRight className="w-4 h-4" /> : 
          <ChevronLeft className="w-4 h-4" />
        }
      </button>

      <nav className="flex-1 space-y-2 w-full px-3">
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Icon className="w-6 h-6 min-w-[24px]" />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">{label}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
