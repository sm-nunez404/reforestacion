'use client';

import { useState } from 'react';
import { Semilla } from '@/types/semillas';
import SemillaCard from './SemillaCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import semillasData from '@/data/mock/semillas.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import SemillaForm from './forms/SemillaForm';
import StockManager from './StockManager';
import { SearchIcon, PlusIcon } from 'lucide-react';

export default function SemillaList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [semillas, setSemillas] = useState<Semilla[]>(semillasData.semillas);
  const [isNewSemillaOpen, setIsNewSemillaOpen] = useState(false);
  const [isStockManagerOpen, setIsStockManagerOpen] = useState(false);
  const [selectedSemilla, setSelectedSemilla] = useState<Semilla | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateSemilla = (data: Partial<Semilla>) => {
    // Implementa la lógica para crear una nueva semilla
    console.log('Nueva semilla:', data);
    setIsNewSemillaOpen(false);
    setSelectedSemilla(null);
  };

  const handleUpdateStock = (cantidad: number, tipo: string, motivo: string) => {
    // Implementa la lógica para actualizar el stock
    console.log('Actualización de stock:', { cantidad, tipo, motivo });
    setIsStockManagerOpen(false);
    setSelectedSemilla(null);
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
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <Button onClick={() => setIsNewSemillaOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Nueva Semilla
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSemillas.map(semilla => (
          <SemillaCard
            key={semilla.id}
            semilla={semilla}
            onEdit={(semilla) => {
              setSelectedSemilla(semilla);
              setIsNewSemillaOpen(true);
            }}
            onManageStock={(semilla) => {
              setSelectedSemilla(semilla);
              setIsStockManagerOpen(true);
            }}
          />
        ))}
      </div>

      {/* Modal Nueva Semilla */}
      <Dialog open={isNewSemillaOpen} onOpenChange={setIsNewSemillaOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-black">
              {selectedSemilla ? 'Editar Semilla' : 'Nueva Semilla'}
            </DialogTitle>
          </DialogHeader>
          <SemillaForm
            semilla={selectedSemilla || undefined}
            onSubmit={handleCreateSemilla}
            onCancel={() => {
              setIsNewSemillaOpen(false);
              setSelectedSemilla(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Gestionar Stock */}
      <Dialog open={isStockManagerOpen} onOpenChange={setIsStockManagerOpen}>
        <DialogContent className="bg-white p-0">
          
          {selectedSemilla && (
            <StockManager
              semillaId={selectedSemilla.id}
              stockActual={selectedSemilla.stock}
              onUpdateStock={handleUpdateStock}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
