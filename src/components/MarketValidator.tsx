import * as React from 'react';
import { useState, FormEvent } from 'react';

interface MarketResult {
  score: number;
  competitors: string[];
  trends: string[];
}

const MarketValidator: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [result, setResult] = useState<MarketResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Mock API call to backend (replace with your endpoint)
      const response = await fetch('/api/validate-market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data: MarketResult = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to validate idea. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Validator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
            Your Startup Idea
          </label>
          <input
            type="text"
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., AI-powered tutoring platform"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Validate Idea'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800">Market Insights</h3>
          <p className="mt-2 text-gray-600">
            <strong>Viability Score:</strong> {result.score}/100
          </p>
          <p className="mt-2 text-gray-600">
            <strong>Top Competitors:</strong>{' '}
            {result.competitors?.join(', ') || 'None identified'}
          </p>
          <p className="mt-2 text-gray-600">
            <strong>Market Trends:</strong>{' '}
            {result.trends?.join('; ') || 'No trends available'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketValidator;