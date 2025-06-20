import React, { useState } from 'react';
import { X, Car, GraduationCap, Calendar, Heart, AlertTriangle, MessageSquare, Coffee, Music, TowerControl as GameController2, Briefcase, Home } from 'lucide-react';
import type { GroupChat } from '../App';

interface CreateGroupModalProps {
  onClose: () => void;
  onCreateGroup: (groupData: Omit<GroupChat, 'id' | 'memberCount' | 'lastMessage' | 'lastMessageTime' | 'createdAt'>) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('MessageSquare');
  const [selectedColor, setSelectedColor] = useState('from-cyan-400 to-blue-500');

  const categories = [
    'Traffic', 'Campus', 'Events', 'Confessions', 'Emergency', 'Social', 'Entertainment', 'Gaming', 'Work', 'Housing'
  ];

  const icons = [
    { name: 'MessageSquare', component: MessageSquare },
    { name: 'Car', component: Car },
    { name: 'GraduationCap', component: GraduationCap },
    { name: 'Calendar', component: Calendar },
    { name: 'Heart', component: Heart },
    { name: 'AlertTriangle', component: AlertTriangle },
    { name: 'Coffee', component: Coffee },
    { name: 'Music', component: Music },
    { name: 'GameController2', component: GameController2 },
    { name: 'Briefcase', component: Briefcase },
    { name: 'Home', component: Home }
  ];

  const colors = [
    'from-cyan-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-rose-500',
    'from-indigo-400 to-purple-500',
    'from-pink-400 to-rose-500',
    'from-teal-400 to-cyan-500',
    'from-orange-400 to-red-500',
    'from-violet-400 to-purple-500'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || !selectedCategory) return;

    onCreateGroup({
      name: groupName.trim(),
      category: selectedCategory,
      icon: selectedIcon,
      color: selectedColor,
      isCustom: true
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Group</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Group Name *
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((icon) => {
                const IconComponent = icon.component;
                return (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => setSelectedIcon(icon.name)}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      selectedIcon === icon.name
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Theme
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} transition-all duration-200 ${
                    selectedColor === color
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                      : 'hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-3">Preview</h3>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedColor} rounded-xl flex items-center justify-center text-white`}>
                  {React.createElement(icons.find(i => i.name === selectedIcon)?.component || MessageSquare, { className: "w-6 h-6" })}
                </div>
                <span className="text-xs text-gray-400">1 member</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{groupName || 'Group Name'}</h3>
              <p className="text-gray-300 text-sm mb-2">Group created</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${selectedColor} text-white`}>
                {selectedCategory || 'Category'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!groupName.trim() || !selectedCategory}
            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;