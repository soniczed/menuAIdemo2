import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LockedFeatureProps {
  title: string;
  description: string;
}

export default function LockedFeature({ title, description }: LockedFeatureProps) {
  const navigate = useNavigate();

  return (
    <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="font-semibold mb-2">{title} is locked</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={() => navigate('/dashboard/admin')}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Unlock with Subscription
      </button>
    </div>
  );
}