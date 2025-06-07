import React from 'react';
import { ChatMessage } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex items-start space-x-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-gray-800 border border-pink-200' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
      }`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        {message.isTyping && (
          <div className="flex space-x-1 mt-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
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