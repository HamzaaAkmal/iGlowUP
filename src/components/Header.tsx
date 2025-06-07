import React from 'react';
import { User, Settings, HelpCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  agentPersona?: 'female' | 'male';
}

const Header: React.FC<HeaderProps> = ({ agentPersona }) => {
  return (
    <header className="bg-gradient-to-r from-pink-100 to-rose-100 shadow-sm border-b border-pink-200">
      {/* Beta Banner */}
      <div className="bg-yellow-300 text-yellow-800 text-xs font-semibold text-center py-1">
        🌟 Currently in Beta – Powered by DownLabs AI
      </div>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">iGlowup</h1>
              <p className="text-sm text-pink-600 font-medium flex items-center">
                {agentPersona === 'female' && <span role="img" aria-label="Friendly girl agent" className="mr-1 text-lg">💁</span>}
                {agentPersona === 'male' && <span role="img" aria-label="Smart guy agent" className="mr-1 text-lg">🧑</span>}
                Your Personal Fashion Stylist
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;