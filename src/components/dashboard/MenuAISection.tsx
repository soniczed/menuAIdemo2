import React, { useState } from 'react';
import { MessageSquare, Save, QrCode, ShoppingCart } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import LockedFeature from './LockedFeature';
import MenuBuilder from './menuai/MenuBuilder';
import MenuPreview from './menuai/MenuPreview';
import TestChat from './menuai/TestChat';
import CheckoutModal from './menuai/CheckoutModal';
import QRCodeModal from './menuai/QRCodeModal';

export default function MenuAISection() {
  const { hasSubscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');
  const [showTestChat, setShowTestChat] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  if (!hasSubscription) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <LockedFeature
          title="menuAI"
          description="Chat with your menu, manage orders, and provide instant customer service."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">menuAI</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowTestChat(!showTestChat)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <MessageSquare className="w-5 h-5" />
            {showTestChat ? 'Hide Test Chat' : 'Show Test Chat'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg">
            <Save className="w-5 h-5" />
            Save Draft
          </button>
          <button
            onClick={() => setShowCheckoutModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            Checkout
          </button>
          <button
            onClick={() => setShowQRModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
          >
            <QrCode className="w-5 h-5" />
            QR Code Menu
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'builder'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Menu Builder
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'preview'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'builder' ? <MenuBuilder /> : <MenuPreview />}
        </div>
      </div>

      {showTestChat && <TestChat />}
      <CheckoutModal isOpen={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} />
      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
}