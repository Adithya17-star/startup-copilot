import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { InspirationIdea } from '../types';

const inspirationIdeas: InspirationIdea[] = [
  {
    title: "AI Travel Planner",
    description: "An AI-powered app that creates personalized travel itineraries based on user preferences, budget, and travel history."
  },
  {
    title: "Blockchain Resume Verifier",
    description: "A platform using blockchain to verify employment history, education credentials, and skills for job seekers and recruiters."
  },
  {
    title: "Virtual Fitness Coach",
    description: "An AR/VR application that provides real-time coaching, form correction, and personalized workout routines."
  },
  {
    title: "Sustainable Home Delivery",
    description: "A zero-waste grocery delivery service using electric vehicles and reusable packaging systems."
  },
  {
    title: "Mental Health Chatbot",
    description: "An AI chatbot that provides mental health support, stress management techniques, and connects users with professional help when needed."
  },
  {
    title: "Smart Urban Farming",
    description: "IoT-based vertical farming systems for urban environments that optimize growing conditions and automate maintenance."
  },
  {
    title: "Freelancer Collective",
    description: "A platform that organizes freelancers into collectives to bid on larger projects while providing benefits and shared resources."
  },
  {
    title: "Medical Diagnosis Assistant",
    description: "An AI tool that helps doctors analyze symptoms, medical history, and test results to improve diagnostic accuracy."
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
        className={`fixed z-40 md:relative transition-all duration-300 ease-in-out h-full bg-white shadow-lg ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        } w-64 overflow-y-auto`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900">Inspire Me</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">Click an idea to use it as your starting point:</p>
          <div className="space-y-3">
            {inspirationIdeas.map((idea, index) => (
              <button
                key={index}
                onClick={() => handleSelectIdea(idea)}
                className="p-3 w-full text-left border rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{idea.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{idea.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 md:hidden bottom-5 left-5 p-3 rounded-full bg-blue-500 text-white shadow-lg"
        aria-label={isOpen ? "Close inspiration sidebar" : "Open inspiration sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>
    </>
  );
};