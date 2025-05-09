import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2, ChevronRight, ChevronLeft } from 'lucide-react';
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

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const handleUpdateSlide = (index: number, field: 'title' | 'content', value: string) => {
    const updatedSlides = [...editedSlides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value
    };
    setEditedSlides(updatedSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Pitch Deck</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('pitchDeck')}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm text-gray-500">
                {currentSlide + 1} of {slides.length}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slide Title
              </label>
              <input
                type="text"
                value={editedSlides[currentSlide].title}
                onChange={(e) => handleUpdateSlide(currentSlide, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slide Content
              </label>
              <textarea
                value={editedSlides[currentSlide].content}
                onChange={(e) => handleUpdateSlide(currentSlide, 'content', e.target.value)}
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevSlide}
                  className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm text-gray-500">
                {currentSlide + 1} of {slides.length}
              </span>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            
            <h3 className="text-xl font-bold text-blue-800 mb-4">{slides[currentSlide].title}</h3>
            
            <div className="prose text-gray-700">
              {slides[currentSlide].content.split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handlePrevSlide}
                className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="grid grid-cols-5 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-12 h-1.5 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};