'use client'

import { useState } from 'react';
import { Semilla } from '@/types/semillas';
import SemillaCard from './SemillaCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Search } from 'lucide-react';

export default function SemillaList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [semillas, setSemillas] = useState<Semilla[]>([
    // Datos de ejemplo
    {
      id: '1',
      nombre: 'Cedro rojo',
      especie: 'Cedrela odorata',
      nombreComun: 'Cedro',
      stock: 1500,
      tasaGerminacion: 85,
      tiempoGerminacion: 15,
      profundidadSiembra: 2,
      espaciamiento: 3,
      temporadaSiembra: ['Octubre', 'Noviembre', 'Diciembre'],
      condicionesOptimas: {
        temperatura: { min: 20, max: 30 },
        humedad: { min: 60, max: 80 },
        tipoSuelo: ['Franco arenoso', 'Franco arcilloso']
      }
    },
    // Más semillas...
    {
      id: '2',
      nombre: 'Caoba',
      especie: 'Swietenia macrophylla',
      nombreComun: 'Caoba americana',
      stock: 800,
      tasaGerminacion: 75,
      tiempoGerminacion: 20,
      profundidadSiembra: 3,
      espaciamiento: 4,
      temporadaSiembra: ['Septiembre', 'Octubre', 'Noviembre'],
      condicionesOptimas: {
        temperatura: { min: 22, max: 32 },
        humedad: { min: 65, max: 85 },
        tipoSuelo: ['Franco arcilloso', 'Arcilloso']
      }
    },
    {
      id: '3', 
      nombre: 'Pino',
      especie: 'Pinus radiata',
      nombreComun: 'Pino insigne',
      stock: 2000,
      tasaGerminacion: 90,
      tiempoGerminacion: 12,
      profundidadSiembra: 1.5,
      espaciamiento: 2.5,
      temporadaSiembra: ['Marzo', 'Abril', 'Mayo'],
      condicionesOptimas: {
        temperatura: { min: 15, max: 25 },
        humedad: { min: 50, max: 70 },
        tipoSuelo: ['Franco arenoso', 'Arenoso']
      }
    },
    {
      id: '4',
      nombre: 'Eucalipto',
      especie: 'Eucalyptus globulus',
      nombreComun: 'Eucalipto común',
      stock: 1200,
      tasaGerminacion: 80,
      tiempoGerminacion: 10,
      profundidadSiembra: 1,
      espaciamiento: 3,
      temporadaSiembra: ['Agosto', 'Septiembre', 'Octubre'],
      condicionesOptimas: {
        temperatura: { min: 18, max: 28 },
        humedad: { min: 55, max: 75 },
        tipoSuelo: ['Franco', 'Franco arenoso']
      }
    }
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSemillas = semillas.filter(semilla => 
    semilla.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    semilla.nombreComun.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Buscar semillas..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Semilla
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSemillas.map(semilla => (
          <SemillaCard
            key={semilla.id}
            semilla={semilla}
            onEdit={(semilla) => {
              // Implementar lógica de edición
              console.log('Editar semilla:', semilla);
            }}
          />
        ))}
      </div>
    </div>
  );
}
