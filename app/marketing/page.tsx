"use client";
import { useState } from "react";

const brandSystem = [
  { label: "Nombre", value: "Borderless AI", highlight: true },
  { label: "Tagline", value: "Tu contrato en inglés, en español y sin riesgos en 60 segundos." },
  { label: "Promesa de valor", value: "Entiendes cualquier contrato en inglés. Sabes qué puede costarte. Sabes cómo responder — sin abogado ni traductor." },
  { label: "Tono de voz", value: "Directo. Confiable. En español mexicano. Sin jerga de Silicon Valley." },
  { label: "CTA principal", value: "Analiza tu primer contrato gratis", highlight: true },
  { label: "Colores", value: "#E8620A naranja · #111111 fondo · #FFFFFF texto" },
];

const personas = [
  { initials: "PE", name: "PYME Exportadora", tier: "→ Profesional $29/mes", color: "#E6F1FB", textColor: "#185FA5", pain: "Recibe contratos en inglés sin poder identificar cláusulas de riesgo. Budget tech: $20–100/mes. Canal: WhatsApp + Instagram." },
  { initials: "DA", name: "Despacho Aduanal", tier: "→ Empresa $99/mes", color: "#EAF3DE", textColor: "#3B6D11", pain: "Procesa alto volumen de documentos en inglés para múltiples clientes. Budget: $80–200/mes. Canal: LinkedIn + Email." },
];

const socialPosts = [
  { channel: "Instagram", type: "Awareness", text: "Te llegó un contrato en inglés y no sabes si firmar. Borderless AI te dice en 60 segundos qué dice, qué cláusulas son riesgosas, y cómo responder. En español. Sin abogado. Primer análisis gratis." },
  { channel: "WhatsApp", type: "Referido", text: "Oye, encontré algo que te puede servir. Si recibes contratos en inglés, esta herramienta los analiza en español y te dice qué parte te puede costar dinero. Se llama Borderless AI." },
  { channel: "Instagram", type: "Pain point", text: "El problema no es que no entiendes inglés. Es que no sabes cuál parte del contrato te va a meter en problemas. Eso es exactamente lo que Borderless AI identifica por ti." },
  { channel: "LinkedIn", type: "EN", text: "Mexican SME owners lose thousands signing contracts they don't fully understand. Borderless AI — Spanish analysis, risk flags, suggested reply. Built for PYMES exportadoras." },
  { channel: "Instagram", type: "Feature", text: "Cláusulas que Borderless AI detecta automáticamente: penalizaciones por retraso · términos de pago · exclusividad · condiciones de cancelación · arbitraje internacional. Todo en español." },
  { channel: "WhatsApp", type: "Demo", text: "Acabo de analizar un contrato de 12 páginas en inglés. Me tomó 8 segundos. Me dijo exactamente qué revisar antes de firmar. Esto es Borderless AI." },
  { channel: "Instagram", type: "Precios", text: "Tres planes: Explorador gratis / Profesional $29 al mes / Empresa $99 al mes. Empieza gratis. Analiza tu primer contrato en inglés hoy." },
  { channel: "LinkedIn", type: "Build in public", text: "Week 3 of building Borderless AI: launched /product with 3 pricing tiers and a live document upload feature. Upload an English contract → Spanish risk analysis in under 10 seconds." },
  { channel: "Instagram", type: "Emoción", text: "Tu mamá, tu socio, tu contador — ninguno sabe lo que dice ese contrato en inglés. Borderless AI sí. Y te lo explica en el lenguaje que usas todos los días." },
  { channel: "WhatsApp", type: "Conversión", text: "Si exportas a EE.UU., Canadá o Europa y recibes documentos en inglés — Borderless AI es para ti. Análisis completo en español. Riesgos identificados. Recomendación incluida. $29 al mes." },
];

