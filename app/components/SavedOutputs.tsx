'use client';

import { useState, useEffect } from 'react';

export default function SavedOutputs() {
  const [examples, setExamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, '');
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        
        const response = await fetch(
          `${supabaseUrl}/rest/v1/core_outputs?select=*&order=created_at.desc&limit=5`,
          {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
          }
        );
        
        const data = await response.json();
        console.log('✅ Saved outputs fetched:', data.length);
        setExamples(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('❌ Error fetching examples:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []);

  if (loading) return (
    <div>
      <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">SAVED OUTPUTS · DASHBOARD</p>
      <p className="text-gray-600 text-sm">Loading saved outputs...</p>
    </div>
  );

  if (!examples.length) return (
    <div>
      <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">SAVED OUTPUTS · DASHBOARD</p>
      <p className="text-gray-600 text-sm">No saved outputs yet. Analyze a document and click Save.</p>
    </div>
  );

  return (
    <div>
      <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">SAVED OUTPUTS · DASHBOARD</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {examples.map((ex, i) => (
          <div key={ex.id || i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-orange-500 text-xs font-mono mb-2">
              TEST RUN {i + 1} · {new Date(ex.created_at).toLocaleDateString()}
            </p>
            <p className="text-white text-sm font-medium mb-2">{ex.venture_name || 'Borderless'}</p>
            <p className="text-gray-400 text-xs mb-3">
              {ex.input_document ? ex.input_document.substring(0, 80) + '...' : 'Trade document analyzed'}
            </p>
            <div className="border-t border-gray-800 pt-3">
              <p className="text-gray-500 text-xs font-mono mb-1">PROBLEM</p>
              <p className="text-gray-300 text-xs leading-relaxed">
                {ex.problem ? ex.problem.substring(0, 120) + '...' : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
