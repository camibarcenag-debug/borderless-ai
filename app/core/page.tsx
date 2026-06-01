'use client';

import { useState } from 'react';
import SavedOutputs from '../components/SavedOutputs';

const chapters = [
  { num: 1, title: 'The Invisible Leak', problem: 'Mexico loses 40-50% of urban water through undetected pipe leaks', user: 'Municipal utility staff', slice: 'AI translates sensor data into plain maintenance alerts', tech: 'Anomaly Detection + NLG', pays: 'Municipalities · CONAGUA', risk: 'False negatives: AI misses real leaks' },
  { num: 2, title: 'The Report Nobody Reads', problem: 'Rural clinics receive lab results staff cannot interpret without a specialist', user: 'Rural nurses and doctors', slice: 'AI translates medical reports into plain summaries', tech: 'Medical NLP + Edge AI', pays: 'IMSS · Clinics', risk: 'Mistranslation leads to wrong treatment' },
  { num: 3, title: "What's in the Truck", problem: 'Food supply chain has minimal traceability — contamination found after outbreak', user: 'Supermarket procurement officers', slice: 'AI translates supplier docs into unified risk score', tech: 'Document AI + Risk Classification', pays: 'Retail chains · Distributors', risk: 'Suppliers game the risk model' },
  { num: 4, title: "The Venue That Couldn't Read Its Numbers", problem: 'Local music venues closing due to financial mismanagement', user: 'Independent venue owners', slice: 'AI translates operations complexity into plain financial dashboard', tech: 'Business Doc AI + NLG', pays: 'Venue owners · FONCA', risk: 'Homogenizes programming decisions' },
  { num: 5, title: 'The Rural Teacher With No Colleague', problem: 'Rural teachers work in isolation with no mentorship or peer feedback', user: 'Rural teachers only', slice: 'AI acts as professional peer and reviews lesson plans', tech: 'Conversational AI + Pedagogical Feedback', pays: 'SEP · EdTech NGOs', risk: 'Teachers become AI-dependent' },
  { num: 6, title: 'Borderless', problem: 'Mexican SMEs lose international deals because global commerce is in English or Mandarin', user: 'Mexican SME owners importing or exporting', slice: 'AI removes English barrier and translates contracts and supplier docs in real time', tech: 'Multilingual LLMs + Business Language AI', pays: 'Export agencies · Banks · SME owners', risk: 'Mistranslated contracts create legal liability' },
  { num: 7, title: 'The Aquifer Nobody Was Watching', problem: 'Agricultural sector uses 76% of national water with minimal feedback on depletion', user: 'Agricultural cooperative managers', slice: 'AI translates satellite data into seasonal water-budget alerts', tech: 'Remote Sensing + Report Generation', pays: 'Cooperatives · SAGARPA', risk: 'Bad satellite data accelerates depletion' },
  { num: 8, title: 'The Waiting Room Algorithm', problem: 'Public hospitals suffer scheduling inefficiencies due to poor demand forecasting', user: 'Hospital operations managers', slice: 'AI translates patient flow history into plain staffing recommendations', tech: 'Predictive Modeling + Recommendation AI', pays: 'IMSS · ISSSTE · Private hospitals', risk: 'Deprioritizes complex or elderly patients' },
  { num: 9, title: 'The Label Nobody Understood', problem: 'School cafeteria managers buy unhealthy food because nutritional labels are confusing', user: 'School nutrition coordinators', slice: 'AI translates nutritional data into plain health impact summaries', tech: 'Nutritional AI + Food Databases', pays: 'SEP · Private school networks', risk: 'Displaces regional food cultures' },
  { num: 10, title: 'The Fine Nobody Saw Coming', problem: 'SMEs fail environmental compliance because regulations are written for lawyers', user: 'SME managers and municipal offices', slice: 'AI translates SEMARNAT regulations into plain compliance checklists', tech: 'Regulatory Doc AI + Checklist Generation', pays: 'Industrial SMEs · Consultants', risk: 'Creates false confidence of full compliance' },
];

const FIELDS = [
  { key: 'problem', label: 'Problem' },
  { key: 'user', label: 'Target User' },
  { key: 'slice', label: 'Slice' },
  { key: 'ai_pattern', label: 'AI Pattern' },
  { key: 'value_created', label: 'Value Created' },
  { key: 'core_principles', label: 'Core Principles' },
  { key: 'use_cases', label: 'Use Cases' },
  { key: 'venture_direction', label: 'Venture Direction' },
  { key: 'business_logic', label: 'Business Logic' },
  { key: 'risk', label: 'Risk' },
];

