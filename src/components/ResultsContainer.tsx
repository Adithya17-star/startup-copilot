import React from 'react';
import { useStartupContext } from '../context/StartupContext';
import { StartupName } from './results/StartupName';
import { ElevatorPitch } from './results/ElevatorPitch';
import { BusinessModel } from './results/BusinessModel';
import { PitchDeck } from './results/PitchDeck';
import { BrandingKit } from './results/BrandingKit';
import { LandingPage } from './results/LandingPage';
import { ExportActions } from './ExportActions';
import { Rocket } from 'lucide-react';

export const ResultsContainer = () => {
  const { startupKit, isGenerating } = useStartupContext();

  if (!startupKit && !isGenerating) {
    return null;
  }

  if (isGenerating && !startupKit) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-10">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <Rocket className="h-8 w-8 text-blue-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your startup kit is being created</h2>
          <p className="text-gray-600">We're generating a complete startup package based on your idea...</p>
        </div>
      </div>
    );
  }

  if (!startupKit) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Startup Kit</h2>
      
      <StartupName name={startupKit.name} />
      
      <ElevatorPitch pitch={startupKit.elevatorPitch} />
      
      <BusinessModel model={startupKit.businessModel} />
      
      <PitchDeck slides={startupKit.pitchDeck} />
      
      <BrandingKit branding={startupKit.brandingKit} />
      
      <LandingPage html={startupKit.landingPage} />
      
      <ExportActions />
    </div>
  );
};
