import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-xl">menuAI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="text-gray-600 hover:text-black">
              Pricing
            </a>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}