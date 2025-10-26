
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageDisplay from './components/ImageDisplay';
import { MagicWandIcon } from './components/icons/MagicWandIcon';
import { UploadIcon } from './components/icons/UploadIcon';
import { fileToBase64, Base64File } from './utils/fileUtils';
import { editImageWithPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<Base64File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
          setError("Invalid file type. Please upload an image.");
          return;
      }
      try {
        setError(null);
        setEditedImage(null);
        const imageData = await fileToBase64(file);
        setOriginalImage(imageData);
      } catch (err) {
        setError("Failed to load image. Please try another file.");
        console.error(err);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a prompt describing your edit.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const resultImageUrl = await editImageWithPrompt(
        originalImage.base64,
        originalImage.mimeType,
        prompt
      );
      setEditedImage(resultImageUrl);
    } catch (err) {
       setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="flex flex-col gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl">
            <div>
              <h2 className="text-xl font-semibold text-gray-200 mb-3">1. Upload Your Image</h2>
              <label
                htmlFor="file-upload"
                className="group relative flex flex-col items-center justify-center w-full h-64 bg-gray-900 rounded-xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors duration-300 cursor-pointer"
              >
                {originalImage ? (
                  <img src={originalImage.dataUrl} alt="Original upload" className="object-contain w-full h-full rounded-lg p-2" />
                ) : (
                  <div className="text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    <p className="mt-2 text-sm text-gray-400">
                      <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               <h2 className="text-xl font-semibold text-gray-200 mb-0">2. Describe Your Edit</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Add a retro cinematic filter', 'Make the sky look like a galaxy', 'Remove the person in the background'"
                className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-500 text-gray-200 resize-none"
                disabled={!originalImage || isLoading}
              />
              <button
                type="submit"
                disabled={!originalImage || isLoading}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                <MagicWandIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'Generating...' : 'Apply Edit'}
              </button>
            </form>
          </div>

          {/* Output Column */}
          <div className="flex flex-col p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
             <ImageDisplay
                title="Edited Image"
                imageUrl={editedImage}
                isLoading={isLoading}
             />
          </div>
        </main>

        {error && (
          <div className="mt-6 w-full max-w-2xl mx-auto p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
            <p><span className="font-bold">Error:</span> {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
