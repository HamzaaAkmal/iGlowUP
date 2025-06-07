import React from 'react';
import { ChatMessage } from '../types';
import { User } from 'lucide-react'; // Bot icon is removed as it's replaced by emojis

interface ChatBubbleProps {
  message: ChatMessage;
  agentType?: 'female' | 'male'; // Added for bot messages
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, agentType }) => {
  const isBot = message.type === 'bot';
  
  const renderBotAvatar = () => {
    if (agentType === 'female') {
      return <span className="text-2xl">💁</span>;
    } else if (agentType === 'male') {
      return <span className="text-2xl">🧑</span>;
    }
    // Fallback if no agentType specified for bot, or for system messages that might be styled as bot.
    // For now, we'll use a generic bot-like emoji if specific agent isn't set.
    return <span className="text-2xl">🤖</span>;
  };

  return (
    <div className={`flex items-start space-x-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fadeInUpSmooth`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
          {renderBotAvatar()}
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-gray-800 border border-pink-200' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
      }`}>
        {message.isTyping ? (
          <div className="flex items-center space-x-1 py-1">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;