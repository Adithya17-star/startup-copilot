import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2 } from 'lucide-react';
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

  // Process the business model text
  const sections = model.split('\n\n').filter(section => section.trim());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Business Model</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('businessModel')}
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
              value={editedModel}
              onChange={(e) => setEditedModel(e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your business model..."
            />
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
          <div className="prose max-w-none">
            {sections.map((section, index) => {
              // Check if this section has a title
              const hasTitle = section.includes(':');
              if (hasTitle) {
                const [title, content] = section.split(':');
                return (
                  <div key={index} className="mb-6 last:mb-0">
                    <h4 className="font-semibold text-blue-700 mb-2">{title}:</h4>
                    <div className="pl-4 border-l-2 border-blue-100">
                      {content.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2 last:mb-0 text-gray-700">
                          {line.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              } else {
                return (
                  <p key={index} className="mb-4 last:mb-0 text-gray-700">
                    {section}
                  </p>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};