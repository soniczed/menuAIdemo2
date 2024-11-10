import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const SAMPLE_PROMPTS = [
  "What's cookin good lookin?",
  "I'm allergic to peanuts",
  "What's your most popular dish?",
  "Tell me about your specials"
];

export default function DemoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm menuAI, the menu that can talk! How can I serve you today?" }
  ]);

  const handlePromptClick = (prompt: string) => {
    setMessages(prev => [...prev, 
      { type: 'user', text: prompt },
      { type: 'bot', text: getBotResponse(prompt) }
    ]);
  };

  const getBotResponse = (prompt: string) => {
    if (prompt.toLowerCase().includes('cookin')) {
      return "Everything's sizzling hot and delicious! Our chef's special today is Grilled Mediterranean Sea Bass. Would you like to hear more about it? 🐟";
    }
    if (prompt.toLowerCase().includes('allergic')) {
      return "I'll make sure to note your peanut allergy! Don't worry, I'll only show you safe options and I've marked all dishes containing peanuts or prepared in shared equipment. Your safety is our priority! 🥜❌";
    }
    return "I'd be happy to help you with that! Would you like to see our menu or hear about today's specials?";
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-50"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <h3 className="font-semibold">menuAI Demo</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-black text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}