import React, { useState } from 'react';
import { Download, Eye, RefreshCw } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { exportStartupKit } from '../services/generationService';

export const ExportActions = () => {
  const { startupKit, generateKit } = useStartupContext();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!startupKit) return null;

  const handleExport = (format: 'pdf' | 'text' | 'html') => {
    exportStartupKit(startupKit, format);
    setIsExportOpen(false);
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
    
    // Create a new window with the landing page HTML
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(startupKit.landingPage);
      previewWindow.document.close();
    }
  };

  return (
    <div className="mt-10 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => generateKit()}
          className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-sm"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Regenerate All
        </button>
        
        <div className="relative">
          <button
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 shadow-sm"
          >
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
          
          {isExportOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 right-0">
              <button
                onClick={() => handleExport('pdf')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as PDF
              </button>
              <button
                onClick={() => handleExport('text')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as Text
              </button>
              <button
                onClick={() => handleExport('html')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export Landing Page HTML
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={handleOpenPreview}
          className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-sm"
        >
          <Eye className="h-5 w-5 mr-2" />
          Preview Landing Page
        </button>
      </div>
    </div>
  );
};
