import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import LockedFeature from './LockedFeature';

export default function AdminSection() {
  const { hasSubscription } = useSubscription();

  if (!hasSubscription) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <LockedFeature
          title="Admin Panel"
          description="Access advanced settings, analytics, and restaurant management tools."
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      {/* Admin content when unlocked */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-600">
          Your admin features are now unlocked. Start managing your restaurant settings and analytics.
        </p>
      </div>
    </div>
  );
}