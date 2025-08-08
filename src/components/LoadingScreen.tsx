import React from 'react';
import Logo from '../assets/FirmenlogoLoading-removebg-preview.png';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50 text-white">
      {/* Subtiler Hintergrund-Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900/5 to-gray-900"></div>

      {/* Hauptinhalt */}
      <div className="relative text-center z-10 px-4">
        {/* Hauptlogo */}
        <div className="mb-6">
          <img
            src={Logo}
            alt="QuickStart AI Logo"
            className="w-16 h-16 mx-auto object-contain"
          />
        </div>

        {/* Spruch */}
        <p className="text-lg text-gray-300 mb-8">
          Effizienz beginnt mit der richtigen Conversation
        </p>

        {/* Lade-Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-[#e2642a] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-[#e2642a] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-[#e2642a] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>

        {/* Kleines Logo unten */}
        <div className="flex items-center justify-center gap-2 opacity-70">
          <img 
            src={Logo} 
            alt="Mini Logo" 
            className="w-5 h-5 object-contain" 
          />
          <span className="text-sm text-gray-400">QuickStartAI</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;