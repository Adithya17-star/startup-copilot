import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2, Palette, Check } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface BrandingKitProps {
  branding: {
    colors: { primary: string; secondary: string; accent: string; };
    fonts: { heading: string; body: string; };
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

  const handleColorChange = (key: 'primary' | 'secondary' | 'accent', val: string) => {
    setEditedBranding({ ...editedBranding, colors: { ...editedBranding.colors, [key]: val } });
  };

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          Visual Identity
        </h3>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={() => setIsEditing(!isEditing)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
          <button onClick={() => regenerateSection('brandingKit')} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"><RefreshCw className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Colors */}
        <div>
          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-4 flex items-center gap-2">
            <Palette className="h-4 w-4" /> Color Palette
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(isEditing ? editedBranding.colors : branding.colors).map(([key, color]) => (
              <div key={key} className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                <div 
                  className="h-16 rounded-lg shadow-lg mb-3 transition-transform hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: color }}
                ></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 capitalize">{key}</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={color}
                      onChange={(e) => handleColorChange(key as any, e.target.value)}
                      className="w-20 bg-transparent text-right text-sm text-white font-mono border-b border-slate-700 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span className="text-sm font-mono text-white">{color}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts & Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-4">Typography</h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <p className="text-xs text-slate-500 mb-1">Heading</p>
                <p className="text-xl text-white font-bold">{branding.fonts.heading}</p>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <p className="text-xs text-slate-500 mb-1">Body</p>
                <p className="text-base text-white">{branding.fonts.body}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-4">Logo Concept</h4>
            <div className="p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/5 h-full flex items-center">
              <p className="text-slate-300 italic leading-relaxed">
                "{branding.logoIdea}"
              </p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button onClick={handleSave} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Check className="h-4 w-4 mr-2" /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
