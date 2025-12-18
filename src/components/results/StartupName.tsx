import * as React from 'react';
import { useState, useEffect } from 'react';
import { RefreshCw, Edit2, Check, Loader2 } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface StartupNameProps {
  name: {
    name: string;
    tagline: string;
  };
}

export const StartupName = ({ name }: StartupNameProps) => {
  const { regenerateSection, updateSection } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  // State to hold values
  const [editedName, setEditedName] = useState(name.name);
  const [editedTagline, setEditedTagline] = useState(name.tagline);

  // FIX: Sync state when props change (This ensures the new name appears)
  useEffect(() => {
    setEditedName(name.name);
    setEditedTagline(name.tagline);
  }, [name]);

  const handleSave = () => {
    updateSection('name', {
      name: editedName,
      tagline: editedTagline
    });
    setIsEditing(false);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await regenerateSection('name');
    setIsRegenerating(false);
  };

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
      {/* Header Section */}
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Identity
        </h3>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit"
            disabled={isRegenerating}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleRegenerate}
            className={`p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors ${isRegenerating ? 'animate-spin text-blue-400' : ''}`}
            title="Regenerate"
            disabled={isRegenerating}
          >
            {isRegenerating ? <Loader2 className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {isEditing ? (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Tagline</label>
              <input
                type="text"
                value={editedTagline}
                onChange={(e) => setEditedTagline(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Check className="h-4 w-4 mr-2" /> Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            {isRegenerating ? (
              <div className="flex flex-col items-center justify-center h-24 space-y-3">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <span className="text-sm text-slate-400 animate-pulse">Designing new identity...</span>
              </div>
            ) : (
              <>
                <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500 mb-4 tracking-tight animate-in fade-in zoom-in duration-300">
                  {name.name}
                </h2>
                <div className="inline-block relative">
                  <p className="text-xl text-blue-200/80 font-light italic">
                    "{name.tagline}"
                  </p>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-50"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
