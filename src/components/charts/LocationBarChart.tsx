import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface LocationData {
  location: string;
  cigarette: number;
  vape: number;
  cake: number;
  csd: number;
}

interface LocationBarChartProps {
  data: LocationData[];
}

export const LocationBarChart: React.FC<LocationBarChartProps> = ({ data }) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Violations by Location
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="location"
              type="category"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
              )}
            />
            <Bar dataKey="cigarette" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="vape" stackId="a" fill="#dc2626" radius={[0, 0, 0, 0]} />
            <Bar dataKey="cake" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} />
            <Bar dataKey="csd" stackId="a" fill="#3b82f6" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
