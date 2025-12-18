import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2, Check } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface ElevatorPitchProps {
  pitch: string;
}

export const ElevatorPitch = ({ pitch }: ElevatorPitchProps) => {
  const { regenerateSection, updateSection } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPitch, setEditedPitch] = useState(pitch);

  const handleSave = () => {
    updateSection('elevatorPitch', editedPitch);
    setIsEditing(false);
  };

  const paragraphs = pitch.split('\n\n').filter(p => p.trim());

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          Elevator Pitch
        </h3>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('elevatorPitch')}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-8">
        {isEditing ? (
          <div className="space-y-4 animate-fade-in">
            <textarea
              value={editedPitch}
              onChange={(e) => setEditedPitch(e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all leading-relaxed"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Check className="h-4 w-4 mr-2" /> Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none text-slate-300 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
