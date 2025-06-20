import React, { useState } from 'react';
import { MessageSquare, Users, Car, GraduationCap, Calendar, Heart, AlertTriangle, Plus, Coffee, Music, TowerControl as GameController2, Briefcase, Home } from 'lucide-react';
import type { GroupChat } from '../App';

interface GroupChatsProps {
  onOpenChat: (chatId: string) => void;
  onCreateGroup: () => void;
  customGroups: GroupChat[];
}

const GroupChats: React.FC<GroupChatsProps> = ({ onOpenChat, onCreateGroup, customGroups }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
      id: 'traffic-downtown',
      name: 'Downtown Traffic',
      category: 'Traffic',
      memberCount: 18,
      lastMessage: 'Construction on 5th Ave',
      lastMessageTime: '8m ago',
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
      id: 'campus-study',
      name: 'Study Groups',
      category: 'Campus',
      memberCount: 89,
      lastMessage: 'Math study session at 7pm',
      lastMessageTime: '15m ago',
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
      id: 'events-weekend',
      name: 'Weekend Plans',
      category: 'Events',
      memberCount: 67,
      lastMessage: 'Anyone going to the concert?',
      lastMessageTime: '30m ago',
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

  // Combine default and custom groups
  const allGroupChats = [...defaultGroupChats, ...customGroups];

  const categories = [
    { id: 'all', name: 'All', count: allGroupChats.length },
    { id: 'Traffic', name: 'Traffic', count: allGroupChats.filter(c => c.category === 'Traffic').length },
    { id: 'Campus', name: 'Campus', count: allGroupChats.filter(c => c.category === 'Campus').length },
    { id: 'Events', name: 'Events', count: allGroupChats.filter(c => c.category === 'Events').length },
    { id: 'Confessions', name: 'Confessions', count: allGroupChats.filter(c => c.category === 'Confessions').length },
    { id: 'Emergency', name: 'Emergency', count: allGroupChats.filter(c => c.category === 'Emergency').length },
    { id: 'Social', name: 'Social', count: allGroupChats.filter(c => c.category === 'Social').length },
    { id: 'Entertainment', name: 'Entertainment', count: allGroupChats.filter(c => c.category === 'Entertainment').length },
    { id: 'Gaming', name: 'Gaming', count: allGroupChats.filter(c => c.category === 'Gaming').length },
    { id: 'Work', name: 'Work', count: allGroupChats.filter(c => c.category === 'Work').length },
    { id: 'Housing', name: 'Housing', count: allGroupChats.filter(c => c.category === 'Housing').length }
  ].filter(category => category.count > 0 || category.id === 'all');

  const filteredChats = selectedCategory === 'all' 
    ? allGroupChats 
    : allGroupChats.filter(chat => chat.category === selectedCategory);

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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <MessageSquare className="w-8 h-8" />
            Group Chats
          </h1>
          <p className="text-gray-300">Join conversations in your neighborhood</p>
        </div>

        {/* Category Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name}
                <span className="text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Create New Chat Button */}
        <button 
          onClick={onCreateGroup}
          className="w-full bg-white/10 backdrop-blur-lg border-2 border-dashed border-white/30 rounded-xl p-6 hover:bg-white/20 transition-all duration-200 text-white flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Group Chat
        </button>

        {/* Group Chats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onOpenChat(chat.id)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer transform hover:scale-105 relative"
            >
              {chat.isCustom && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Custom
                </div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${chat.color} rounded-xl flex items-center justify-center text-white`}>
                  {getIcon(chat.icon)}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                    <Users className="w-3 h-3" />
                    {chat.memberCount}
                  </div>
                  <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-1">{chat.name}</h3>
              <p className="text-gray-300 text-sm mb-2 truncate">{chat.lastMessage}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${chat.color} text-white`}>
                  {chat.category}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No chats in this category</h3>
            <p className="text-gray-400">Be the first to start a conversation!</p>
          </div>
        )}

        {/* Category Stats */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-4">Category Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {categories.slice(1, 6).map((category) => (
              <div key={category.id}>
                <div className="text-2xl font-bold text-cyan-400">{category.count}</div>
                <div className="text-xs text-gray-400">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChats;