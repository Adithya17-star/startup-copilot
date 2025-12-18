import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { RefreshCw, Edit2, Code, Eye, Check } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface LandingPageProps {
  html: string;
}

export const LandingPage = ({ html }: LandingPageProps) => {
  const { regenerateSection, updateSection, startupKit } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState(html);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  
  // Dynamic HTML that always has the current name
  const [displayHtml, setDisplayHtml] = useState(html);

  // FIX: Whenever the kit's name or HTML changes, update the preview
  useEffect(() => {
    if (startupKit?.name?.name) {
      // Replace the placeholder with the actual current name
      const currentName = startupKit.name.name;
      const updatedHtml = html.replace(/STARTUP_NAME_PLACEHOLDER/g, currentName);
      setEditedHtml(updatedHtml);
      setDisplayHtml(updatedHtml);
    } else {
      setEditedHtml(html);
      setDisplayHtml(html);
    }
  }, [html, startupKit?.name]);

  const handleSave = () => {
    updateSection('landingPage', editedHtml);
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          Landing Page
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'code' : 'preview')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'code' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white'}`}
            title={viewMode === 'preview' ? "View Code" : "View Preview"}
          >
            {viewMode === 'preview' ? <Code className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-lg transition-colors ${isEditing ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white'}`}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => regenerateSection('landingPage')} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-0">
        {isEditing ? (
          <div className="p-6 space-y-4 bg-slate-950">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider">HTML Editor</span>
              <button onClick={handleSave} className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition-colors">
                <Check className="h-3 w-3 mr-1.5" /> Save
              </button>
            </div>
            <textarea
              value={editedHtml}
              onChange={(e) => setEditedHtml(e.target.value)}
              className="w-full h-96 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-blue-300 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              spellCheck="false"
            />
          </div>
        ) : viewMode === 'code' ? (
          <div className="p-0 h-96 overflow-auto bg-slate-950 custom-scrollbar">
            <pre className="p-6 text-sm font-mono text-blue-300 whitespace-pre-wrap">{displayHtml}</pre>
          </div>
        ) : (
          <div className="relative">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 mx-4 bg-slate-900/50 rounded-md h-6 flex items-center px-3">
                <span className="text-[10px] text-slate-500">localhost:3000</span>
              </div>
            </div>
            <iframe
              className="w-full h-[500px] border-0 bg-white"
              srcDoc={displayHtml}
              title="Landing Page Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        )}
      </div>
    </div>
  );
};
