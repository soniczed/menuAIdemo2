import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, LogOut, Bell } from 'lucide-react';
import { IS_DEBUG, TEST_USER } from '../../utils/constants';
import { useSubscription } from '../../hooks/useSubscription';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-black text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasSubscription } = useSubscription();
  
  const user = IS_DEBUG 
    ? TEST_USER 
    : JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍽️</span>
              <span className="font-bold text-2xl">menuAI</span>
              {IS_DEBUG && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Debug Mode
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              <NavItem
                to="/dashboard"
                icon={<LayoutDashboard className="w-5 h-5" />}
                label="Overview"
                isActive={location.pathname === '/dashboard'}
              />
              <NavItem
                to="/dashboard/menu-ai"
                icon={<MessageSquare className="w-5 h-5" />}
                label="menuAI"
                isActive={location.pathname === '/dashboard/menu-ai'}
              />
              <NavItem
                to="/dashboard/admin"
                icon={<Settings className="w-5 h-5" />}
                label="Admin"
                isActive={location.pathname === '/dashboard/admin'}
              />
            </nav>
            <div className="mt-8 pt-8 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          </aside>

          <main className="flex-1">
            {!hasSubscription && !IS_DEBUG && (
              <div className="bg-black text-white p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">
                      Unlock all features with a subscription
                    </h3>
                    <p className="text-gray-300">
                      Get access to menuAI and advanced admin tools
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard/admin')}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}