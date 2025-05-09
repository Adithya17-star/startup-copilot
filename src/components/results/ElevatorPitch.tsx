import * as React from 'react';
import { useState } from 'react';
import { RefreshCw, Edit2 } from 'lucide-react';
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

  // Format the pitch paragraphs
  const paragraphs = pitch.split('\n\n').filter(p => p.trim());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Elevator Pitch</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => regenerateSection('elevatorPitch')}
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
              value={editedPitch}
              onChange={(e) => setEditedPitch(e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your elevator pitch here..."
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
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};