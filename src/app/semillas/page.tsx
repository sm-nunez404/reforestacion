'use client'

import SemillaList from '@/components/semillas/SemillaList';
import SemillaStats from '@/components/semillas/SemillaStats';
import SemillaReports from '@/components/semillas/SemillaReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import semillasData from '@/data/mock/semillas.json';

export default function SemillasPage() {
  const stats = semillasData.stats;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Semillas</h1>
        <p className="text-gray-600">
          Administra el inventario y seguimiento de semillas para reforestación
        </p>
      </div>

      <Tabs defaultValue="inventario">
        <TabsList>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="inventario">
          <SemillaStats stats={stats} />
          <SemillaList />
        </TabsContent>

        <TabsContent value="reportes">
          <SemillaReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
