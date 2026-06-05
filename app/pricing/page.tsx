"use client";
import { useState, useEffect } from "react";

type SK = "Conservador" | "Esperado" | "Agresivo";

const assumptions = [
  { input: "Visitantes mensuales", value: "1,500", rationale: "Estimado con SEO y referidos en primeros 6 meses" },
  { input: "Signup freemium", value: "20% de visitantes", rationale: "Benchmark SaaS B2B latinoamerica" },
  { input: "Conversion a Profesional", value: "6% base", rationale: "Ajustado por escenario seleccionado" },
  { input: "Precio Profesional", value: "$29/mes", rationale: "Dentro del presupuesto tecnologico de PYME" },
  { input: "Precio Empresa", value: "$99/mes", rationale: "Valor por multiples usuarios y soporte dedicado" },
  { input: "Churn mensual Profesional", value: "5% base", rationale: "Meta reducir a 3% en mes 12" },
  { input: "Churn mensual Empresa", value: "2.5% base", rationale: "Clientes mas comprometidos, mayor LTV" },
];

export default function PricingPage() {
  const [scenario, setScenario] = useState<SK>("Esperado");
  const [profesional, setProfesional] = useState(18);
  const [empresa, setEmpresa] = useState(3);
  const [convRate, setConvRate] = useState(6);
  const [churnRate, setChurnRate] = useState(5);
  const [mrr, setMrr] = useState(0);
  const [arr, setArr] = useState(0);
  const [churnAdj, setChurnAdj] = useState(0);

  useEffect(() => {
    const calcMrr = Math.round((profesional * 29) + (empresa * 99));
    const calcArr = calcMrr * 12;
    const calcChurnAdj = Math.round(calcMrr * (1 - churnRate / 100));
    setMrr(calcMrr);
    setArr(calcArr);
    setChurnAdj(calcChurnAdj);
  }, [profesional, empresa, convRate, churnRate, scenario]);

  const applyScenario = (s: SK) => {
    setScenario(s);
    if (s === "Conservador") { setConvRate(3); setChurnRate(8); }
    if (s === "Esperado") { setConvRate(6); setChurnRate(5); }
    if (s === "Agresivo") { setConvRate(10); setChurnRate(3); }
  };

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
            <p className="text-orange-500 text-xs tracking-widest uppercase mb-6">Proyeccion - Escenario {scenario}</p>
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
                <p>ARR = MRR x 12</p>
                <p>Churn-adj = MRR x (1 - churn%)</p>
              </div>
            </div>
          </div>
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
          <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Escenario guardado</p>
          <h2 className="text-2xl font-light text-white mb-6">Ultima simulacion documentada</h2>
          <div className="border border-gray-700 bg-[#161616] rounded p-6">
            <p className="text-xs text-orange-500 border border-orange-800 px-2 py-0.5 rounded inline-block mb-4">Esperado - Mes 6 - PYME Exportadora</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Segmento", val: "PYME Exportadora" },
                { label: "Usuarios Profesional", val: "18" },
                { label: "Usuarios Empresa", val: "3" },
                { label: "MRR", val: "$819" },
                { label: "ARR", val: "$9,828" },
                { label: "MRR ajustado churn", val: "$778" },
              ].map((item) => (
                <div key={item.label} className="border border-gray-700 rounded p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-bold">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
