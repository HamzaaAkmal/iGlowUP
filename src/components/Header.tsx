import React from 'react';
import { User, Settings, HelpCircle, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pink-100 to-rose-100 shadow-sm border-b border-pink-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">iGlowUP Pakistan</h1>
              <p className="text-sm text-pink-600 font-medium">GlowBot – Your Personal Style Advisor</p>
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