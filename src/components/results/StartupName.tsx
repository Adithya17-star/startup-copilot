import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2 } from 'lucide-react';
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
  const [editedName, setEditedName] = useState(name.name);
  const [editedTagline, setEditedTagline] = useState(name.tagline);

  const handleSave = () => {
    updateSection('name', {
      name: editedName,
      tagline: editedTagline
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Startup Name & Tagline</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('name')}
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
            <div>
              <label htmlFor="startup-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="startup-name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="startup-tagline" className="block text-sm font-medium text-gray-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                id="startup-tagline"
                value={editedTagline}
                onChange={(e) => setEditedTagline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          <div className="text-center py-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
              {name.name}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-30 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg italic">{name.tagline}</p>
          </div>
        )}
      </div>
    </div>
  );
};