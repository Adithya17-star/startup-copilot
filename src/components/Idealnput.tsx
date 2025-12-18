import * as React from 'react';
import { useState } from 'react';
import { Sparkles, Rocket, Zap } from 'lucide-react';
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
    <div className="w-full max-w-4xl mx-auto mb-10 relative z-10">
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4 border border-blue-500/20 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-300">AI-Powered Startup Generator</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-6 tracking-tight drop-shadow-lg">
          Startup Co-Pilot
        </h1>
        <p className="text-lg text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
          Transform your raw idea into a complete, investor-ready startup kit in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full relative group">
        {/* Glow Effect behind input */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isFocused ? 'opacity-75' : ''}`}></div>
        
        <div className="relative">
          <textarea
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your startup idea... (e.g., 'An AI assistant that helps small business owners with marketing strategies')"
            className={`w-full p-6 bg-slate-900/90 border border-white/10 text-white placeholder-slate-400 rounded-xl shadow-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-300 resize-none backdrop-blur-xl ${
              isFocused ? 'h-48' : 'h-32'
            }`}
            required
          />
          
          <button
            type="submit"
            disabled={isGenerating || !ideaInput.trim()}
            className={`absolute bottom-4 right-4 py-2.5 px-6 rounded-lg font-medium transition-all duration-300 flex items-center shadow-lg ${
              isGenerating || !ideaInput.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 hover:shadow-blue-500/25 hover:scale-105 active:scale-95'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : startupKit ? (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Kit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
