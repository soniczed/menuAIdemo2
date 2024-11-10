import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Star, Trash2 } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  rating?: number;
  reviews?: number;
}

const CATEGORIES = [
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Specials'
];

export default function MenuBuilder() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: CATEGORIES[0],
    };
    setItems([...items, newItem]);
    setEditingItem(newItem);
  };

  const handleSaveItem = (item: MenuItem) => {
    setItems(items.map(i => i.id === item.id ? item : i));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Menu Items List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Menu Items</h3>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => setEditingItem(item)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                editingItem?.id === item.id
                  ? 'bg-black text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{item.name || 'Untitled Item'}</h4>
                  <p className={`text-sm ${editingItem?.id === item.id ? 'text-gray-300' : 'text-gray-500'}`}>
                    {item.description || 'No description'}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                  className={`p-1 rounded-lg ${
                    editingItem?.id === item.id
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {item.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm">{item.rating} ({item.reviews} reviews)</span>
                </div>
              )}
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-12 px-4 bg-gray-50 rounded-lg">
              <div className="mb-4">🍽️</div>
              <h3 className="font-medium mb-2">No menu items yet</h3>
              <p className="text-gray-500 text-sm mb-4">
                Start building your menu by adding your first item
              </p>
              <button
                onClick={handleAddItem}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add First Item
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Editor */}
      <div>
        {editingItem ? (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-6">Edit Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Classic Burger"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Describe your dish..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {editingItem.image ? (
                    <div className="relative">
                      <img
                        src={editingItem.image}
                        alt={editingItem.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setEditingItem({ ...editingItem, image: undefined })}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 mx-auto">
                      <ImageIcon className="w-4 h-4" />
                      Upload Image
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveItem(editingItem)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an item to edit or create a new one
          </div>
        )}
      </div>
    </div>
  );
}