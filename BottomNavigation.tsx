import React from 'react';
import { Home, Users, MessageSquare, Bell, Settings } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'nearby' as Screen, icon: Users, label: 'Nearby' },
    { id: 'groups' as Screen, icon: MessageSquare, label: 'Groups' },
    { id: 'notifications' as Screen, icon: Bell, label: 'Alerts', badge: 3 },
    { id: 'settings' as Screen, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                isActive 
                  ? 'text-cyan-400 bg-white/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="relative">
                <IconComponent className="w-5 h-5" />
                {item.badge && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;