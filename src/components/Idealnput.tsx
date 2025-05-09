import * as React from 'react';
import { useState } from 'react';
import { Sparkles, Rocket } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';

export const IdeaInput = () => {
  const { ideaInput, setIdeaInput, generateKit, isGenerating, startupKit } = useStartupContext();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaInput.trim()) {
      generateKit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Startup Co-Pilot
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your startup idea into a complete startup kit with just one click.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className={`relative transition-all duration-300 ${isFocused ? 'transform -translate-y-1' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl blur opacity-20"></div>
          <div className="relative">
            <textarea
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your startup idea... (e.g., 'An AI assistant that helps small business owners with marketing strategies')"
              className={`w-full p-5 bg-white border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 resize-none ${
                isFocused ? 'h-40' : 'h-32'
              }`}
              required
            />
            <button
              type="submit"
              disabled={isGenerating || !ideaInput.trim()}
              className={`mt-4 flex items-center justify-center w-full py-3 px-4 rounded-xl ${
                isGenerating || !ideaInput.trim()
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              } font-medium transition-all duration-300 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Your Startup Kit...
                </>
              ) : startupKit ? (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Regenerate Startup Kit
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Startup Kit
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};