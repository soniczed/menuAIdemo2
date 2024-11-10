import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from './utils';

interface DataPoint {
  month: string;
  traditional: number;
  ai: number;
}

interface CostChartProps {
  data: DataPoint[];
  isYearly: boolean;
  activeSeries: string[];
  onSeriesToggle: (series: string) => void;
}

export default function CostChart({ 
  data, 
  isYearly, 
  activeSeries, 
  onSeriesToggle 
}: CostChartProps) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis 
            dataKey="month" 
            className="text-sm"
          />
          <YAxis 
            tickFormatter={formatCurrency}
            className="text-sm"
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              return (
                <div className="bg-white p-4 shadow-lg rounded-lg border">
                  <p className="font-semibold mb-2">{label}</p>
                  {payload.map((entry) => (
                    <div 
                      key={entry.name}
                      className="flex items-center gap-2"
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>{entry.name}: {formatCurrency(entry.value as number)}</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend
            onClick={(e) => onSeriesToggle(e.dataKey)}
            formatter={(value) => (
              <span className={activeSeries.includes(value) ? 'opacity-100' : 'opacity-50'}>
                {value}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="traditional"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Traditional"
            hide={!activeSeries.includes('traditional')}
          />
          <Line
            type="monotone"
            dataKey="ai"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="MenuAI"
            hide={!activeSeries.includes('ai')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}