const videoScripts = [
  { duration: "15 segundos", channel: "Instagram Reel", script: "[Contrato llega en WhatsApp]\n\"Te llegó un contrato en inglés.\"\n[Upload a Borderless AI]\n\"En 8 segundos sabes exactamente qué te puede costar dinero.\"\n[Logo + URL]\n\"Borderless AI. Tu contrato en inglés, en español, sin riesgos.\"\nCTA: Primer análisis gratis — link en bio." },
  { duration: "30 segundos", channel: "Instagram / LinkedIn", script: "[PYME owner con contrato en inglés en pantalla]\n\"Si tienes un negocio que exporta, sabes este momento. Te llega un contrato en inglés. No es que no entiendas inglés. Es que no quieres cometer un error con consecuencias legales.\"\n[Upload — output en español aparece]\n\"Borderless AI lee el contrato. Te dice qué cláusulas son riesgosas. Qué puede costarte. Y cómo responder. En español. En menos de un minuto.\"\n[Logo + precios]\nCTA: Analiza tu primer contrato gratis." },
  { duration: "60 segundos", channel: "YouTube / LinkedIn", script: "[Split screen — contrato en inglés izquierda, dueño confundido derecha]\n\"Cada año, miles de PYMES mexicanas pierden dinero firmando contratos en inglés que no entendieron completamente.\"\n[Interface de Borderless AI]\n\"Borderless AI resuelve exactamente ese momento. Subes tu contrato en inglés — PDF o Word. En menos de 60 segundos recibes análisis completo en español: resumen, cláusulas clave, costos potenciales, banderas de riesgo, y recomendación.\"\n[Risk flags en rojo y amarillo]\n\"No es una traducción. Es inteligencia comercial para dueños de negocios mexicanos que comercian con el mundo.\"\n[Pricing tiers]\n\"Explorador gratis. Profesional $29/mes. Empresa $99/mes.\"\nCTA: Empieza gratis hoy — borderless-ai-g2ut.vercel.app/product" },
];

const calendar = [
  { day: 1, channel: "Instagram", type: "Post", content: "Awareness — Te llegó un contrato en inglés..." },
  { day: 2, channel: "WhatsApp", type: "Referido", content: "Oye, encontré algo que te puede servir..." },
  { day: 3, channel: "LinkedIn", type: "Build in public", content: "Lanzamiento Week 3 — URL en vivo + resultados reales" },
  { day: 4, channel: "Instagram", type: "Reel 15s", content: "Script 1 — contrato en inglés llega, análisis en 8 segundos" },
  { day: 5, channel: "Instagram", type: "Pain point", content: "El problema no es el inglés, es el riesgo..." },
  { day: 6, channel: "WhatsApp", type: "Demo", content: "Acabo de analizar 12 páginas en inglés en 8 segundos..." },
  { day: 7, channel: "Descanso", type: "Revisión", content: "Analizar engagement Días 1–6. Identificar mejor post." },
  { day: 8, channel: "Instagram", type: "Emoción", content: "Tu mamá, tu socio — ninguno sabe qué dice ese contrato en inglés..." },
  { day: 9, channel: "LinkedIn", type: "Post EN", content: "Mexican SME owners lose thousands every year..." },
  { day: 10, channel: "Instagram", type: "Feature", content: "Cláusulas que Borderless detecta automáticamente..." },
  { day: 11, channel: "Instagram", type: "Reel 30s", content: "Script 2 — escenario dueño PYME con contrato en inglés" },
  { day: 12, channel: "WhatsApp", type: "Conversión", content: "Si exportas a EE.UU., Canadá o Europa..." },
  { day: 13, channel: "Instagram", type: "Precios", content: "Tres planes. Explorador gratis. Profesional $29..." },
  { day: 14, channel: "LinkedIn", type: "Video 60s", content: "Script 3 — historia completa + link al producto" },
];

const visualPrompts = [
  { id: "VP-01", use: "Hero image", prompt: "Mexican business owner at a modern desk, reviewing documents in English on laptop, confident expression, warm lighting, Mexico City office, photorealistic 16:9" },
  { id: "VP-02", use: "UI screenshot", prompt: "Dark terminal-style web interface showing contract analysis in Spanish, orange accent colors, risk flags in red and yellow, Bloomberg aesthetic, product screenshot" },
  { id: "VP-03", use: "Pain point", prompt: "Close-up of hands holding a printed English contract, confused expression blurred in background, dramatic lighting, documentary photography, Mexico setting" },
  { id: "VP-04", use: "Solución", prompt: "Split screen: left side English legal document, right side clean Spanish summary with green checkmarks, minimalist dark background, orange accents" },
  { id: "VP-05", use: "Social proof", prompt: "Professional Mexican woman in her 50s, CEO or business owner, confident smile, modern office, warm natural light, authentic portrait photography" },
  { id: "VP-06", use: "Móvil", prompt: "Smartphone screen showing Borderless AI interface in Spanish, person holding phone, Mexico City background blurred, realistic product mockup, vertical format" },
  { id: "VP-07", use: "Risk flag", prompt: "Abstract visualization of contract risk — red warning signals emerging from English document text, dark background, data visualization aesthetic, orange and red" },
  { id: "VP-08", use: "Marca", prompt: "Borderless AI wordmark on dark background, orange accent line underneath, minimalist tech brand identity, clean typography, social media header format" },
];

