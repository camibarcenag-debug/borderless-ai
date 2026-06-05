"use client";
import { useState, useEffect } from "react";

type SK = "Conservador" | "Esperado" | "Agresivo";

interface SavedScenario {
  id: number;
  scenario: string;
  profesional: number;
  empresa: number;
  convRate: number;
  churnRate: number;
  mrr: number;
  arr: number;
  churnAdj: number;
  savedAt: string;
}

const assumptions = [
  { input: "Visitantes mensuales", value: "1,500", rationale: "Estimado con SEO y referidos en primeros 6 meses" },
  { input: "Signup freemium", value: "20% de visitantes", rationale: "Benchmark SaaS B2B latinoamerica" },
  { input: "Conversion a Profesional", value: "6% base", rationale: "Ajustado por escenario seleccionado" },
  { input: "Precio Profesional", value: "$29/mes", rationale: "Dentro del presupuesto tecnologico de PYME" },
  { input: "Precio Empresa", value: "$99/mes", rationale: "Valor por multiples usuarios y soporte dedicado" },
  { input: "Churn mensual Profesional", value: "5% base", rationale: "Meta reducir a 3% en mes 12" },
  { input: "Churn mensual Empresa", value: "2.5% base", rationale: "Clientes mas comprometidos, mayor LTV" },
];

const INITIAL_SAVED: SavedScenario[] = [
  { id: 0, scenario: "Esperado", profesional: 18, empresa: 3, convRate: 6, churnRate: 5, mrr: 819, arr: 9828, churnAdj: 778, savedAt: "2026-05-25 Mes 6 documentado" },
];

const recs: Record<SK, { title: string; points: string[] }> = {
  Conservador: {
    title: "Enfocarse en retener los primeros 10 clientes Profesional antes de escalar.",
    points: [
      "Con conversion del 3%, cada cliente cuesta mas — prioriza referidos sobre ads pagados.",
      "El churn del 8% es la amenaza principal: implementa onboarding personalizado desde el dia 1.",
      "No lances Empresa todavia — valida el valor con PYME Exportadora primero.",
      "Meta realista mes 6: $290 MRR. Suficiente para probar el modelo.",
    ],
  },
  Esperado: {
    title: "El tier Profesional a $29 es tu motor principal — protegelo y optimizalo.",
    points: [
      "Con 18 usuarios Profesional y 3 Empresa llegas a $819 MRR en mes 6. Es viable.",
      "La conversion del 6% requiere onboarding claro: el usuario debe ver valor en 5 minutos.",
      "El churn del 5% se controla con recordatorios de uso y casos de exito en espanol.",
      "Siguiente palanca: subir Empresa de 3 a 6 clientes duplica el ingreso de ese tier.",
    ],
  },
  Agresivo: {
    title: "El escenario Agresivo es posible solo con un canal de adquisicion activo.",
    points: [
      "Conversion del 10% requiere prueba social: testimonios de PYMES reales en la landing.",
      "Churn del 3% solo se logra con producto muy pegajoso — el historial guardado es clave.",
      "Considera un programa de referidos: cada cliente puede traer 2 mas en este mercado.",
      "Si llegas a $2,400 MRR en mes 6, tienes evidencia para levantar capital o expandir.",
    ],
  },
};

