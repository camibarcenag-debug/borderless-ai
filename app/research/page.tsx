'use client';

import { useState, useEffect } from 'react';

interface Competitor {
  nombre: string;
  tipo: string;
  usuario: string;
  idioma: string;
  especifico_comercio: string;
  precio: string;
  brecha: string;
}

interface Benchmark {
  nombre: string;
  pais: string;
  que_hace: string;
  que_aprende_borderless: string;
}

interface Risk {
  nivel: string;
  descripcion: string;
  escenario: string;
  mitigacion: string;
}

interface ResearchOutput {
  validacion_problema: string;
  clarificacion_usuario: string;
  benchmarks_globales: Benchmark[];
  localizacion_mexico: { que_transfiere: string; que_no_transfiere: string };
  competidores: Competitor[];
  brecha_oportunidad: string;
  mapa_riesgos: Risk[];
  recomendacion: string;
}

interface SavedRecord {
  id: string;
  created_at: string;
  venture_idea: string;
  output_json: ResearchOutput;
}

export default function ResearchPage() {
  const [ventureIdea, setVentureIdea] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [problem, setProblem] = useState('');
  const [outputData, setOutputData] = useState<ResearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [savedRecords, setSavedRecords] = useState<SavedRecord[]>([]);

  useEffect(() => {
    fetch('/api/research-examples')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSavedRecords(data); });
  }, []);

  const handleSubmit = async () => {
    if (!ventureIdea || !targetUser || !problem) return;
    setIsLoading(true);
    setError(null);
    setOutputData(null);
    setSaved(false);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ venture_idea: ventureIdea, target_user: targetUser, problem }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutputData(data);
    } catch (e: any) {
      setError(e.message || 'Error al procesar. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!outputData) return;
    setIsSaving(true);
    try {
      await fetch('/api/save-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venture_idea: ventureIdea,
          target_user: targetUser,
          problem_input: problem,
          output_json: outputData,
        }),
      });
      setSaved(true);
      const res = await fetch('/api/research-examples');
      const data = await res.json();
      if (Array.isArray(data)) setSavedRecords(data);
    } catch {
      setError('Error al guardar.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCompetitors = outputData?.competidores?.filter(c =>
    JSON.stringify(c).toLowerCase().includes(search.toLowerCase())
  ) || [];

  const riskColor = (nivel: string) => {
    if (nivel === 'ALTO') return 'bg-red-900/40 text-red-300 border-red-700';
    if (nivel === 'MEDIO') return 'bg-orange-900/40 text-orange-300 border-orange-700';
    return 'bg-green-900/40 text-green-300 border-green-700';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* HEADER */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-white font-bold text-lg">Borderless AI</span>
          <span className="text-gray-500 text-sm ml-3">Investigación y Benchmarking · Camila Bárcena</span>
        </div>
        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">
          Capítulo 6 Seleccionado
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* INTAKE FORM */}
        <section>
          <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
            Agente de Investigación y Benchmarking
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <label className="text-orange-400 font-mono text-xs uppercase tracking-wider block mb-1">
                Idea de negocio
              </label>
              <input
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="Ej. Borderless — traducción de documentos comerciales para PYMES mexicanas"
                value={ventureIdea}
                onChange={e => setVentureIdea(e.target.value)}
              />
            </div>
            <div>
              <label className="text-orange-400 font-mono text-xs uppercase tracking-wider block mb-1">
                Usuario objetivo
              </label>
              <input
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="Ej. Dueño de PYME mexicana que importa materias primas de China"
                value={targetUser}
                onChange={e => setTargetUser(e.target.value)}
              />
            </div>
            <div>
              <label className="text-orange-400 font-mono text-xs uppercase tracking-wider block mb-1">
                Descripción del problema
              </label>
              <textarea
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 h-24 resize-none"
                placeholder="Ej. Cada contrato llega en inglés y no puedo entenderlo sin pagar un traductor costoso..."
                value={problem}
                onChange={e => setProblem(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !ventureIdea || !targetUser || !problem}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded text-sm transition-colors"
            >
              {isLoading ? 'Analizando...' : 'Analizar mercado →'}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        </section>

        {/* OUTPUT */}
        {outputData && (
          <>
            {/* VALIDACION + USUARIO */}
            <section className="grid grid-cols-2 gap-4">
              {[
                { label: 'Validación del problema', value: outputData.validacion_problema },
                { label: 'Clarificación del usuario', value: outputData.clarificacion_usuario },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <p className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-2">{label}</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </section>

            {/* BENCHMARKS */}
            <section>
              <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                Benchmarks Globales
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {outputData.benchmarks_globales?.map((b, i) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-sm">{b.nombre}</span>
                      <span className="text-orange-400 font-mono text-xs bg-orange-500/10 px-2 py-0.5 rounded">{b.pais}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2"><span className="text-gray-500 uppercase tracking-wider">Qué hace: </span>{b.que_hace}</p>
                    <p className="text-gray-300 text-xs"><span className="text-orange-400 uppercase tracking-wider font-mono">Borderless aprende: </span>{b.que_aprende_borderless}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* LOCALIZACION MEXICO */}
            <section>
              <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                Localización México
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 border border-green-800/40 rounded-lg p-5">
                  <p className="text-green-400 font-mono text-xs uppercase tracking-widest mb-2">✓ Qué transfiere</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{outputData.localizacion_mexico?.que_transfiere}</p>
                </div>
                <div className="bg-gray-900 border border-red-800/40 rounded-lg p-5">
                  <p className="text-red-400 font-mono text-xs uppercase tracking-widest mb-2">✗ Qué no transfiere</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{outputData.localizacion_mexico?.que_no_transfiere}</p>
                </div>
              </div>
            </section>

            {/* COMPETITORS TABLE */}
            <section>
              <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                Competidores y Sustitutos
              </h2>
              <input
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 mb-4"
                placeholder="Buscar competidor..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="overflow-x-auto border border-gray-800 rounded-lg">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-900 border-b border-gray-800">
                      {['Nombre', 'Tipo', 'Usuario', 'Idioma', 'Comercio', 'Precio', 'Brecha para Borderless'].map(h => (
                        <th key={h} className="text-orange-400 font-mono text-xs uppercase tracking-wider px-4 py-3 text-left whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompetitors.map((c, i) => (
                      <tr key={i} className={`border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/50'}`}>
                        <td className="px-4 py-3 text-white font-medium">{c.nombre}</td>
                        <td className="px-4 py-3 text-gray-400">{c.tipo}</td>
                        <td className="px-4 py-3 text-gray-400">{c.usuario}</td>
                        <td className="px-4 py-3 text-gray-400">{c.idioma}</td>
                        <td className="px-4 py-3 text-gray-400">{c.especifico_comercio}</td>
                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{c.precio}</td>
                        <td className="px-4 py-3 text-gray-300 text-xs">{c.brecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* OPORTUNIDAD */}
            <section>
              <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                Brecha de Oportunidad
              </h2>
              <div className="bg-gray-900 border-l-4 border-orange-500 rounded-lg p-6">
                <p className="text-gray-200 text-sm leading-relaxed">{outputData.brecha_oportunidad}</p>
              </div>
            </section>

            {/* RISK MAP */}
            <section>
              <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                Mapa de Riesgos
              </h2>
              <div className="space-y-3">
                {outputData.mapa_riesgos?.map((r, i) => (
                  <div key={i} className={`border rounded-lg p-4 ${riskColor(r.nivel)}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-xs font-mono uppercase tracking-wider">{r.nivel}</span>
                      <span className="font-medium text-sm">{r.descripcion}</span>
                    </div>
                    <p className="text-xs opacity-80 mb-1"><span className="uppercase tracking-wider font-mono">Escenario: </span>{r.escenario}</p>
                    <p className="text-xs opacity-80"><span className="uppercase tracking-wider font-mono">Mitigación: </span>{r.mitigacion}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RECOMENDACION */}
            <section>
              <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                Recomendación
              </h2>
              <div className="bg-gray-900 border border-orange-500/30 rounded-lg p-6">
                <p className="text-gray-200 text-sm leading-relaxed">{outputData.recomendacion}</p>
              </div>
            </section>

            {/* SAVE BUTTON */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving || saved}
                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded text-sm border border-gray-700 transition-colors"
              >
                {isSaving ? 'Guardando...' : saved ? 'Guardado ✓' : 'Guardar investigación ↓'}
              </button>
            </div>
          </>
        )}

        {/* SAVED RECORDS */}
        {savedRecords.length > 0 && (
          <section>
            <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
              Investigaciones Guardadas
            </h2>
            <div className="space-y-3">
              {savedRecords.map(r => (
                <div key={r.id} className="bg-gray-900 border border-gray-800 rounded-lg px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{r.venture_idea?.slice(0, 80)}...</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(r.created_at).toLocaleString('es-MX')}</p>
                  </div>
                  <span className="text-orange-400 text-xs font-mono bg-orange-500/10 px-2 py-1 rounded">Guardado</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
