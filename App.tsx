import React, { useState, useEffect } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';
import BottomNavigation from './components/BottomNavigation';
import Settings from './components/Settings';
import NearbyUsers from './components/NearbyUsers';
import GroupChats from './components/GroupChats';
import CreateGroupModal from './components/CreateGroupModal';
import { useLocalStorage } from './hooks/useLocalStorage';

export type Screen = 'onboarding' | 'home' | 'nearby' | 'groups' | 'notifications' | 'settings' | 'chat';

export interface User {
  id: string;
  name: string;
  distance: number;
  lastSeen: string;
  isOnline: boolean;
}

export interface GroupChat {
  id: string;
  name: string;
  category: string;
  memberCount: number;
  lastMessage: string;
  lastMessageTime: string;
  icon: string;
  color: string;
  isCustom?: boolean;
  createdBy?: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isDisappearing?: boolean;
  aiModeration?: {
    flagged: boolean;
    reason?: string;
  };
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useLocalStorage('userProfile', null);
  const [locationPermission, setLocationPermission] = useLocalStorage('locationPermission', false);
  const [customGroups, setCustomGroups] = useLocalStorage<GroupChat[]>('customGroups', []);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    if (userProfile && locationPermission) {
      setCurrentScreen('home');
    }
  }, [userProfile, locationPermission]);

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile);
    setLocationPermission(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUserProfile(null);
    setLocationPermission(false);
    setCustomGroups([]);
    setCurrentScreen('onboarding');
    setActiveChat(null);
    // Clear all localStorage data
    localStorage.clear();
  };

  const handleCreateGroup = (groupData: Omit<GroupChat, 'id' | 'memberCount' | 'lastMessage' | 'lastMessageTime' | 'createdAt'>) => {
    const newGroup: GroupChat = {
      ...groupData,
      id: `custom-${Date.now()}`,
      memberCount: 1,
      lastMessage: 'Group created',
      lastMessageTime: 'now',
      isCustom: true,
      createdBy: userProfile?.userId || 'Unknown',
      createdAt: new Date().toISOString()
    };
    
    setCustomGroups(prev => [...prev, newGroup]);
    setShowCreateGroupModal(false);
  };

  const openChat = (chatId: string) => {
    setActiveChat(chatId);
    setCurrentScreen('chat');
  };

  const closeChat = () => {
    setActiveChat(null);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'home':
        return <HomePage onOpenChat={openChat} customGroups={customGroups} />;
      case 'nearby':
        return <NearbyUsers onOpenChat={openChat} />;
      case 'groups':
        return (
          <>
            <GroupChats 
              onOpenChat={openChat} 
              onCreateGroup={() => setShowCreateGroupModal(true)}
              customGroups={customGroups}
            />
            {showCreateGroupModal && (
              <CreateGroupModal
                onClose={() => setShowCreateGroupModal(false)}
                onCreateGroup={handleCreateGroup}
              />
            )}
          </>
        );
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      case 'chat':
        return <ChatInterface chatId={activeChat} onClose={closeChat} customGroups={customGroups} />;
      default:
        return <HomePage onOpenChat={openChat} customGroups={customGroups} />;
    }
  };

  if (currentScreen === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {renderScreen()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="pb-20">
        {renderScreen()}
      </div>
      <BottomNavigation 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen} 
      />
    </div>
  );
}

export default App;