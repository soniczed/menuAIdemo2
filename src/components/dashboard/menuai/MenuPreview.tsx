import React, { useState } from 'react';
import { Star, ShoppingCart, MessageSquare } from 'lucide-react';
import PreviewChat from './PreviewChat';
import OrderSummary from './OrderSummary';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

export default function MenuPreview() {
  const [showChat, setShowChat] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleAddToOrder = (item: MenuItem) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setShowOrderSummary(true);
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Restaurant Info */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          🍽️
        </div>
        <h2 className="text-3xl font-bold mb-2">Sample Restaurant</h2>
        <p className="text-gray-600 mb-2">123 Main Street, Anytown, USA</p>
        <p className="text-gray-600">Open: 11:00 AM - 10:00 PM</p>
      </div>

      {/* Menu Categories */}
      <div className="space-y-12">
        {Object.entries(MENU_ITEMS).map(([category, items]) => (
          <div key={category} id={category.toLowerCase()}>
            <h3 className="text-2xl font-semibold mb-6">{category}</h3>
            <div className="grid gap-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-6">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-lg">{item.name}</h4>
                        <p className="text-gray-600">{item.description}</p>
                        {item.rating && (
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm">{item.rating}</span>
                            <span className="text-sm text-gray-500">
                              ({item.reviews} reviews)
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold mb-2">${item.price.toFixed(2)}</div>
                        <button
                          onClick={() => handleAddToOrder(item)}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Order Summary Button */}
      {orderItems.length > 0 && (
        <button
          onClick={() => setShowOrderSummary(true)}
          className="fixed bottom-4 left-4 bg-black text-white px-6 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-40 flex items-center gap-3"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="font-semibold">{orderItems.length} items</span>
        </button>
      )}

      {showChat && <PreviewChat onClose={() => setShowChat(false)} />}
      <OrderSummary
        items={orderItems}
        isOpen={showOrderSummary}
        onClose={() => setShowOrderSummary(false)}
        onUpdateQuantity={(itemId, quantity) => {
          setOrderItems(prev => 
            quantity === 0
              ? prev.filter(i => i.id !== itemId)
              : prev.map(i => i.id === itemId ? { ...i, quantity } : i)
          );
        }}
      />
    </div>
  );
}

const MENU_ITEMS = {
  'Appetizers': [
    {
      id: '1',
      name: 'Bruschetta',
      description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 124
    }
  ],
  'Main Course': [
    {
      id: '2',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 256
    }
  ]
};