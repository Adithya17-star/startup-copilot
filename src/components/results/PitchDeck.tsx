import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';
import { PitchDeckSlide } from '../../types';

interface PitchDeckProps {
  slides: PitchDeckSlide[];
}

export const PitchDeck = ({ slides }: PitchDeckProps) => {
  const { regenerateSection, updateSection } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlides, setEditedSlides] = useState<PitchDeckSlide[]>(slides);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSave = () => {
    updateSection('pitchDeck', editedSlides);
    setIsEditing(false);
  };

  const handleUpdateSlide = (index: number, field: 'title' | 'content', value: string) => {
    const updatedSlides = [...editedSlides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setEditedSlides(updatedSlides);
  };

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          Pitch Deck
        </h3>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('pitchDeck')}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Progress Bar */}
        <div className="flex items-center mb-8 gap-4">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-4 animate-fade-in">
            <input
              type="text"
              value={editedSlides[currentSlide].title}
              onChange={(e) => handleUpdateSlide(currentSlide, 'title', e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              value={editedSlides[currentSlide].content}
              onChange={(e) => handleUpdateSlide(currentSlide, 'content', e.target.value)}
              className="w-full h-48 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Check className="h-4 w-4 mr-2" /> Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[250px] flex flex-col justify-center animate-fade-in">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">
              {slides[currentSlide].title}
            </h2>
            <div className="text-lg text-slate-300 leading-relaxed space-y-2">
              {slides[currentSlide].content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
          <button
            onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-blue-500 w-6' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors group"
          >
            <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
