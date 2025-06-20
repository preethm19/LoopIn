import React, { useState } from 'react';
import { MapPin, MessageCircle, Filter, Users } from 'lucide-react';
import type { User } from '../App';

interface NearbyUsersProps {
  onOpenChat: (chatId: string) => void;
}

const NearbyUsers: React.FC<NearbyUsersProps> = ({ onOpenChat }) => {
  const [filterRadius, setFilterRadius] = useState(2);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const nearbyUsers: User[] = [
    { id: '1', name: 'User123', distance: 0.2, lastSeen: 'online', isOnline: true },
    { id: '2', name: 'LocalChatter', distance: 0.5, lastSeen: '2m ago', isOnline: false },
    { id: '3', name: 'AnonUser456', distance: 0.8, lastSeen: 'online', isOnline: true },
    { id: '4', name: 'Wanderer789', distance: 1.2, lastSeen: '15m ago', isOnline: false },
    { id: '5', name: 'CampusLife', distance: 1.5, lastSeen: 'online', isOnline: true },
    { id: '6', name: 'NightOwl', distance: 1.8, lastSeen: '5m ago', isOnline: false },
    { id: '7', name: 'StudyBuddy', distance: 2.1, lastSeen: 'online', isOnline: true },
    { id: '8', name: 'Anonymous42', distance: 2.3, lastSeen: '1h ago', isOnline: false }
  ];

  const filteredUsers = nearbyUsers.filter(user => {
    if (user.distance > filterRadius) return false;
    if (showOnlineOnly && !user.isOnline) return false;
    return true;
  });

  return (
    <div className="min-h-screen p-6 pt-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Users className="w-8 h-8" />
            Nearby Users
          </h1>
          <p className="text-gray-300">Connect with anonymous users in your area</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            <span className="text-sm text-gray-400">{filteredUsers.length} users found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Range: {filterRadius} km
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={filterRadius}
                onChange={(e) => setFilterRadius(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="onlineOnly"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400"
              />
              <label htmlFor="onlineOnly" className="text-sm text-gray-300">
                Show online users only
              </label>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name[0]}
                  </div>
                  <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {user.distance}km
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-1">{user.name}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {user.isOnline ? 'Online now' : `Last seen ${user.lastSeen}`}
              </p>

              <button
                onClick={() => onOpenChat(`user-${user.id}`)}
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Start Chat
              </button>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-gray-400">Try adjusting your filters or check back later</p>
          </div>
        )}

        {/* Stats */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">{nearbyUsers.filter(u => u.isOnline).length}</div>
              <div className="text-xs text-gray-400">Online Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{nearbyUsers.length}</div>
              <div className="text-xs text-gray-400">Total Nearby</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">{filterRadius}km</div>
              <div className="text-xs text-gray-400">Search Range</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{Math.round(nearbyUsers.filter(u => u.distance < 1).length / nearbyUsers.length * 100)}%</div>
              <div className="text-xs text-gray-400">Within 1km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyUsers;