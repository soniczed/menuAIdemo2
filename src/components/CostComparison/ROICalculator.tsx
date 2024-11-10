import React, { useState } from 'react';
import { formatCurrency } from './utils';

export default function ROICalculator() {
  const [currentCost, setCurrentCost] = useState(32640);
  const aiCost = 399;
  
  const annualSavings = currentCost - aiCost;
  const roi = ((annualSavings / aiCost) * 100).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">ROI Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Current Annual Cost
          </label>
          <input
            type="number"
            value={currentCost}
            onChange={(e) => setCurrentCost(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Annual Savings:</span>
            <span className="font-semibold text-green-600">
              {formatCurrency(annualSavings)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>ROI:</span>
            <span className="font-semibold text-green-600">
              {roi}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}