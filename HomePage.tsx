import React from 'react';
import { Users, MessageSquare, Car, GraduationCap, Calendar, Heart, AlertTriangle, Coffee, Music, TowerControl as GameController2, Briefcase, Home } from 'lucide-react';
import type { GroupChat, User } from '../App';

interface HomePageProps {
  onOpenChat: (chatId: string) => void;
  customGroups: GroupChat[];
}

const HomePage: React.FC<HomePageProps> = ({ onOpenChat, customGroups }) => {
  const defaultGroupChats: GroupChat[] = [
    {
      id: 'traffic',
      name: 'Traffic Updates',
      category: 'Traffic',
      memberCount: 24,
      lastMessage: 'Heavy traffic on Main St',
      lastMessageTime: '2m ago',
      icon: 'Car',
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 'campus',
      name: 'Campus Life',
      category: 'Campus',
      memberCount: 156,
      lastMessage: 'Anyone in the library?',
      lastMessageTime: '5m ago',
      icon: 'GraduationCap',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'events',
      name: 'Local Events',
      category: 'Events',
      memberCount: 89,
      lastMessage: 'Coffee meetup at 3pm',
      lastMessageTime: '12m ago',
      icon: 'Calendar',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'confessions',
      name: 'Anonymous Confessions',
      category: 'Confessions',
      memberCount: 67,
      lastMessage: 'I have something to say...',
      lastMessageTime: '1h ago',
      icon: 'Heart',
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'emergency',
      name: 'Emergency Alerts',
      category: 'Emergency',
      memberCount: 12,
      lastMessage: 'All clear in downtown',
      lastMessageTime: '3h ago',
      icon: 'AlertTriangle',
      color: 'from-yellow-400 to-amber-500'
    }
  ];

  // Combine default and custom groups, show most recent custom groups first
  const allGroupChats = [...customGroups.slice(-3), ...defaultGroupChats.slice(0, 5 - Math.min(customGroups.length, 3))];

  const nearbyUsers: User[] = [
    { id: '1', name: 'User123', distance: 0.2, lastSeen: 'online', isOnline: true },
    { id: '2', name: 'LocalChatter', distance: 0.5, lastSeen: '2m ago', isOnline: false },
    { id: '3', name: 'AnonUser456', distance: 0.8, lastSeen: 'online', isOnline: true },
    { id: '4', name: 'Wanderer789', distance: 1.2, lastSeen: '15m ago', isOnline: false }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Car: Car,
      GraduationCap: GraduationCap,
      Calendar: Calendar,
      Heart: Heart,
      AlertTriangle: AlertTriangle,
      MessageSquare: MessageSquare,
      Coffee: Coffee,
      Music: Music,
      GameController2: GameController2,
      Briefcase: Briefcase,
      Home: Home
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen p-6 pt-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Welcome to LoopIn</h1>
          <p className="text-gray-300">Connect with people in your area</p>
        </div>

        {/* Group Chats Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Group Chats
            </h2>
            <span className="text-sm text-gray-400">
              {defaultGroupChats.length + customGroups.length} total groups
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allGroupChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onOpenChat(chat.id)}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer transform hover:scale-105 relative"
              >
                {chat.isCustom && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${chat.color} rounded-xl flex items-center justify-center text-white`}>
                    {getIcon(chat.icon)}
                  </div>
                  <span className="text-xs text-gray-400">{chat.memberCount} members</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{chat.name}</h3>
                <p className="text-gray-300 text-sm mb-2 truncate">{chat.lastMessage}</p>
                <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Users Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Nearby Users
            </h2>
            <span className="text-sm text-gray-400">{nearbyUsers.length} online</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => onOpenChat(`user-${user.id}`)}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name[0]}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  </div>
                  <span className="text-xs text-gray-400">{user.distance}km</span>
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{user.name}</h3>
                <p className="text-gray-400 text-xs">{user.lastSeen}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">{defaultGroupChats.length + customGroups.length}</div>
              <div className="text-xs text-gray-400">Active Chats</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-xs text-gray-400">Nearby Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">2.1km</div>
              <div className="text-xs text-gray-400">Your Range</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;