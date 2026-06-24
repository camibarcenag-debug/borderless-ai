"use client";
import PageShell from '@/components/PageShell'
import { useState, useRef } from "react";

const tiers = [
  { name: "Explorador", price: "$0", period: "/mes", color: "border-gray-600", badge: "", features: ["3 análisis de documentos/mes", "Resumen en español", "Acceso web básico", "Soporte por correo"], cta: "Comenzar gratis", ctaStyle: "border border-gray-500 text-gray-300 hover:border-orange-500 hover:text-orange-400" },
  { name: "Profesional", price: "$29", period: "/mes", color: "border-orange-500", badge: "MÁS POPULAR", features: ["Análisis ilimitados", "Detección de riesgos", "Carga de documentos PDF/DOCX", "Extracción de cláusulas clave", "Historial guardado", "Soporte prioritario"], cta: "Empezar ahora", ctaStyle: "bg-orange-600 hover:bg-orange-500 text-white" },
  { name: "Empresa", price: "$99", period: "/mes", color: "border-gray-600", badge: "", features: ["Todo lo de Profesional", "Hasta 5 usuarios", "Prompts por industria", "Acceso API (beta)", "Soporte dedicado", "Reportes mensuales"], cta: "Contactar ventas", ctaStyle: "border border-gray-500 text-gray-300 hover:border-orange-500 hover:text-orange-400" },
];

const segments = [
  { name: "PYME Exportadora", icon: "🏭", desc: "Dueño de negocio en textiles, alimentos o manufactura que exporta a EE.UU., Canadá o Europa.", pain: "Recibe contratos en inglés sin poder identificar cláusulas de riesgo.", tier: "Profesional" },
  { name: "Despacho Aduanal", icon: "📦", desc: "Agente aduanal que gestiona documentación para múltiples clientes.", pain: "Procesa alto volumen de documentos en inglés con riesgo de errores costosos.", tier: "Empresa" },
];

const featureRows = [
  { name: "Análisis de documentos", e: "3/mes", p: "Ilimitado", em: "Ilimitado" },
  { name: "Resumen en español", e: "✓", p: "✓", em: "✓" },
  { name: "Detección de riesgos", e: "✗", p: "✓", em: "✓" },
  { name: "Carga de PDF/DOCX", e: "✗", p: "✓", em: "✓" },
  { name: "Extracción de cláusulas", e: "✗", p: "✓", em: "✓" },
  { name: "Múltiples usuarios", e: "✗", p: "✗", em: "Hasta 5" },
  { name: "Acceso API", e: "✗", p: "✗", em: "Beta" },
  { name: "Soporte", e: "Correo", p: "Prioritario", em: "Dedicado" },
];

const sev: Record<string, string> = {
  HIGH: "text-red-400 bg-red-900/30 border-red-700",
  MEDIUM: "text-yellow-400 bg-yellow-900/30 border-yellow-700",
  LOW: "text-green-400 bg-green-900/30 border-green-700",
};

