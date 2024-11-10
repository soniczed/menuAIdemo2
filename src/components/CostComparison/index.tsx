import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Download, TrendingDown } from 'lucide-react';
import CostChart from './CostChart';
import ROICalculator from './ROICalculator';
import CostBreakdown from './CostBreakdown';
import { generateMonthlyData, calculateSavings, formatCurrency } from './utils';

export default function CostComparison() {
  const [isYearly, setIsYearly] = useState(true);
  const [activeSeries, setActiveSeries] = useState(['traditional', 'ai']);

  const data = generateMonthlyData();
  const { savings, percentage } = calculateSavings(32640, 399);

  const handleSeriesToggle = (series: string) => {
    setActiveSeries(prev => 
      prev.includes(series) 
        ? prev.filter(s => s !== series)
        : [...prev, series]
    );
  };

  const handleDownload = () => {
    const csvContent = [
      ['Month', 'Traditional', 'MenuAI'],
      ...data.map(d => [d.month, d.traditional, d.ai])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cost-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Cost Comparison</h2>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingDown className="w-5 h-5" />
            <span className="font-semibold">
              Save {formatCurrency(savings)} annually
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Switch.Group>
            <div className="flex items-center gap-2">
              <Switch.Label className="text-sm">Monthly</Switch.Label>
              <Switch
                checked={isYearly}
                onChange={setIsYearly}
                className={`${
                  isYearly ? 'bg-black' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <Switch.Label className="text-sm">Yearly</Switch.Label>
            </div>
          </Switch.Group>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Download CSV"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <CostChart
              data={data}
              isYearly={isYearly}
              activeSeries={activeSeries}
              onSeriesToggle={handleSeriesToggle}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-black text-white px-4 py-2 rounded-full">
              <span className="font-bold">{percentage}%</span> cost reduction
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <ROICalculator />
          <CostBreakdown />
        </div>
      </div>
    </div>
  );
}