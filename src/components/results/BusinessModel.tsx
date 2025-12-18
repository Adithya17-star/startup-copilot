import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2, Check, DollarSign, Users, TrendingUp } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface BusinessModelProps {
  model: string;
}

export const BusinessModel = ({ model }: BusinessModelProps) => {
  const { regenerateSection, updateSection } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedModel, setEditedModel] = useState(model);

  const handleSave = () => {
    updateSection('businessModel', editedModel);
    setIsEditing(false);
  };

  const sections = model.split('\n\n').filter(section => section.trim());

  const getIconForSection = (title: string) => {
    if (title.includes('Revenue')) return <DollarSign className="h-5 w-5 text-green-400" />;
    if (title.includes('Customer')) return <Users className="h-5 w-5 text-blue-400" />;
    return <TrendingUp className="h-5 w-5 text-purple-400" />;
  };

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Business Model
        </h3>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('businessModel')}
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
              value={editedModel}
              onChange={(e) => setEditedModel(e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all leading-relaxed font-mono text-sm"
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
          <div className="grid grid-cols-1 gap-6">
            {sections.map((section, index) => {
              const hasTitle = section.includes(':');
              if (hasTitle) {
                const [title, content] = section.split(':');
                return (
                  <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      {getIconForSection(title)}
                      <h4 className="font-semibold text-white text-lg">{title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {content.split('\n').filter(l => l.trim()).map((line, lineIndex) => (
                        <li key={lineIndex} className="text-slate-300 flex items-start gap-2 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0"></span>
                          {line.replace(/^-\s*/, '').trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return <p key={index} className="text-slate-300">{section}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
