'use client';

import { useState, useEffect } from 'react';

export default function SavedOutputs() {
  const [examples, setExamples] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/examples')
      .then(r => r.json())
      .then(data => setExamples(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  if (!examples.length) return null;

  return (
    <div>
      <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">SAVED OUTPUTS · DASHBOARD</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {examples.map((ex, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-orange-500 text-xs font-mono mb-2">
              TEST RUN {i + 1} · {new Date(ex.created_at).toLocaleTimeString()}
            </p>
            <p className="text-white text-sm font-medium mb-2">{ex.venture_name || 'Borderless'}</p>
            <p className="text-gray-400 text-xs mb-3">
              {ex.input_document ? ex.input_document.substring(0, 80) + '...' : 'Trade document analyzed'}
            </p>
            <div className="border-t border-gray-800 pt-3">
              <p className="text-gray-500 text-xs font-mono mb-1">PROBLEM</p>
              <p className="text-gray-300 text-xs">{ex.problem ? ex.problem.substring(0, 100) + '...' : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
