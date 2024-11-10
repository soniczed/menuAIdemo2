import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IS_DEBUG } from '../../utils/constants';
import { useSubscription } from '../../hooks/useSubscription';
import LockedFeature from './LockedFeature';

export default function Overview() {
  const { hasSubscription, toggleSubscription } = useSubscription();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {IS_DEBUG && (
          <button
            onClick={toggleSubscription}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
          >
            {hasSubscription ? 'Test Locked View' : 'Test Subscribed View'}
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
              Debug
            </span>
          </button>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* MenuAI Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">MenuAI</h2>
          {hasSubscription ? (
            <div>
              <p className="text-gray-600 mb-4">
                Access your AI-powered menu system and manage customer interactions.
              </p>
              <Link 
                to="/dashboard/menu-ai"
                className="text-black font-medium hover:underline inline-flex items-center gap-2"
              >
                Open MenuAI <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <LockedFeature
              title="MenuAI"
              description="Chat with your menu, manage orders, and provide instant customer service."
            />
          )}
        </div>

        {/* Admin Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Admin</h2>
          {hasSubscription ? (
            <div>
              <p className="text-gray-600 mb-4">
                Manage your restaurant settings, menu items, and analytics.
              </p>
              <Link 
                to="/dashboard/admin"
                className="text-black font-medium hover:underline inline-flex items-center gap-2"
              >
                Open Admin <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <LockedFeature
              title="Admin Panel"
              description="Access advanced settings, analytics, and restaurant management tools."
            />
          )}
        </div>
      </div>
    </div>
  );
}