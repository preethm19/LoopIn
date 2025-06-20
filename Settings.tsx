import React, { useState } from 'react';
import { Settings as SettingsIcon, MapPin, Bell, Clock, Shield, User, LogOut, Info } from 'lucide-react';

interface SettingsProps {
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [radius, setRadius] = useState(2);
  const [notifications, setNotifications] = useState(true);
  const [autoExit, setAutoExit] = useState(true);
  const [disappearingMessages, setDisappearingMessages] = useState(false);
  const [aiModeration, setAiModeration] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className="min-h-screen p-6 pt-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-gray-300">Customize your LoopIn experience</p>
        </div>

        {/* User Profile */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Profile
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Anonymous ID</p>
                <p className="text-gray-400 text-sm">User12345</p>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                Change ID
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Member Since</p>
                <p className="text-gray-400 text-sm">Today, 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location & Range
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Range: {radius} km
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>1 km</span>
                <span>5 km</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Location Status</p>
                <p className="text-green-400 text-sm">Active • Updated 2m ago</p>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Get notified of new messages</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  notifications ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Chat Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Auto-exit Inactive Chats</p>
                <p className="text-gray-400 text-sm">Leave chats after 24h of inactivity</p>
              </div>
              <button
                onClick={() => setAutoExit(!autoExit)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  autoExit ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  autoExit ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Disappearing Messages</p>
                <p className="text-gray-400 text-sm">Messages auto-delete after 1 hour</p>
              </div>
              <button
                onClick={() => setDisappearingMessages(!disappearingMessages)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  disappearingMessages ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  disappearingMessages ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Safety
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">AI Moderation</p>
                <p className="text-gray-400 text-sm">Automatically flag inappropriate content</p>
              </div>
              <button
                onClick={() => setAiModeration(!aiModeration)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  aiModeration ? 'bg-green-400' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  aiModeration ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <p className="text-white font-medium">Report a User</p>
              <p className="text-gray-400 text-sm">Report inappropriate behavior</p>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            About LoopIn
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Version</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Privacy Policy</span>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm">View</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Terms of Service</span>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm">View</button>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-4 px-6 rounded-xl hover:bg-red-500/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Clear Data & Exit
        </button>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-xl font-bold text-white mb-4">Clear Data & Exit?</h3>
              <p className="text-gray-300 mb-6">This will delete all your data and return you to the login screen. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-red-600 transition-all duration-200"
                >
                  Clear & Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;