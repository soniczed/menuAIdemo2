import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}

const SAMPLE_RESPONSES = {
  'menu': "I'd be happy to tell you about our menu! We have a variety of dishes including appetizers, main courses, and desserts. What are you interested in?",
  'recommend': "Based on our most popular dishes, I'd recommend trying our Grilled Salmon. It's fresh, perfectly seasoned, and comes with seasonal vegetables.",
  'special': "Today's special is our Chef's signature Bruschetta, made with fresh tomatoes and basil from our local garden.",
  'default': "I'm here to help you with our menu and recommendations. What would you like to know?"
};

export default function PreviewChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "👋 Welcome! I'm your virtual menu assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const response = Object.entries(SAMPLE_RESPONSES).find(([key]) => 
        input.toLowerCase().includes(key)
      )?.[1] || SAMPLE_RESPONSES.default;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="font-medium">Menu Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the menu..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}