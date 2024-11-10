import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Test Checkout</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            This is a test checkout feature. No actual payment processing is implemented.
            In production, this would integrate with your preferred payment gateway.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">$45.00</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">$4.50</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">$49.50</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Close Test Checkout
        </button>
      </div>
    </div>
  );
}