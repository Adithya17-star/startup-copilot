import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateStartupKit } from '../services/generationService';
import { StartupKit } from '../types';

interface StartupContextType {
  ideaInput: string;
  setIdeaInput: (input: string) => void;
  startupKit: StartupKit | null;
  isGenerating: boolean;
  generateKit: () => Promise<void>;
  regenerateSection: (section: keyof StartupKit) => Promise<void>;
  updateSection: (section: keyof StartupKit, content: any) => void;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export const useStartupContext = () => {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error('useStartupContext must be used within a StartupContextProvider');
  }
  return context;
};

interface StartupContextProviderProps {
  children: ReactNode;
}

export const StartupContextProvider = ({ children }: StartupContextProviderProps) => {
  const [ideaInput, setIdeaInput] = useState('');
  const [startupKit, setStartupKit] = useState<StartupKit | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateKit = async () => {
    if (!ideaInput.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedKit = await generateStartupKit(ideaInput);
      setStartupKit(generatedKit);
    } catch (error) {
      console.error('Error generating startup kit:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateSection = async (section: keyof StartupKit) => {
    if (!startupKit || !ideaInput.trim()) return;
    
    setIsGenerating(true);
    try {
      const regenerated = await generateStartupKit(ideaInput, section);
      setStartupKit({
        ...startupKit,
        [section]: regenerated[section]
      });
    } catch (error) {
      console.error(`Error regenerating ${section}:`, error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSection = (section: keyof StartupKit, content: any) => {
    if (!startupKit) return;
    
    setStartupKit({
      ...startupKit,
      [section]: content
    });
  };

  const value = {
    ideaInput,
    setIdeaInput,
    startupKit,
    isGenerating,
    generateKit,
    regenerateSection,
    updateSection
  };

  return <StartupContext.Provider value={value}>{children}</StartupContext.Provider>;
};
