import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const SAMPLE_RESPONSES = {
  'best dessert': "Our most popular dessert is the Chocolate Lava Cake! It's a warm chocolate cake with a molten center, served with vanilla ice cream. Would you like to know more about it?",
  'spicy': "We have several spicy options! Our Spicy Thai Curry and Nashville Hot Chicken are customer favorites. How spicy do you prefer your food?",
  'vegetarian': "We have a great selection of vegetarian dishes! Our Grilled Portobello Mushroom Burger and Mediterranean Quinoa Bowl are very popular. Would you like to see the full vegetarian menu?",
  'default': "I'd be happy to help you with that! Would you like to see our menu or hear about today's specials?"
};

export default function TestChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi! I'm your AI menu assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response = Object.entries(SAMPLE_RESPONSES).find(([key]) => 
        input.toLowerCase().includes(key)
      )?.[1] || SAMPLE_RESPONSES.default;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="font-medium">Test Chat</span>
        </div>
        <button
          onClick={() => window.location.reload()}
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