const abTests = [
  {
    label: "A/B Test 1 — Título del homepage",
    vA: "Entiende cualquier contrato en inglés en 60 segundos.",
    vB: "La IA que traduce y analiza contratos comerciales para PYMES mexicanas.",
    reasonA: "Lidera con el resultado del usuario y promesa de tiempo específica. El usuario no necesita saber qué es el producto — necesita saber qué hace por ella cuando llega el contrato en inglés.",
    reasonB: "Descripción de categoría. Pasiva. Primera sugerencia del AI — rechazada. Habla del producto, no del usuario ni del momento.",
  },
  {
    label: "A/B Test 2 — CTA principal",
    vA: "Analiza tu primer contrato gratis",
    vB: "Empieza gratis",
    reasonA: "Específico a la acción de Borderless. Señala qué hace el producto en 4 palabras + elimina riesgo con 'gratis' + usa 'tu' para hacerlo personal.",
    reasonB: "Idéntico al CTA de cualquier SaaS del mundo. Cero diferenciación. Podría ser el botón de Spotify, Netflix, o cualquier otra app.",
  },
];

const channelColor: Record<string, string> = {
  Instagram: "bg-orange-50 text-orange-700 border-orange-200",
  WhatsApp: "bg-green-50 text-green-700 border-green-200",
  LinkedIn: "bg-blue-50 text-blue-700 border-blue-200",
  Descanso: "bg-gray-100 text-gray-500 border-gray-200",
};

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button onClick={copy} className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 px-2 py-1 rounded-md transition-colors">
      {copied ? "✓ Copiado" : "Copiar"}
    </button>
  );
}

