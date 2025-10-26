
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  title: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, title }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold text-center text-gray-200 mb-4">{title}</h2>
      <div className="relative flex-grow w-full aspect-square bg-gray-900 rounded-xl shadow-lg overflow-hidden border-2 border-dashed border-gray-600 flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 transition-opacity duration-300">
            <svg className="animate-spin h-10 w-10 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-white font-medium animate-pulse">Generating your vision...</p>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
        ) : (
          !isLoading && 
          <div className="text-center text-gray-500">
            <p className="text-lg">Your creation will appear here.</p>
            <p className="text-sm">Describe an edit and click "Apply Edit".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
