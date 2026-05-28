'use client';

import { useState, useEffect } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function SavedOutputs() {
  const [examples, setExamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExamples = async () => {
    setLoading(true);
    setError('');
    try {
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        setError('Supabase credentials missing');
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/core_outputs?select=*&order=created_at.desc&limit=5`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error('Supabase error:', errText);
        setError('Could not load saved outputs');
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('✅ Loaded', data.length, 'saved outputs');
      setExamples(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error loading saved outputs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamples();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-mono text-gray-500 tracking-widest">
          SAVED OUTPUTS · DASHBOARD · {examples.length} RESULTS
        </p>
        <button
          onClick={fetchExamples}
          className="text-orange-500 text-xs font-mono border border-orange-500/30 px-3 py-1 rounded hover:bg-orange-500/10"
        >
          Refresh ↻
        </button>
      </div>

      {loading && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-500 text-sm">Loading saved outputs...</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-gray-900 border border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={fetchExamples} className="text-orange-500 text-xs mt-2 underline">Try again</button>
        </div>
      )}

      {!loading && !error && examples.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-500 text-sm">No saved outputs yet. Analyze a document and click Save to Supabase.</p>
        </div>
      )}

      {!loading && !error && examples.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((ex, i) => (
            <div key={ex.id || i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <p className="text-orange-500 text-xs font-mono">TEST RUN {i + 1}</p>
                <p className="text-gray-600 text-xs">{new Date(ex.created_at).toLocaleDateString()}</p>
              </div>
              <p className="text-white text-sm font-medium mb-2">{ex.venture_name || 'Borderless'}</p>
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                {ex.input_document ? ex.input_document.substring(0, 100) + '...' : 'Trade document analyzed'}
              </p>
              <div className="border-t border-gray-800 pt-3 space-y-2">
                <div>
                  <p className="text-gray-600 text-xs font-mono mb-1">PROBLEM</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {ex.problem ? ex.problem.substring(0, 100) + '...' : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-mono mb-1">RISK</p>
                  <p className="text-red-300 text-xs leading-relaxed">
                    {ex.risk ? ex.risk.substring(0, 80) + '...' : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
