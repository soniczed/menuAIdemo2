import React, { useEffect, useState } from 'react';

const PARTNERS = [
  {
    name: 'Fine Dining Co.',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=64&h=64&fit=crop&auto=format',
    testimonial: 'MenuAI has revolutionized our ordering system. Customer satisfaction is at an all-time high!'
  },
  {
    name: 'Bistro Central',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=64&h=64&fit=crop&auto=format',
    testimonial: 'We\'ve seen a 40% increase in efficiency since implementing MenuAI.'
  },
  {
    name: 'The Garden Restaurant',
    logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=64&h=64&fit=crop&auto=format',
    testimonial: 'Our customers love the interactive menu experience. It\'s been a game-changer!'
  }
];

export default function PartnerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PARTNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted by Leading Restaurants</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative h-48 overflow-hidden">
            {PARTNERS.map((partner, index) => (
              <div
                key={partner.name}
                className={`absolute inset-0 transition-all duration-500 flex flex-col items-center ${
                  index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
                <p className="text-lg text-gray-600 text-center italic mb-2">{partner.testimonial}</p>
                <p className="font-semibold">{partner.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {PARTNERS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-black w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}