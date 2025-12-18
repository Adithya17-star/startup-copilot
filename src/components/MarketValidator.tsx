import * as React from 'react';
import { useState, FormEvent } from 'react';
import { validateMarketIdea } from '../services/generationService';
import { Activity, TrendingUp, Users } from 'lucide-react';

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
    if (!idea.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Use the simulated service instead of the broken fetch
      const data = await validateMarketIdea(idea);
      setResult(data);
    } catch (err) {
      setError('Failed to validate idea. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="h-6 w-6 text-indigo-400" />
        <h2 className="text-2xl font-bold text-white">AI Market Validator</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="market-idea" className="block text-sm font-medium text-gray-300 mb-1">
            Test a specific angle or feature
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="market-idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., Subscription model for pet sitting"
              className="flex-1 p-3 bg-slate-800/50 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
            >
              {loading ? 'Analyzing...' : 'Validate'}
            </button>
          </div>
        </div>
      </form>

      {error && <p className="mt-4 text-red-400 bg-red-900/20 p-3 rounded-md border border-red-900/50">{error}</p>}

      {result && (
        <div className="mt-8 animate-fade-in space-y-6">
          <div className="bg-indigo-900/30 p-6 rounded-xl border border-indigo-500/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-indigo-200">Viability Score</h3>
              <span className={`text-2xl font-bold ${result.score > 80 ? 'text-green-400' : 'text-indigo-400'}`}>
                {result.score}/100
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div 
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3 text-gray-200 font-semibold">
                <Users className="h-4 w-4 text-blue-400" />
                <h3>Potential Competitors</h3>
              </div>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {result.competitors.map((comp, i) => <li key={i}>{comp}</li>)}
              </ul>
            </div>
            
            <div className="bg-slate-800/50 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3 text-gray-200 font-semibold">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <h3>Market Trends</h3>
              </div>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {result.trends.map((trend, i) => <li key={i}>{trend}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketValidator;