export default function MarketingPage() {
  const [winner, setWinner] = useState<Record<number, "A" | "B">>({});
  const [saved, setSaved] = useState<{ label: string; content: string }[]>([]);
  const [saveMsg, setSaveMsg] = useState("");

  const saveAsset = (label: string, content: string) => {
    setSaved(prev => [{ label, content }, ...prev].slice(0, 5));
    setSaveMsg("Asset guardado correctamente");
    setTimeout(() => setSaveMsg(""), 2500);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-2">
        <span className="font-medium text-gray-900 text-sm">Borderless AI</span>
        <span className="text-gray-300">·</span>
        <span className="text-sm text-gray-400">Motor de Marketing</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* BRAND SYSTEM */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">Sistema de marca</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Brand System</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandSystem.map(b => (
              <div key={b.label}>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{b.label}</div>
                <div className={`text-sm leading-relaxed ${b.highlight ? "text-orange-500 font-medium" : "text-gray-700"}`}>{b.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONAS */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">Segmentos</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Persona objetivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map(p => (
              <div key={p.name} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: p.color, color: p.textColor }}>{p.initials}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-orange-500">{p.tier}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-orange-400 pl-3">{p.pain}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CAMPAIGN FORM */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">Generador de campaña</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Configurar campaña</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Segmento objetivo</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-400"><option>PYME Exportadora</option><option>Despacho Aduanal</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tono de voz</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-400"><option>Directo y confiable</option><option>Emocional</option><option>Técnico</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Canal principal</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-400"><option>Instagram</option><option>WhatsApp</option><option>LinkedIn</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">CTA</label>
                <input type="text" defaultValue="Analiza tu primer contrato gratis" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-400" />
              </div>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">Generar contenido de campaña →</button>
          </div>
        </section>

        {/* SOCIAL POSTS */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">10 publicaciones</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Posts para redes sociales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPosts.map((post, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${channelColor[post.channel] || "bg-gray-100 text-gray-500 border-gray-200"}`}>{post.channel}</span>
                    <span className="text-xs text-gray-400">{post.type}</span>
                  </div>
                  <CopyBtn text={post.text} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{post.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO SCRIPTS */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">3 scripts de video</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Scripts para video</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoScripts.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md">{s.duration}</span>
                  <CopyBtn text={s.script} />
                </div>
                <div className="text-xs text-gray-400 mb-2">{s.channel}</div>
                <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">{s.script}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* CALENDAR */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">Calendario de 14 días</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Plan de contenido</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-100"><th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Día</th><th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Canal</th><th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Tipo</th><th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Contenido</th></tr></thead>
              <tbody>
                {calendar.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2.5 text-gray-900 font-medium">{row.day}</td>
                    <td className="px-4 py-2.5"><span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${channelColor[row.channel] || "bg-gray-100 text-gray-500 border-gray-200"}`}>{row.channel}</span></td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{row.type}</td>
                    <td className="px-4 py-2.5 text-gray-600 text-xs">{row.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* VISUAL PROMPTS */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">8 prompts visuales</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Pack de prompts para imágenes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {visualPrompts.map((vp) => (
              <div key={vp.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-xs font-medium text-orange-500 mb-1">{vp.id}</div>
                <div className="text-xs font-medium text-gray-900 mb-2">{vp.use}</div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{vp.prompt}</p>
                <CopyBtn text={vp.prompt} />
              </div>
            ))}
          </div>
        </section>

        {/* A/B TESTER */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">Prueba A/B</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Tester de títulos y CTA</h2>
          <div className="space-y-4">
            {abTests.map((test, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-gray-700 mb-3">{test.label}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`bg-white rounded-xl p-5 border-2 transition-all ${winner[i] === "A" ? "border-green-400" : "border-gray-200"}`}>
                    <div className="text-xs text-gray-400 mb-2">Versión A</div>
                    <div className="text-base font-medium text-gray-900 mb-3 leading-snug">"{test.vA}"</div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{test.reasonA}</p>
                    {winner[i] === "A"
                      ? <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg">✓ Ganadora seleccionada</span>
                      : <button onClick={() => setWinner(w => ({ ...w, [i]: "A" }))} className="text-xs border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 px-3 py-1.5 rounded-lg transition-colors">Seleccionar versión A</button>}
                  </div>
                  <div className={`bg-white rounded-xl p-5 border-2 transition-all ${winner[i] === "B" ? "border-green-400" : "border-gray-200"}`}>
                    <div className="text-xs text-gray-400 mb-2">Versión B</div>
                    <div className="text-base font-medium text-gray-900 mb-3 leading-snug">"{test.vB}"</div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{test.reasonB}</p>
                    {winner[i] === "B"
                      ? <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg">✓ Ganadora seleccionada</span>
                      : <button onClick={() => setWinner(w => ({ ...w, [i]: "B" }))} className="text-xs border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 px-3 py-1.5 rounded-lg transition-colors">Seleccionar versión B</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SAVE */}
        <section>
          <p className="text-xs font-medium text-orange-500 tracking-widest uppercase mb-1">Assets guardados</p>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Activos de campaña guardados</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Campaña — PYME Exportadora · Instagram</div>
                <div className="text-xs text-gray-400 mt-0.5">10 posts · 3 scripts · calendario 14 días · 8 prompts</div>
              </div>
              <button onClick={() => saveAsset("Campaña completa PYME", socialPosts.map(p => p.text).join("\n\n"))} className="text-xs text-orange-500 border border-orange-200 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">Guardar campaña</button>
            </div>
            {saved.map((s, i) => (
              <div key={i} className="p-4 border-b border-gray-100 last:border-b-0 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-900">{s.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate max-w-sm">{s.content.slice(0, 80)}...</div>
                </div>
                <CopyBtn text={s.content} />
              </div>
            ))}
            {saved.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-300">Haz clic en "Guardar campaña" para guardar assets aquí</div>
            )}
          </div>
          {saveMsg && <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2">{saveMsg}</div>}
        </section>

      </div>
    </main>
  );
}
