import React from 'react';
import { useStartupContext } from '../context/StartupContext';
import { StartupName } from './results/StartupName';
import { ElevatorPitch } from './results/ElevatorPitch';
import { BusinessModel } from './results/BusinessModel';
import { PitchDeck } from './results/PitchDeck';
import { BrandingKit } from './results/BrandingKit';
import { LandingPage } from './results/LandingPage';
import { ExportActions } from './ExportActions';
import MarketValidator from './MarketValidator'; // Import the validator
import { Rocket, Sparkles } from 'lucide-react';

export const ResultsContainer = () => {
  const { startupKit, isGenerating } = useStartupContext();

  if (!startupKit && !isGenerating) {
    return (
        <div className="text-center mt-20 opacity-50">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-400" />
            <p className="text-xl">Ready to launch your next big idea?</p>
        </div>
    );
  }

  if (isGenerating && !startupKit) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-20">
        <div className="text-center py-20 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-6 relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20"></div>
            <Rocket className="h-10 w-10 text-blue-400 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Architecting your startup...</h2>
          <p className="text-gray-400 text-lg">Analyzing market trends, generating branding, and building your roadmap.</p>
        </div>
      </div>
    );
  }

  if (!startupKit) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-12 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Your Startup Kit</h2>
        <p className="text-gray-400">Everything you need to start building today.</p>
      </div>
      
      {/* Added Market Validator Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 ml-1">1. Market Analysis</h3>
        <MarketValidator />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 ml-1">2. Identity</h3>
        <StartupName name={startupKit.name} />
      </section>
      
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 ml-1">3. Strategy</h3>
        <ElevatorPitch pitch={startupKit.elevatorPitch} />
        <BusinessModel model={startupKit.businessModel} />
      </section>
      
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 ml-1">4. Presentation</h3>
        <PitchDeck slides={startupKit.pitchDeck} />
      </section>
      
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 ml-1">5. Visuals & Web</h3>
        <BrandingKit branding={startupKit.brandingKit} />
        <LandingPage html={startupKit.landingPage} />
      </section>
      
      <div className="pt-8 border-t border-white/10">
        <ExportActions />
      </div>
    </div>
  );
};
