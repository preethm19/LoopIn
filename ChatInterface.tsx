import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical, Shield, Clock, AlertTriangle } from 'lucide-react';
import type { ChatMessage, GroupChat } from '../App';

interface ChatInterfaceProps {
  chatId: string | null;
  onClose: () => void;
  customGroups: GroupChat[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatId, onClose, customGroups }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'User123',
      userName: 'User123',
      message: 'Hey everyone! Anyone know about the traffic on Main Street?',
      timestamp: '10:30 AM',
      aiModeration: { flagged: false }
    },
    {
      id: '2',
      userId: 'LocalChatter',
      userName: 'LocalChatter',
      message: 'It\'s pretty backed up near the university',
      timestamp: '10:32 AM',
      aiModeration: { flagged: false }
    },
    {
      id: '3',
      userId: 'current-user',
      userName: 'You',
      message: 'Thanks for the heads up!',
      timestamp: '10:33 AM',
      aiModeration: { flagged: false }
    },
    {
      id: '4',
      userId: 'AnonUser456',
      userName: 'AnonUser456',
      message: 'This traffic is absolutely terrible!',
      timestamp: '10:35 AM',
      isDisappearing: true,
      aiModeration: { flagged: true, reason: 'Mild language detected' }
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isDisappearing, setIsDisappearing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDisappearing,
      aiModeration: { flagged: false }
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsDisappearing(false);
  };

  const getChatTitle = () => {
    if (chatId?.startsWith('user-')) {
      return 'Private Chat';
    }
    
    // Check if it's a custom group
    const customGroup = customGroups.find(group => group.id === chatId);
    if (customGroup) {
      return customGroup.name;
    }
    
    const chatNames = {
      'traffic': 'Traffic Updates',
      'campus': 'Campus Life',
      'events': 'Local Events',
      'confessions': 'Anonymous Confessions',
      'emergency': 'Emergency Alerts'
    };
    
    return chatNames[chatId as keyof typeof chatNames] || 'Chat';
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white font-semibold">{getChatTitle()}</h1>
            <p className="text-gray-300 text-sm">12 members online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md space-y-1`}>
              <div className={`flex items-center gap-2 ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-gray-400">{message.userName}</span>
                {message.isDisappearing && <Clock className="w-3 h-3 text-yellow-400" />}
                {message.aiModeration?.flagged && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-orange-400" />
                    <span className="text-xs text-orange-400">AI Flag</span>
                  </div>
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.userId === 'current-user'
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                    : 'bg-white/10 backdrop-blur-lg border border-white/20 text-white'
                } ${message.isDisappearing ? 'opacity-60' : ''}`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
              <div className={`flex items-center gap-1 ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
                {message.aiModeration?.flagged && message.aiModeration.reason && (
                  <span className="text-xs text-orange-400">• {message.aiModeration.reason}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setIsDisappearing(!isDisappearing)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors ${
              isDisappearing 
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                : 'bg-white/10 text-gray-400 border border-white/20'
            }`}
          >
            <Clock className="w-3 h-3" />
            Disappearing
          </button>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Shield className="w-3 h-3" />
            AI Moderated
          </div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-full hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;