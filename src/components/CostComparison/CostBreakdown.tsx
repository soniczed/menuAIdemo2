import React from 'react';
import { Info } from 'lucide-react';

const BREAKDOWN_ITEMS = [
  {
    title: 'Traditional Costs',
    items: [
      { label: 'Staff Wages', value: 24000 },
      { label: 'Training', value: 3640 },
      { label: 'Equipment', value: 5000 },
    ]
  },
  {
    title: 'MenuAI Costs',
    items: [
      { label: 'Annual Subscription', value: 399 },
      { label: 'Setup Fee', value: 0 },
      { label: 'Training', value: 0 },
    ]
  }
];

export default function CostBreakdown() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
      <div className="space-y-6">
        {BREAKDOWN_ITEMS.map((section) => (
          <div key={section.title}>
            <h4 className="font-medium mb-2">{section.title}</h4>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-medium">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}