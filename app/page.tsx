"use client";
import Link from "next/link";

const values = [
  { icon: "📄", title: "Traduce con contexto", desc: "No es traducción literal. Es inteligencia comercial — entiende términos legales y de comercio exterior en inglés.", color: "#FFF4EE", iconColor: "#E8620A" },
  { icon: "🛡️", title: "Identifica riesgos", desc: "Detecta cláusulas de penalización, exclusividad, cancelación, y arbitraje internacional automáticamente.", color: "#E6F1FB", iconColor: "#185FA5" },
  { icon: "✅", title: "Responde con confianza", desc: "Sabe exactamente qué revisar con un especialista antes de firmar. Tú decides, con información completa.", color: "#EAF3DE", iconColor: "#3B6D11" },
];

const tiers = [
  { name: "Explorador", price: "$0", period: "/mes", featured: false, features: ["3 análisis al mes", "Resumen en español", "✗ Detección de riesgos", "✗ Carga de PDF/DOCX"], cta: "Comenzar gratis", href: "/product" },
  { name: "Profesional", price: "$29", period: "/mes", featured: true, features: ["Análisis ilimitados", "Detección de riesgos", "Carga PDF/DOCX en inglés", "Historial guardado"], cta: "Empezar ahora", href: "/product" },
  { name: "Empresa", price: "$99", period: "/mes", featured: false, features: ["Todo lo de Profesional", "Hasta 5 usuarios", "Prompts por industria", "Acceso API beta"], cta: "Contactar ventas", href: "/product" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <span className="font-medium text-gray-900">Borderless AI</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[["Producto","/product"],["Precios","/pricing"],["Investigación","/research"],["Marketing","/marketing"]].map(([label,href])=>(
            <Link key={href} href={href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{label}</Link>
          ))}
        </div>
        <Link href="/product" className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">Empezar gratis</Link>
      </nav>

      <section className="bg-gray-50 px-6 py-20 text-center border-b border-gray-100">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-orange-200 mb-6">
          ⚡ Nuevo · Análisis de documentos en inglés con IA
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight max-w-2xl mx-auto mb-4">
          Tu contrato en inglés, en español y sin riesgos en 60 segundos
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Borderless AI analiza tus contratos comerciales en inglés, identifica cláusulas riesgosas, y te dice cómo responder — en español, sin abogado.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link href="/product" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm">Analiza tu primer contrato gratis</Link>
          <Link href="/product" className="border border-gray-200 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg transition-colors text-sm">Ver cómo funciona</Link>
        </div>
        <div className="flex justify-center gap-10 pt-8 border-t border-gray-200 max-w-lg mx-auto">
          {[["60s","Tiempo de análisis"],["$0","Para empezar"],["5","Secciones de análisis"],["100%","En español"]].map(([num,label])=>(
            <div key={label} className="text-center">
              <div className="text-2xl font-medium text-orange-500">{num}</div>
              <div className="text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto">
        <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-2">Por qué Borderless</p>
        <h2 className="text-2xl font-medium text-gray-900 mb-8">Todo lo que necesitas para entender cualquier contrato en inglés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map(v=>(
            <div key={v.title} className="rounded-xl p-6 border border-gray-100 bg-gray-50">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4" style={{background:v.color}}>{v.icon}</div>
              <div className="font-medium text-gray-900 mb-2">{v.title}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 bg-orange-50 border-y border-orange-100">
        <div className="max-w-2xl mx-auto">
          <p className="text-base italic text-orange-900 leading-relaxed mb-4">
            "No es que no entienda inglés — es que no quería cometer un error en algo que tenía consecuencias legales para mi cliente. Con una herramienta como esta, hubiera actuado en horas en vez de días."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-medium">GB</div>
            <div>
              <div className="text-sm font-medium text-orange-900">Carla Garza</div>
              <div className="text-xs text-orange-600">CEO, Despacho de Seguros — Ciudad de México</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-2 text-center">Precios</p>
          <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">Empieza gratis. Crece cuando lo necesites.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map(t=>(
              <div key={t.name} className={`bg-white rounded-xl p-6 border relative ${t.featured ? "border-orange-500 border-2" : "border-gray-200"}`}>
                {t.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">Más popular</span>}
                <div className="text-sm text-gray-400 mb-1">{t.name}</div>
                <div className="mb-4"><span className="text-3xl font-medium text-gray-900">{t.price}</span><span className="text-sm text-gray-400">{t.period}</span></div>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  {t.features.map(f=><li key={f} className={f.startsWith("✗") ? "text-gray-300" : ""}>{f.startsWith("✗") ? f : "✓ "+f}</li>)}
                </ul>
                <Link href={t.href} className={`block text-center text-sm font-medium py-2 rounded-lg transition-colors ${t.featured ? "bg-orange-500 text-white hover:bg-orange-600" : "border border-gray-200 text-gray-700 hover:border-gray-400"}`}>{t.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-8 py-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <span className="font-medium text-gray-900 text-sm">Borderless AI</span>
        <div className="flex gap-5">
          {[["Producto","/product"],["Precios","/pricing"],["Investigación","/research"],["Marketing","/marketing"]].map(([label,href])=>(
            <Link key={href} href={href} className="text-xs text-gray-400 hover:text-gray-700">{label}</Link>
          ))}
        </div>
        <span className="text-xs text-gray-300">México · 2026</span>
      </footer>
    </main>
  );
}
