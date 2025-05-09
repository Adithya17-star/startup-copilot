import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2, Palette } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface BrandingKitProps {
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    logoIdea: string;
  };
}

export const BrandingKit = ({ branding }: BrandingKitProps) => {
  const { regenerateSection, updateSection } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBranding, setEditedBranding] = useState(branding);

  const handleSave = () => {
    updateSection('brandingKit', editedBranding);
    setIsEditing(false);
  };

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    setEditedBranding({
      ...editedBranding,
      colors: {
        ...editedBranding.colors,
        [colorType]: value
      }
    });
  };

  const handleFontChange = (fontType: 'heading' | 'body', value: string) => {
    setEditedBranding({
      ...editedBranding,
      fonts: {
        ...editedBranding.fonts,
        [fontType]: value
      }
    });
  };

  const handleLogoIdeaChange = (value: string) => {
    setEditedBranding({
      ...editedBranding,
      logoIdea: value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Branding Kit</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('brandingKit')}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Colors</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Primary</label>
                  <div className="flex">
                    <input
                      type="color"
                      value={editedBranding.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="h-10 w-10 rounded-l-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={editedBranding.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1 h-10 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Secondary</label>
                  <div className="flex">
                    <input
                      type="color"
                      value={editedBranding.colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="h-10 w-10 rounded-l-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={editedBranding.colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="flex-1 h-10 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Accent</label>
                  <div className="flex">
                    <input
                      type="color"
                      value={editedBranding.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="h-10 w-10 rounded-l-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={editedBranding.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 h-10 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Fonts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Heading Font</label>
                  <input
                    type="text"
                    value={editedBranding.fonts.heading}
                    onChange={(e) => handleFontChange('heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Body Font</label>
                  <input
                    type="text"
                    value={editedBranding.fonts.body}
                    onChange={(e) => handleFontChange('body', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Logo Idea</h4>
              <textarea
                value={editedBranding.logoIdea}
                onChange={(e) => handleLogoIdeaChange(e.target.value)}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
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
        ) : (
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Palette className="h-4 w-4 mr-1 text-blue-500" /> 
                Color Palette
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="h-16 rounded-md shadow-sm" style={{ backgroundColor: branding.colors.primary }}></div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Primary</p>
                    <p className="text-sm font-medium">{branding.colors.primary}</p>
                  </div>
                </div>
                <div>
                  <div className="h-16 rounded-md shadow-sm" style={{ backgroundColor: branding.colors.secondary }}></div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Secondary</p>
                    <p className="text-sm font-medium">{branding.colors.secondary}</p>
                  </div>
                </div>
                <div>
                  <div className="h-16 rounded-md shadow-sm" style={{ backgroundColor: branding.colors.accent }}></div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Accent</p>
                    <p className="text-sm font-medium">{branding.colors.accent}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Typography</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-md">
                  <p className="text-xs text-gray-500 mb-2">Heading Font</p>
                  <p
                    className="text-xl font-bold truncate"
                    style={{ fontFamily: branding.fonts.heading }}
                  >
                    {branding.fonts.heading}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                  <p className="text-xs text-gray-500 mb-2">Body Font</p>
                  <p
                    className="text-base truncate"
                    style={{ fontFamily: branding.fonts.body }}
                  >
                    {branding.fonts.body}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Logo Concept</h4>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-gray-700 italic">{branding.logoIdea}</p>
              </div>
            </div>

            <div className="p-4 border border-dashed border-gray-300 rounded-md bg-blue-50">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Pro Tip:</span> Use these branding elements consistently across all your marketing materials, website, and presentations to build strong brand recognition.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
