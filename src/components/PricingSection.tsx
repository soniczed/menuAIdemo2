import React from 'react';
import { Check } from 'lucide-react';

const PricingCard = ({ 
  title, 
  price, 
  originalPrice, 
  period, 
  features, 
  isPopular,
  onGetStarted 
}: {
  title: string;
  price: number;
  originalPrice: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  onGetStarted: () => void;
}) => (
  <div className={`bg-white rounded-2xl p-8 ${isPopular ? 'ring-2 ring-black' : 'border border-gray-200'}`}>
    {isPopular && (
      <span className="inline-block bg-black text-white text-sm px-3 py-1 rounded-full mb-4">
        Most Popular
      </span>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-500 line-through ml-2">${originalPrice}</span>
      <span className="text-gray-600">/{period}</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <div className="space-y-4">
      <button 
        onClick={onGetStarted}
        className={`w-full py-3 rounded-lg font-semibold ${
          isPopular ? 'bg-black text-white' : 'bg-gray-100 text-black'
        }`}
      >
        Get Started
      </button>
      <p className="text-center text-sm">
        🎉 Limited to First 100 Clients
      </p>
    </div>
  </div>
);

export default function PricingSection({ onGetStarted }) {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">
            Choose the perfect plan for your restaurant's needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            title="Monthly"
            price={39}
            originalPrice={69}
            period="month"
            features={[
              'Real-time inventory tracking',
              'AI-powered demand forecasting',
              '24/7 customer support',
              'Automated inventory restocking',
              'Detailed purchase and supply reports'
            ]}
            onGetStarted={onGetStarted}
          />
          <PricingCard
            title="Annual"
            price={399}
            originalPrice={699}
            period="year"
            features={[
              'All Monthly features',
              'Advanced analytics and reporting',
              'Priority customer support',
              'Quarterly business strategy sessions',
              'Early access to new features'
            ]}
            isPopular
            onGetStarted={onGetStarted}
          />
        </div>
      </div>
    </section>
  );
}