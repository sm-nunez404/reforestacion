'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface AreaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialArea?: number;
}

export default function AreaForm({ isOpen, onClose, onSubmit, initialArea }: AreaFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pendiente',
    progress: 0,
    seedsPlanted: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Nueva Área</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre del área"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción opcional"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Progreso (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.progress}
              onChange={(e) => setFormData(prev => ({ ...prev, progress: Number(e.target.value) }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Semillas plantadas</label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.seedsPlanted}
              onChange={(e) => setFormData(prev => ({ ...prev, seedsPlanted: Number(e.target.value) }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          {initialArea && (
            <div className="text-sm text-gray-600">
              Superficie: {initialArea.toFixed(2)} ha
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-6">
            <Button 
              variant="secondary"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
