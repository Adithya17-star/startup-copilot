import * as React from 'react';
import { useState, useRef } from 'react';
import { RefreshCw, Edit2, Code } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface LandingPageProps {
  html: string;
}

export const LandingPage = ({ html }: LandingPageProps) => {
  const { regenerateSection, updateSection } = useStartupContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState(html);
  const [isViewingCode, setIsViewingCode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSave = () => {
    updateSection('landingPage', editedHtml);
    setIsEditing(false);
  };

  const updateIframeContent = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(isEditing ? editedHtml : html);
        doc.close();
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Landing Page</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsViewingCode(!isViewingCode)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="View Code"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('landingPage')}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editedHtml}
              onChange={(e) => setEditedHtml(e.target.value)}
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              style={{ resize: 'vertical' }}
            />
            
            <div className="flex justify-between items-center">
              <button
                onClick={updateIframeContent}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Preview Changes
              </button>
              
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
        ) : isViewingCode ? (
          <div className="space-y-4">
            <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto max-h-96">
              <pre className="whitespace-pre-wrap text-sm font-mono">{html}</pre>
            </div>
            <button
              onClick={() => setIsViewingCode(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Preview
            </button>
          </div>
        ) : (
          <div>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center">
                <div className="flex space-x-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-500">Landing Page Preview</span>
                </div>
              </div>
              <div className="bg-white h-96 overflow-hidden relative">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Landing Page Preview"
                  srcDoc={html}
                  sandbox="allow-same-origin"
                ></iframe>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => window.open('', '_blank')?.document.write(html)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open Full Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};