export default function CorePage() {
  const [documentText, setDocumentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      setError('Please paste a trade document first.');
      return;
    }
    setLoading(true);
    setError('');
    setOutput(null);
    setSaved(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: documentText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Analysis failed. Please try again.');
        setLoading(false);
        return;
      }

      setOutput(data);
    } catch {
      setError('Error connecting to the API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!output) return;
    setSaving(true);

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input_text: documentText,
          output_json: output,
          venture_name: 'Borderless',
        }),
      });

      if (response.ok) {
        setSaved(true);
      } else {
        setError('Save failed. Please try again.');
      }
    } catch {
      setError('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* HEADER */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-orange-500 text-xs font-mono tracking-widest mb-1">AI-101 · WEEK 1 · SELECTED VENTURE</p>
            <h1 className="text-3xl font-bold text-white">Borderless</h1>
            <p className="text-gray-400 text-sm mt-1">AI Trade Co-Pilot for Mexican SMEs · Camila Bárcena</p>
          </div>
          <div>
            <span className="bg-orange-500 text-white text-xs font-mono px-4 py-2 rounded-full">Chapter 6 Selected</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* 10-CHAPTER ARCHITECTURE TABLE */}
        <div>
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">10-CHAPTER ARCHITECTURE</p>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-900">
                  {['#', 'Title', 'Problem', 'User', 'Slice', 'Technology', 'Who Pays', 'Risk'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-orange-400 font-mono text-xs tracking-wider whitespace-nowrap border-r border-gray-800 last:border-r-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chapters.map((ch) => (
                  <tr key={ch.num} className={ch.num === 6 ? 'bg-orange-950/40 border-y-2 border-orange-500' : 'border-b border-gray-800 hover:bg-gray-900/50'}>
                    <td className={`px-4 py-3 font-bold border-r border-gray-800 ${ch.num === 6 ? 'text-orange-400' : 'text-gray-400'}`}>{ch.num}</td>
                    <td className="px-4 py-3 font-medium text-white border-r border-gray-800 whitespace-nowrap">
                      {ch.title}
                      {ch.num === 6 && <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded font-mono">SELECTED</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-300 border-r border-gray-800 min-w-48">{ch.problem}</td>
                    <td className="px-4 py-3 text-gray-300 border-r border-gray-800 whitespace-nowrap">{ch.user}</td>
                    <td className="px-4 py-3 text-gray-300 border-r border-gray-800 min-w-48">{ch.slice}</td>
                    <td className="px-4 py-3 text-gray-300 border-r border-gray-800 whitespace-nowrap">{ch.tech}</td>
                    <td className="px-4 py-3 text-blue-300 border-r border-gray-800 whitespace-nowrap">{ch.pays}</td>
                    <td className="px-4 py-3 text-red-300 min-w-40">{ch.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SELECTED VENTURE CARD */}
        <div>
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">SELECTED VENTURE · CHAPTER 6</p>
          <div className="border border-orange-500/40 border-l-4 border-l-orange-500 rounded-xl p-6 bg-orange-950/10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Borderless <span className="text-orange-400">— Chapter 6</span></h2>
              <span className="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-mono px-3 py-1 rounded-full">Active Venture</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Problem', value: 'Mexican SME owners lose international deals because global commerce happens in English or Mandarin — not Spanish.' },
                { label: 'User', value: 'Mexican SME owner (1–50 employees) importing or exporting. No budget for a full-time translator.' },
                { label: 'AI Slice', value: 'Multilingual LLM translates contracts, supplier docs, and trade communications into actionable Spanish.' },
                { label: 'Who Pays', value: 'Export agencies · Banks serving exporters · SME owners directly' },
                { label: 'Impact', value: 'Expands global market access for thousands of Mexican SMEs' },
                { label: 'Risk', value: 'Mistranslated contract terms create legal and financial liability' },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-orange-500 text-xs font-mono tracking-wider mb-1">{f.label.toUpperCase()}</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INPUT AREA */}
        <div>
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">TRY IT · PASTE YOUR TRADE DOCUMENT</p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <textarea
              className="w-full bg-gray-950 border border-gray-700 rounded-lg p-4 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500 min-h-36 resize-none"
              placeholder="Paste your English supplier contract, shipping terms, negotiation email, or platform onboarding document here..."
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
            />
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                {loading ? 'Analyzing...' : 'Analyze Document →'}
              </button>
              <span className="text-gray-600 text-xs font-mono">Powered by Claude claude-sonnet-4-6</span>
            </div>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>
        </div>

        {/* OUTPUT CARD */}
        {output && (
          <div>
            <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">GENERATIVE CORE OUTPUT</p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="bg-gray-950 border-b border-gray-800 px-6 py-3 flex justify-between items-center">
                <span className="text-gray-400 text-xs font-mono">Output · Borderless · Chapter 6</span>
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className="bg-orange-500/20 border border-orange-500/40 hover:bg-orange-500/30 disabled:opacity-50 text-orange-400 text-xs font-mono px-4 py-1.5 rounded-lg transition-colors"
                >
                  {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save to Supabase ↓'}
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {FIELDS.map((f) => (
                  <div key={f.key} className="border-l-2 border-orange-500 pl-4">
                    <p className="text-orange-500 text-xs font-mono tracking-wider mb-2">{f.label.toUpperCase()}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{output[f.key] || 'Not available'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    <SavedOutputs />
      <div className='max-w-5xl mx-auto px-6 pb-12'>
        <div className='border border-orange-500/20 rounded-xl overflow-hidden'>
          <div className='bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block'></span>
              <span className='text-orange-400 font-mono text-xs tracking-widest uppercase'>Week 2 — Research + Benchmarking Agent</span>
            </div>
            <span className='text-gray-500 font-mono text-xs'>Live</span>
          </div>
          <div className='bg-gray-950 p-6 grid grid-cols-3 gap-4'>
            <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
              <p className='text-orange-400 font-mono text-xs uppercase tracking-wider mb-1'>Competitors Mapped</p>
              <p className='text-white text-2xl font-bold'>12</p>
              <p className='text-gray-500 text-xs mt-1'>0 serve Spanish-speaking SMEs</p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
              <p className='text-orange-400 font-mono text-xs uppercase tracking-wider mb-1'>Global Benchmarks</p>
              <p className='text-white text-2xl font-bold'>5</p>
              <p className='text-gray-500 text-xs mt-1'>Stripe · Faire · Kompass · QuickBooks · AlphaSense</p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
              <p className='text-orange-400 font-mono text-xs uppercase tracking-wider mb-1'>Opportunity Gap</p>
              <p className='text-white text-2xl font-bold'>500K+</p>
              <p className='text-gray-500 text-xs mt-1'>Mexican SMEs unserved</p>
            </div>
          </div>
          <div className='bg-gray-900 border-t border-gray-800 px-6 py-4 flex items-center justify-between'>
            <p className='text-gray-400 text-sm'>Research + Benchmarking Agent — fully deployed and operational</p>
            <a href='/research' className='bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors'>Open Research Agent →</a>
          </div>
        </div>
      </div>
      </div>
  );
}

      <div className='max-w-5xl mx-auto px-6 pb-12'>
        <div className='border border-orange-500/20 rounded-xl overflow-hidden'>
          <div className='bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block'></span>
              <span className='text-orange-400 font-mono text-xs tracking-widest uppercase'>Week 2 — Research + Benchmarking Agent</span>
            </div>
            <span className='text-gray-500 font-mono text-xs'>Live</span>
          </div>
          <div className='bg-gray-950 p-6 grid grid-cols-3 gap-4'>
            <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
              <p className='text-orange-400 font-mono text-xs uppercase tracking-wider mb-1'>Competitors Mapped</p>
              <p className='text-white text-2xl font-bold'>12</p>
              <p className='text-gray-500 text-xs mt-1'>0 serve Spanish-speaking SMEs</p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
              <p className='text-orange-400 font-mono text-xs uppercase tracking-wider mb-1'>Global Benchmarks</p>
              <p className='text-white text-2xl font-bold'>5</p>
              <p className='text-gray-500 text-xs mt-1'>Stripe · Faire · Kompass · QuickBooks · AlphaSense</p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
              <p className='text-orange-400 font-mono text-xs uppercase tracking-wider mb-1'>Opportunity Gap</p>
              <p className='text-white text-2xl font-bold'>500K+</p>
              <p className='text-gray-500 text-xs mt-1'>Mexican SMEs unserved</p>
            </div>
          </div>
          <div className='bg-gray-900 border-t border-gray-800 px-6 py-4 flex items-center justify-between'>
            <p className='text-gray-400 text-sm'>Research + Benchmarking Agent — fully deployed and operational</p>
            <a href='/research' className='bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors'>Open Research Agent →</a>
          </div>
        </div>
      </div>