export default function PricingPage() {
  const [scenario, setScenario] = useState<SK>("Esperado");
  const [profesional, setProfesional] = useState(18);
  const [empresa, setEmpresa] = useState(3);
  const [convRate, setConvRate] = useState(6);
  const [churnRate, setChurnRate] = useState(5);
  const [mrr, setMrr] = useState(0);
  const [arr, setArr] = useState(0);
  const [churnAdj, setChurnAdj] = useState(0);
  const [saved, setSaved] = useState<SavedScenario[]>(INITIAL_SAVED);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    const calcMrr = Math.round((profesional * 29) + (empresa * 99));
    setMrr(calcMrr);
    setArr(calcMrr * 12);
    setChurnAdj(Math.round(calcMrr * (1 - churnRate / 100)));
  }, [profesional, empresa, convRate, churnRate, scenario]);

  const applyScenario = (s: SK) => {
    setScenario(s);
    if (s === "Conservador") { setConvRate(3); setChurnRate(8); }
    if (s === "Esperado") { setConvRate(6); setChurnRate(5); }
    if (s === "Agresivo") { setConvRate(10); setChurnRate(3); }
  };

  const saveScenario = () => {
    const now = new Date();
    const label = now.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }) + " " + now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
    setSaved((prev) => [{ id: Date.now(), scenario, profesional, empresa, convRate, churnRate, mrr, arr, churnAdj, savedAt: label }, ...prev].slice(0, 5));
    setSaveMsg("Escenario guardado correctamente");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const rec = recs[scenario];

  return (
    <main className="min-h-screen bg-[#111111] text-gray-100 font-mono">
      <div className="border-b border-gray-800 px-8 py-5 flex items-center gap-3">
        <span className="text-orange-500 font-bold tracking-widest text-sm">BORDERLESS AI</span>
        <span className="text-gray-600">·</span>
        <span className="text-gray-400 text-sm tracking-widest">SIMULADOR DE PRECIOS</span>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="border border-yellow-800 bg-yellow-900/10 rounded p-5 mb-10">
          <p className="text-yellow-400 text-xs tracking-widest uppercase mb-2">Riesgos del modelo de negocio</p>
          <ul className="space-y-1">
            <li className="text-yellow-300 text-sm flex gap-2"><span>›</span>Alucinaciones de IA en clausulas legales — siempre revisar con especialista antes de firmar.</li>
            <li className="text-yellow-300 text-sm flex gap-2"><span>›</span>Tier Explorador muy generoso puede reducir conversiones a Profesional.</li>
            <li className="text-yellow-300 text-sm flex gap-2"><span>›</span>Adopcion SaaS con tarjeta es menor en Mexico — planear SPEI y OXXO en siguiente fase.</li>
            <li className="text-yellow-300 text-sm flex gap-2"><span>›</span>Documentos muy largos pueden degradar la calidad del analisis.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-orange-500 text-xs tracking-widest uppercase mb-6">Parametros</p>
            <div className="mb-8">
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-3 block">Escenario</label>
              <div className="flex gap-2">
                {(["Conservador", "Esperado", "Agresivo"] as SK[]).map((s) => (
                  <button key={s} onClick={() => applyScenario(s)}
                    className={"flex-1 py-2 text-xs rounded border transition-all " + (scenario === s ? "border-orange-500 text-orange-400 bg-orange-900/20" : "border-gray-700 text-gray-500 hover:border-gray-500")}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Usuarios Profesional a $29 por mes</label>
                <input type="number" min={0} value={profesional} onChange={(e) => setProfesional(Number(e.target.value))}
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded text-sm focus:border-orange-500 outline-none" />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Usuarios Empresa a $99 por mes</label>
                <input type="number" min={0} value={empresa} onChange={(e) => setEmpresa(Number(e.target.value))}
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded text-sm focus:border-orange-500 outline-none" />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Tasa de conversion freemium a pago: {convRate}%</label>
                <input type="range" min={1} max={30} step={1} value={convRate} onChange={(e) => setConvRate(Number(e.target.value))} className="w-full accent-orange-500" />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Churn mensual: {churnRate}%</label>
                <input type="range" min={1} max={20} step={1} value={churnRate} onChange={(e) => setChurnRate(Number(e.target.value))} className="w-full accent-orange-500" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-orange-500 text-xs tracking-widest uppercase mb-6">Proyeccion — Escenario {scenario}</p>
            <div className="space-y-4">
              <div className="border border-orange-700 bg-[#1a1a1a] rounded p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">MRR</p>
                <p className="text-4xl font-bold text-orange-400">${mrr.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">ingresos mensuales recurrentes</p>
              </div>
              <div className="border border-gray-700 bg-[#1a1a1a] rounded p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">ARR</p>
                <p className="text-3xl font-bold text-white">${arr.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">ingresos anuales recurrentes</p>
              </div>
              <div className="border border-gray-700 bg-[#1a1a1a] rounded p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">MRR ajustado por churn</p>
                <p className="text-2xl font-bold text-gray-300">${churnAdj.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">despues de cancelaciones</p>
              </div>
              <div className="border border-gray-700 bg-[#1a1a1a] rounded p-4 text-xs text-gray-500">
                <p>MRR = (Profesional x $29) + (Empresa x $99)</p>
                <p>ARR = MRR x 12 | Churn-adj = MRR x (1 - churn%)</p>
              </div>
              <button onClick={saveScenario}
                className="w-full border border-orange-700 text-orange-400 hover:bg-orange-900/20 py-3 rounded text-sm font-bold tracking-widest transition-all">
                GUARDAR ESTE ESCENARIO
              </button>
              {saveMsg && (
                <div className="border border-green-700 bg-green-900/20 rounded p-3 text-center">
                  <p className="text-green-400 text-sm">{saveMsg}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border border-orange-700 bg-orange-900/10 rounded p-6">
          <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Recomendacion — Escenario {scenario}</p>
          <p className="text-white text-sm font-bold mb-4">{rec.title}</p>
          <ul className="space-y-2">
            {rec.points.map((point, i) => (
              <li key={i} className="text-gray-300 text-sm flex gap-2">
                <span className="text-orange-500 mt-0.5">›</span>{point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 mb-10">
          <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Supuestos</p>
          <h2 className="text-2xl font-light text-white mb-6">Tabla de supuestos</h2>
          <div className="border border-gray-700 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-400 font-normal">Parametro</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-normal">Valor base</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-normal">Justificacion</th>
                </tr>
              </thead>
              <tbody>
                {assumptions.map((a, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#111111]" : "bg-[#161616]"}>
                    <td className="px-4 py-3 text-gray-300">{a.input}</td>
                    <td className="px-4 py-3 text-orange-300">{a.value}</td>
                    <td className="px-4 py-3 text-gray-500">{a.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Escenarios guardados</p>
          <h2 className="text-2xl font-light text-white mb-6">Simulaciones documentadas ({saved.length})</h2>
          <div className="space-y-4">
            {saved.map((s) => (
              <div key={s.id} className="border border-gray-700 bg-[#161616] rounded p-6">
                <span className="text-xs text-orange-500 border border-orange-800 px-2 py-0.5 rounded inline-block mb-4">{s.scenario} · {s.savedAt}</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Usuarios Profesional", val: String(s.profesional) },
                    { label: "Usuarios Empresa", val: String(s.empresa) },
                    { label: "Conversion", val: s.convRate + "%" },
                    { label: "MRR", val: "$" + s.mrr.toLocaleString() },
                    { label: "ARR", val: "$" + s.arr.toLocaleString() },
                    { label: "MRR ajustado churn", val: "$" + s.churnAdj.toLocaleString() },
                  ].map((item) => (
                    <div key={item.label} className="border border-gray-700 rounded p-3">
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-white font-bold">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