export default function ProductPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => { setFile(f); setResult(null); setError(""); };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/analyze-doc", { method: "POST", body: form });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Error al analizar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      module="03"
      icon="📦"
      title="Arquitectura de Producto"
      subtitle="Tres tiers de pricing, mapa de funcionalidades, integraciones bancarias y modelo de distribución."
      crumbs={[{ label: 'Producto', href: '/product' }]}
      nextHref="/pricing"
      nextLabel="Ir a Precios →"
    >
    <main style={{ background: "transparent", color: "#fff" }}>
      <div className="border-b border-gray-800 px-8 py-5 flex items-center gap-3">
        <span className="text-orange-500 font-bold tracking-widest text-sm">BORDERLESS AI</span>
        <span className="text-gray-600">·</span>
        <span className="text-gray-400 text-sm tracking-widest">ARQUITECTURA DE PRODUCTO</span>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">

        <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Paquetes</p>
        <h2 className="text-2xl font-light text-white mb-8">Elige tu plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {tiers.map((t) => (
            <div key={t.name} className={"border " + t.color + " bg-[#161616] p-6 rounded relative"}>
              {t.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs px-3 py-1 rounded-full tracking-widest">{t.badge}</span>}
              <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">{t.name}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{t.price}</span>
                <span className="text-gray-500 text-sm">{t.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="text-gray-300 text-sm flex gap-2"><span className="text-orange-500">›</span>{f}</li>
                ))}
              </ul>
              <button className={"w-full py-2 text-sm rounded transition-all " + t.ctaStyle}>{t.cta}</button>
            </div>
          ))}
        </div>

        <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Segmentos</p>
        <h2 className="text-2xl font-light text-white mb-8">Para quién es Borderless</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {segments.map((s) => (
            <div key={s.name} className="border border-gray-700 bg-[#161616] p-6 rounded">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-white font-bold">{s.name}</span>
                <span className="ml-auto text-xs text-orange-500 border border-orange-800 px-2 py-0.5 rounded">→ {s.tier}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{s.desc}</p>
              <p className="text-gray-500 text-xs border-l-2 border-orange-700 pl-3 italic">{s.pain}</p>
            </div>
          ))}
        </div>

        <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Comparacion</p>
        <h2 className="text-2xl font-light text-white mb-6">Funciones por plan</h2>
        <div className="border border-gray-700 rounded overflow-hidden mb-16">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-gray-700">
                <th className="text-left px-4 py-3 text-gray-400 font-normal">Funcion</th>
                <th className="text-center px-4 py-3 text-gray-400 font-normal">Explorador</th>
                <th className="text-center px-4 py-3 text-orange-400 font-normal">Profesional</th>
                <th className="text-center px-4 py-3 text-gray-400 font-normal">Empresa</th>
              </tr>
            </thead>
            <tbody>
              {featureRows.map((f, i) => (
                <tr key={f.name} className={i % 2 === 0 ? "bg-[#111111]" : "bg-[#161616]"}>
                  <td className="px-4 py-3 text-gray-300">{f.name}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{f.e}</td>
                  <td className="px-4 py-3 text-center text-orange-300">{f.p}</td>
                  <td className="px-4 py-3 text-center text-gray-300">{f.em}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Nueva funcion</p>
        <h2 className="text-2xl font-light text-white mb-2">Analiza tu documento ahora</h2>
        <p className="text-gray-500 text-sm mb-6">Sube un contrato en ingles. Recibe analisis completo en espanol en segundos.</p>

        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-10 text-center mb-4 cursor-pointer hover:border-orange-500 transition-colors"
          onClick={() => ref.current && ref.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        >
          <input ref={ref} type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => { if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]); }} />
          {file ? (
            <div>
              <p className="text-orange-400 text-sm font-bold mb-1">Archivo: {file.name}</p>
              <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB - Listo para analizar</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 text-sm mb-1">Arrastra tu documento aqui</p>
              <p className="text-gray-600 text-xs">PDF o DOCX en ingles - max 10MB</p>
            </div>
          )}
        </div>

        {file && !loading && (
          <button onClick={analyze} className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 rounded text-sm font-bold tracking-widest transition-all mb-6">
            ANALIZAR DOCUMENTO
          </button>
        )}
        {loading && (
          <div className="border border-gray-700 rounded p-8 text-center mb-6">
            <p className="text-orange-400 text-sm">Analizando con IA...</p>
            <p className="text-gray-600 text-xs mt-2">10 a 15 segundos</p>
          </div>
        )}
        {error && (
          <div className="border border-red-800 bg-red-900/20 rounded p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {result && (
          <div className="space-y-4">
            <div className="border border-gray-700 bg-[#161616] rounded p-5">
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Resumen</p>
              <p className="text-gray-300 text-sm leading-relaxed">{result.resumen}</p>
            </div>
            <div className="border border-gray-700 bg-[#161616] rounded p-5">
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-3">Clausulas Clave</p>
              <div className="space-y-3">
                {result.clausulas_clave && result.clausulas_clave.map((c: any, i: number) => (
                  <div key={i} className="border-l-2 border-orange-700 pl-3">
                    <p className="text-white text-sm font-bold mb-1">{c.campo}</p>
                    <p className="text-gray-400 text-sm">{c.explicacion}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-gray-700 bg-[#161616] rounded p-5">
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-3">Items que Pueden Costar Dinero</p>
              <div className="space-y-2">
                {result.items_con_costo && result.items_con_costo.map((c: any, i: number) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-orange-400">$</span>
                    <div><span className="text-white">{c.item}</span><span className="text-gray-500"> - {c.impacto}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-gray-700 bg-[#161616] rounded p-5">
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-3">Banderas de Riesgo</p>
              <div className="space-y-2">
                {result.banderas_riesgo && result.banderas_riesgo.map((r: any, i: number) => (
                  <div key={i} className={"border rounded p-3 " + (sev[r.severidad] || "text-gray-400 border-gray-700")}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={"text-xs font-bold px-2 py-0.5 rounded border " + (sev[r.severidad] || "")}>{r.severidad}</span>
                      <span className="text-sm font-bold">{r.riesgo}</span>
                    </div>
                    <p className="text-xs opacity-80">{r.mitigacion}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-orange-800 bg-orange-900/10 rounded p-5">
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">Recomendacion</p>
              <p className="text-gray-300 text-sm leading-relaxed">{result.recomendacion}</p>
            </div>
          </div>
        )}
      </div>
    </main>
    </PageShell>
  );
}
