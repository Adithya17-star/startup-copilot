import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { InspirationIdea } from '../types';

const inspirationIdeas: InspirationIdea[] = [
  {
    title: "AI Travel Planner",
    description: "An AI-powered app that creates personalized travel itineraries based on user preferences."
  },
  {
    title: "Blockchain Resume",
    description: "A platform using blockchain to verify employment history and education credentials."
  },
  {
    title: "Virtual Fitness Coach",
    description: "An AR/VR application that provides real-time coaching and form correction."
  },
  {
    title: "Sustainable Delivery",
    description: "Zero-waste grocery delivery service using electric vehicles and reusable packaging."
  },
  {
    title: "Mental Health Chatbot",
    description: "AI support for stress management connecting users with professional help."
  },
  {
    title: "Smart Urban Farming",
    description: "IoT-based vertical farming systems for urban environments."
  }
];

export const InspirationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIdeaInput } = useStartupContext();

  const handleSelectIdea = (idea: InspirationIdea) => {
    setIdeaInput(idea.description);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div 
        className={`fixed z-40 md:relative transition-all duration-300 ease-in-out h-full 
        bg-slate-900/80 backdrop-blur-xl border-r border-white/10 ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        } w-64 overflow-y-auto custom-scrollbar`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Inspiration
            </h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">
            Starter Ideas
          </p>
          <div className="space-y-3">
            {inspirationIdeas.map((idea, index) => (
              <button
                key={index}
                onClick={() => handleSelectIdea(idea)}
                className="p-3 w-full text-left border border-white/5 rounded-xl 
                hover:bg-white/5 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] 
                transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h4 className="font-medium text-slate-200 group-hover:text-blue-300 transition-colors relative z-10">
                  {idea.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 relative z-10">
                  {idea.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 md:hidden bottom-5 left-5 p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 border border-white/20"
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </>
  );
};
