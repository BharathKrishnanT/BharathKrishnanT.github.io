
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center text-white border-b border-gray-700/50">
      <div className="flex items-center justify-center gap-4">
        <div className="p-3 bg-purple-900/50 rounded-full border border-purple-700">
            <MagicWandIcon className="w-8 h-8 text-purple-300" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Gemini Image Editor
        </h1>
      </div>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
        Transform your images with the power of AI. Just upload a photo and describe the edit you envision.
      </p>
    </header>
  );
};

export default Header;
