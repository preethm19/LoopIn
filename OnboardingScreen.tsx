import React, { useState } from 'react';
import { MapPin, Shield, Users, MessageCircle, Zap } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (profile: any) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState('');
  const [radius, setRadius] = useState(2);
  const [locationPermission, setLocationPermission] = useState(false);

  const generateRandomId = () => {
    const prefixes = ['User', 'Chatter', 'Local', 'Anon', 'Wanderer'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(Math.random() * 9999) + 1;
    return `${prefix}${number}`;
  };

  const requestLocationPermission = async () => {
    try {
      const permission = await navigator.geolocation.getCurrentPosition(
        () => {
          setLocationPermission(true);
          setStep(3);
        },
        (error) => {
          console.error('Location permission denied:', error);
          // Still allow to continue for demo purposes
          setLocationPermission(true);
          setStep(3);
        }
      );
    } catch (error) {
      console.error('Geolocation not supported:', error);
      setLocationPermission(true);
      setStep(3);
    }
  };

  const handleComplete = () => {
    const profile = {
      userId: userId || generateRandomId(),
      radius,
      createdAt: new Date().toISOString(),
    };
    onComplete(profile);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">LoopIn</h1>
              <p className="text-gray-300 text-lg">Anonymous hyperlocal chat</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <Shield className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-white font-semibold">100% Anonymous</h3>
                  <p className="text-gray-300 text-sm">No signup required</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <MapPin className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Hyperlocal</h3>
                  <p className="text-gray-300 text-sm">Connect with people nearby</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <Zap className="w-6 h-6 text-yellow-400" />
                <div>
                  <h3 className="text-white font-semibold">Real-time</h3>
                  <p className="text-gray-300 text-sm">Instant messaging</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Choose Your Identity</h2>
              <p className="text-gray-300">Pick a temporary anonymous ID</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Anonymous User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter custom ID or leave blank for random"
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <button
                onClick={() => setUserId(generateRandomId())}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                Generate Random ID
              </button>
            </div>

            <button
              onClick={requestLocationPermission}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-cyan-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Set Your Range</h2>
              <p className="text-gray-300">How far should we look for people?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Range: {radius} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>1 km</span>
                  <span>5 km</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-2">Your ID: {userId || generateRandomId()}</h3>
                <p className="text-gray-300 text-sm">Range: {radius} km radius</p>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Enter LoopIn
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingScreen;