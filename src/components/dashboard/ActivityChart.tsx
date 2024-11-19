'use client'

import { Card } from '@/components/ui/Card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { hora: '00:00', semillas: 120 },
  { hora: '03:00', semillas: 180 },
  { hora: '06:00', semillas: 240 },
  { hora: '09:00', semillas: 380 },
  { hora: '12:00', semillas: 450 },
  { hora: '15:00', semillas: 520 },
  { hora: '18:00', semillas: 610 },
  { hora: '21:00', semillas: 680 }
];

export default function ActivityChart() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Actividad de Siembra</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="semillas"
              stroke="#4ade80"
              fill="#4ade8033"
              name="Semillas Plantadas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
