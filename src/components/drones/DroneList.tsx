'use client'

import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import DroneCard from './DroneCard';
import { useDrones } from '@/lib/hooks/useDrones';
import { Plus } from 'lucide-react';

export default function DroneList() {
  const { drones, loading, error } = useDrones();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="error" className="mb-4">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lista de Drones</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Drone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drones.map((drone) => (
          <DroneCard key={drone.id} drone={drone} />
        ))}
      </div>
    </div>
  );
}
