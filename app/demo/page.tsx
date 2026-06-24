'use client'
import { useState } from 'react'

const O = '#E8620A'
const OB = 'rgba(232,98,10,0.1)'
const OBR = 'rgba(232,98,10,0.25)'
const C = 'rgba(255,255,255,0.03)'
const B = 'rgba(255,255,255,0.08)'
const G = 'rgba(74,222,128,'

const section = (label: string) => (
  <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.3)', marginBottom:'20px', display:'flex', alignItems:'center', gap:'10px' }}>
    {label}
    <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.06)' }} />
  </div>
)

const modules = [
  { n:'01', icon:'🏠', name:'Homepage',             route:'/',          desc:'Propuesta de valor, problema, casos de uso y CTA principal en español.' },
  { n:'02', icon:'🧬', name:'Núcleo Generativo',    route:'/core',      desc:'Pega cualquier documento en inglés → análisis completo en español en 30 segundos. Resumen, términos, riesgos y respuesta sugerida.', highlight:true },
  { n:'03', icon:'🔎', name:'Investigación',         route:'/research',  desc:'Benchmarking vs Google Translate, DeepL y consultores. Análisis del mercado PYME exportador mexicano.' },
  { n:'04', icon:'📦', name:'Producto',              route:'/product',   desc:'Tres tiers de pricing, mapa de funcionalidades e integraciones con bancos y agencias exportadoras.' },
  { n:'05', icon:'💰', name:'Simulador de Precios',  route:'/pricing',   desc:'MRR, ARR y churn proyectados con tres escenarios: Conservador, Esperado y Agresivo.' },
  { n:'06', icon:'📣', name:'Motor de Marketing',    route:'/marketing', desc:'Posts, guiones de video, calendario editorial y copys en español para PYMES exportadoras.' },
  { n:'07', icon:'💬', name:'Asesor de Comercio IA', route:'/chat',      desc:'Chat en español: intake de 3 preguntas, respuestas personalizadas, guardarraíles y checkpoint humano.', highlight:true },
  { n:'08', icon:'📊', name:'Dashboard',             route:'/dashboard', desc:'Análisis guardados, retroalimentación de usuarios, logs de chat, pruebas de software y estado del sistema.' },
  { n:'09', icon:'📚', name:'Docs',                  route:'/docs',      desc:'8 prompts con botón de copia, arquitectura completa y log de construcción semanal por semana.' },
  { n:'10', icon:'🐉', name:'Demo',                  route:'/demo',      desc:'Este walkthrough integrado. Mapa de agentes, impacto, riesgos, roadmap V2 y evidencia completa.', active:true },
]

const flow = [
  { step:'01', title:'Entra al sistema',        desc:'Usuario llega a la homepage. Ve la propuesta de valor: "Tu contrato en inglés, en español y sin riesgos en 60 segundos."' },
  { step:'02', title:'Analiza un documento',    desc:'Va a /core. Pega una cotización o contrato en inglés. Claude lo analiza con contexto de comercio exterior. Recibe resumen, términos, riesgos y respuesta en español.' },
  { step:'03', title:'Investiga el mercado',    desc:'En /research ve cómo Borderless se posiciona vs competidores. Entiende la brecha de mercado que el producto llena.' },
  { step:'04', title:'Explora producto y precios', desc:'En /product y /pricing ve los tres tiers, el simulador de ingresos y el modelo de distribución para bancos y agencias.' },
  { step:'05', title:'Ve el sistema de marketing', desc:'En /marketing ve contenido real generado: posts de LinkedIn, guiones de Instagram Reels, copys de WhatsApp — todos en español.' },
  { step:'06', title:'Usa el asesor IA',        desc:'En /chat completa el intake de 3 preguntas en español. Pregunta sobre Incoterms, contratos o proveedores. Califica la respuesta con 👍 o 👎.' },
  { step:'07', title:'Revisa la evidencia',     desc:'En /dashboard ve análisis guardados, retroalimentación, logs de chat, 5 pruebas de usuario y 7 pruebas de software — todo documentado.' },
  { step:'08', title:'Lee la documentación',    desc:'En /docs accede a los 8 prompts usados en el curso, la arquitectura completa del sistema y el log de construcción semana a semana.' },
  { step:'09', title:'Ve el sistema completo',  desc:'Está aquí — en /demo. Ve cómo todos los módulos se conectan, qué impacto crea y qué viene en la Versión 2.' },
]

const impact = [
  { q:'¿Qué problema real reduce?',            a:'La barrera del inglés que hace que PYMES mexicanas pierdan contratos, firmen malos términos y pierdan oportunidades globales porque sus documentos de comercio llegan en inglés o mandarín.' },
  { q:'¿Quién se beneficia específicamente?',  a:'Dueños de PYMES mexicanas (1–50 empleados) que importan materias primas o exportan productos terminados — ~4.1 millones de negocios sin staff con inglés fluido ni presupuesto para abogados.' },
  { q:'¿Qué resultado mejora para el usuario?', a:'El tiempo para entender un documento comercial baja de días (esperando traductor) a 30 segundos. El riesgo de firmar cláusulas peligrosas baja. La confianza en negociaciones internacionales sube.' },
  { q:'¿Qué evidencia de pruebas lo respalda?', a:'Miguel (52, importador) identificó términos FOB y pago 50% por adelantado como riesgo en su cotización real — en 30 segundos. Carlos confirmó que la bandera de NET 60 era exactamente el insight que necesitaba para negociar mejores condiciones.' },
  { q:'¿Quién podría pagar por esto?',          a:'PYMES pagando $29–$99/mes. Bancos (Banorte, BBVA MX) pagando por integración white-label en cuentas de exportación. Agencias de promoción de exportaciones pagando por programas piloto.' },
  { q:'¿Por qué pagarían?',                     a:'Una consulta con abogado de comercio exterior cuesta $200–500/hora. Una cláusula mal traducida puede costar miles de dólares. Borderless da análisis específico de comercio en español por una suscripción mensual que se paga sola con un trato salvado.' },
  { q:'¿Qué efecto societal positivo podría escalar?', a:'Más PYMES mexicanas participan en el comercio global de forma legal, rentable y con mayor poder de negociación. Reducción de inequidad entre corporaciones con equipos legales y negocios pequeños sin ellos.' },
  { q:'¿Qué riesgo o mal uso debe evitarse?',  a:'Dueños de PYMES tomando decisiones irreversibles (firmar contratos de alto valor, cerrar acuerdos con penalizaciones) basándose solo en el output de IA sin consultar a un especialista.' },
  { q:'¿Qué guardarraíl se añadió?',            a:'Cada output incluye disclaimer en español. Checkpoint humano activa cuando el chat detecta disputas legales o contratos complejos. Guardarraíl bloquea solicitudes de documentos falsos, evasión fiscal o asesoría legal directa.' },
  { q:'¿Qué haría irresponsable a este venture?', a:'Eliminar el disclaimer, afirmar certeza legal en interpretaciones de contratos, permitir que la IA firme o finalice documentos por el usuario, o generar output confiado cuando el documento es ambiguo.' },
]

const risks = [
  { title:'Riesgo de uso indebido', color:'#fca5a5', bg:'rgba(220,38,38,0.06)', border:'rgba(220,38,38,0.2)', desc:'PYME firma contrato complejo basándose solo en IA sin consultar abogado.', guardrail:'Disclaimer obligatorio en cada output. Checkpoint humano para contratos de alto valor o disputas activas.' },
  { title:'Riesgo de sesgo',        color:'#fbbf24', bg:'rgba(245,158,11,0.06)', border:'rgba(245,158,11,0.2)', desc:'IA conoce mejor corredores México-EE.UU. y México-China que otros mercados menos documentados.', guardrail:'Divulgado en /docs. Curación de base de datos por corredor comercial planificada para V2.' },
  { title:'Riesgo de incentivos',   color:'#a78bfa', bg:'rgba(167,139,250,0.06)', border:'rgba(167,139,250,0.2)', desc:'Alianzas afiliadas con agencias o abogados podrían sesgar recomendaciones hacia socios comerciales.', guardrail:'Cualquier partnership se divulga en la UI. Nunca influye el output de IA. Regla inviolable.' },
  { title:'Privacidad de datos',    color:'#6ee7b7', bg:'rgba(110,231,183,0.06)', border:'rgba(110,231,183,0.2)', desc:'Documentos contienen información comercial sensible: precios, proveedores, términos contractuales.', guardrail:'Documentos procesados via API, no almacenados en servidor. Aviso claro al usuario antes de procesar. Política de privacidad en V2.' },
]

const roadmap = [
  { tag:'Feature',    c:O,         bg:OB,                         icon:'📎', title:'Carga de documentos',        desc:'Sube PDFs y Word directamente. Extracción de texto automática. Sin copiar y pegar.' },
  { tag:'Feature',    c:O,         bg:OB,                         icon:'🈯', title:'Entrada en mandarín',        desc:'Analiza documentos de proveedores chinos directamente en español sin intermediarios.' },
  { tag:'Feature',    c:O,         bg:OB,                         icon:'📊', title:'Tabla de comparación',      desc:'Después del intake, genera comparativa de los 3 corredores comerciales más relevantes para el usuario.' },
  { tag:'Backend',    c:'#a78bfa', bg:'rgba(167,139,250,0.1)',    icon:'🗄️', title:'Supabase + cuentas',         desc:'Reemplaza localStorage. Historial de análisis, cuentas de usuario y acceso multidispositivo.' },
  { tag:'Enterprise', c:'#6ee7b7', bg:'rgba(110,231,183,0.1)',    icon:'🏦', title:'API white-label',            desc:'Para bancos y agencias: Banorte, BBVA MX, agencias sucesoras de INADEM.' },
  { tag:'UX',         c:'#fbbf24', bg:'rgba(251,191,36,0.1)',     icon:'📋', title:'Historial lateral',          desc:'Panel con todos los documentos analizados por fecha y tipo. Referencia rápida sin perder el contexto.' },
]

const swTests = [
  '✅ /chat carga en <2s — sin errores de consola, panel de perfil visible',
  '✅ Flujo de intake completo — 3 preguntas en español → chat se desbloquea → bienvenida personalizada',
  '✅ Guardarraíl — "documento falso" → tarjeta roja, Claude API NO llamada',
  '✅ Respuesta de IA en español — personalizada con industria del usuario en <4 segundos',
  '✅ Retroalimentación 👍👎 — botón resaltado, registro en localStorage confirmado',
  '✅ Análisis /core — documento en inglés → análisis en español con banderas de riesgo',
  '✅ Navegación global — Nav en todas las páginas, página activa en naranja',
]

const userTests = [
  { name:'Valentina, 26', role:'Diseñadora freelance, CDMX',   module:'/chat',           ok:'Respuesta en español sobre Etsy Global — clara y accionable', issue:'Opciones de importar/exportar ambiguas para venta online', fix:'Añadida opción "Exportar/Vender al extranjero"' },
  { name:'Miguel, 52',    role:'Importador, Guadalajara',       module:'/core',           ok:'FOB y pago 50% upfront detectados como riesgo en 30 segundos', issue:'"Risk flags" técnico — no lo entendió', fix:'Cambiado a "⚠️ Punto de atención" en español' },
  { name:'Rodrigo, 29',   role:'PM remoto, CDMX',              module:'/core + /chat',   ok:'EXW identificado correctamente; Incoterms explicados con claridad', issue:'IA perdió contexto de intake después de 3 preguntas', fix:'Intake inyectado en cada llamada API' },
  { name:'Daniela, 31',   role:'UX Designer, CDMX',            module:'Sitio completo',  ok:'"Parece que pagaría por esto" — diseño profesional y confiable', issue:'Sin navegación entre páginas — se perdió entre módulos', fix:'Navigation component en root layout desde Week 6' },
  { name:'Carlos, 35',    role:'Fundador exportador, CDMX',    module:'Sistema completo', ok:'NET 60 identificado como riesgo de flujo de caja — insight clave', issue:'Dashboard sin datos — auto-save no activo', fix:'Auto-guardado añadido después de cada análisis' },
]

const TABS = ['Walkthrough', 'Impacto', 'Riesgos', 'Roadmap V2', 'Pruebas'] as const
type Tab = typeof TABS[number]

export default function DemoPage() {
  const [tab, setTab] = useState<Tab>('Walkthrough')

  return (
    <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'40px 24px 80px', fontFamily:'var(--font-geist-sans),system-ui,sans-serif' }}>

      {/* ── HERO ── */}
      <div style={{ textAlign:'center', marginBottom:'52px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:`${G}0.08)`, color:'#4ade80', border:`1px solid ${G}0.2)`, fontSize:'11px', fontWeight:600, padding:'5px 14px', borderRadius:'20px', marginBottom:'20px', letterSpacing:'0.05em' }}>
          ✓ Sistema final integrado — 10 módulos en vivo — Week 6
        </div>
        <h1 style={{ fontSize:'44px', fontWeight:800, color:'#fff', margin:'0 0 16px', letterSpacing:'-0.03em', lineHeight:1.1 }}>
          Tu co-piloto para el<br/>
          <span style={{ background:`linear-gradient(135deg,${O},#f59e0b)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>comercio global</span>
        </h1>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', maxWidth:'580px', margin:'0 auto 28px', lineHeight:1.75 }}>
          Borderless elimina la barrera del inglés para PYMES mexicanas importadoras y exportadoras en el momento exacto en que llega un documento de comercio. Sin abogados. Sin traductores. Sin perder el trato.
        </p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="/core" style={{ background:O, color:'#fff', padding:'13px 26px', borderRadius:'10px', fontSize:'14px', fontWeight:700, textDecoration:'none' }}>Analizar un documento →</a>
          <a href="/chat" style={{ background:OB, color:O, border:`1px solid ${OBR}`, padding:'13px 26px', borderRadius:'10px', fontSize:'14px', textDecoration:'none' }}>Hablar con el Asesor IA</a>
          <a href="/dashboard" style={{ background:C, color:'rgba(255,255,255,0.6)', border:`1px solid ${B}`, padding:'13px 26px', borderRadius:'10px', fontSize:'14px', textDecoration:'none' }}>Ver evidencias</a>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'10px', marginBottom:'52px' }}>
        {[
          { n:'4.1M', l:'PYMES en México',       c:O },
          { n:'30s',  l:'Para entender doc.',    c:O },
          { n:'10',   l:'Módulos integrados',    c:'#6ee7b7' },
          { n:'5',    l:'Usuarios externos',     c:'#a78bfa' },
          { n:'$0',   l:'Abogado necesario',     c:'#4ade80' },
        ].map((s,i) => (
          <div key={i} style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'12px', padding:'18px', textAlign:'center' }}>
            <div style={{ fontSize:'28px', fontWeight:800, color:s.c, lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'6px', lineHeight:1.4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── AGENT MAP ── */}
      <div style={{ marginBottom:'52px' }}>
        {section('🧭 Mapa de Agentes — Cómo Se Conecta el Sistema')}
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {modules.map((m,i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'stretch' }}>
              <a href={m.route} style={{ textDecoration:'none' }}>
                <div style={{
                  background: m.active ? OB : m.highlight ? `${G}0.05)` : C,
                  border: m.active ? `2px solid ${O}` : m.highlight ? `2px solid ${G}0.4)` : `1px solid ${B}`,
                  borderRadius:'12px', padding:'14px 18px',
                  display:'flex', alignItems:'center', gap:'14px',
                }}>
                  <div style={{ width:'34px', height:'34px', borderRadius:'9px', background: m.active ? OB : m.highlight ? `${G}0.08)` : 'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', flexShrink:0 }}>{m.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'3px' }}>
                      <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.2)', fontFamily:'var(--font-geist-mono)', fontWeight:600 }}>{m.n}</span>
                      <span style={{ fontSize:'13px', fontWeight:600, color:'#fff' }}>{m.name}</span>
                      {m.active && <span style={{ fontSize:'10px', background:OB, color:O, border:`1px solid ${OBR}`, padding:'1px 7px', borderRadius:'5px', fontWeight:600 }}>AQUÍ</span>}
                      {m.highlight && !m.active && <span style={{ fontSize:'10px', background:`${G}0.08)`, color:'#4ade80', padding:'1px 7px', borderRadius:'5px', fontWeight:600 }}>IA en vivo</span>}
                    </div>
                    <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.42)', lineHeight:1.55 }}>{m.desc}</div>
                  </div>
                  <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.2)', fontFamily:'var(--font-geist-mono)', background:'rgba(255,255,255,0.04)', padding:'3px 9px', borderRadius:'5px', flexShrink:0, whiteSpace:'nowrap' }}>{m.route}</span>
                </div>
              </a>
              {i < modules.length-1 && (
                <div style={{ display:'flex', alignItems:'center', paddingLeft:'24px', height:'14px', gap:'0' }}>
                  <div style={{ width:'1px', flex:1, background:`linear-gradient(to bottom,${O}60,transparent)` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ marginBottom:'52px' }}>
        {section('📋 Evidencia Completa del Venture')}
        <div style={{ display:'flex', gap:'4px', borderBottom:`1px solid ${B}`, marginBottom:'28px', overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background:'none', border:'none', cursor:'pointer', padding:'10px 18px', whiteSpace:'nowrap',
              fontSize:'13px', fontWeight:tab===t ? 600 : 400,
              color:tab===t ? O : 'rgba(255,255,255,0.4)',
              borderBottom:tab===t ? `2px solid ${O}` : '2px solid transparent',
              marginBottom:'-1px',
            }}>{t}</button>
          ))}
        </div>

        {/* WALKTHROUGH */}
        {tab==='Walkthrough' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
            {flow.map((f,i) => (
              <div key={i} style={{ display:'flex', gap:'16px', paddingBottom:i<flow.length-1?'20px':0, borderBottom:i<flow.length-1?`1px solid ${B}`:'none', marginBottom:i<flow.length-1?'20px':0 }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:OB, border:`1px solid ${OBR}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700, color:O, flexShrink:0, fontFamily:'var(--font-geist-mono)' }}>{f.step}</div>
                <div>
                  <div style={{ fontSize:'14px', fontWeight:600, color:'#fff', marginBottom:'4px' }}>{f.title}</div>
                  <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.65 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IMPACT */}
        {tab==='Impacto' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {impact.map((item,i) => (
              <div key={i} style={{ background:C, border:`1px solid ${B}`, borderRadius:'12px', padding:'16px 20px' }}>
                <div style={{ fontSize:'12px', fontWeight:600, color:O, marginBottom:'6px' }}>{item.q}</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.65)', lineHeight:1.65 }}>{item.a}</div>
              </div>
            ))}
          </div>
        )}

        {/* RISKS */}
        {tab==='Riesgos' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
            {risks.map((r,i) => (
              <div key={i} style={{ background:r.bg, border:`1px solid ${r.border}`, borderRadius:'14px', padding:'20px' }}>
                <div style={{ fontSize:'13px', fontWeight:700, color:r.color, marginBottom:'8px' }}>🛡️ {r.title}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', marginBottom:'10px', lineHeight:1.6 }}>{r.desc}</div>
                <div style={{ background:'rgba(0,0,0,0.2)', borderRadius:'8px', padding:'10px 12px' }}>
                  <div style={{ fontSize:'10px', fontWeight:600, color:r.color, marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.08em' }}>Guardarraíl implementado</div>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:1.55 }}>{r.guardrail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ROADMAP */}
        {tab==='Roadmap V2' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {roadmap.map((r,i) => (
              <div key={i} style={{ background:C, border:`1px solid ${B}`, borderLeft:`3px solid ${r.c}`, borderRadius:'0 12px 12px 0', padding:'14px 20px', display:'flex', gap:'14px', alignItems:'flex-start' }}>
                <span style={{ fontSize:'22px', flexShrink:0, marginTop:'1px' }}>{r.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'13px', fontWeight:600, color:'#fff', marginBottom:'4px' }}>{r.title}</div>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', lineHeight:1.55 }}>{r.desc}</div>
                </div>
                <span style={{ fontSize:'10px', background:r.bg, color:r.c, padding:'3px 9px', borderRadius:'5px', flexShrink:0, fontWeight:600, border:`1px solid ${r.c}33`, whiteSpace:'nowrap' }}>{r.tag}</span>
              </div>
            ))}
            <div style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'12px', padding:'16px 20px', marginTop:'6px' }}>
              <div style={{ fontSize:'12px', fontWeight:600, color:O, marginBottom:'4px' }}>Con 4 semanas más:</div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:1.7 }}>
                Integración con Stripe para tier $49/mes · Pipeline de documentos en mandarín · Parsing de PDF con librería de extracción · API white-label demo para bancos · Onboarding en español para usuarios no técnicos · Partnership piloto con al menos una agencia exportadora mexicana
              </div>
            </div>
          </div>
        )}

        {/* TESTS */}
        {tab==='Pruebas' && (
          <div>
            <div style={{ marginBottom:'24px' }}>
              <div style={{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>Pruebas de software — 7/7 pasan</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {swTests.map((t,i) => (
                  <div key={i} style={{ background:`${G}0.04)`, border:`1px solid ${G}0.15)`, borderRadius:'10px', padding:'11px 16px', fontSize:'13px', color:'rgba(255,255,255,0.7)' }}>{t}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>Pruebas de usuario externo — 5 usuarios</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {userTests.map((u,i) => (
                  <div key={i} style={{ background:C, border:`1px solid ${B}`, borderRadius:'12px', padding:'16px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
                      <div>
                        <span style={{ fontSize:'14px', fontWeight:700, color:'#fff' }}>{u.name}</span>
                        <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', marginLeft:'10px' }}>{u.role}</span>
                      </div>
                      <span style={{ fontSize:'10px', color:O, background:OB, border:`1px solid ${OBR}`, padding:'2px 9px', borderRadius:'5px', fontFamily:'var(--font-geist-mono)' }}>{u.module}</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px' }}>
                      {[
                        { label:'✓ Qué funcionó', c:'#4ade80', bg:`${G}0.05)`, bd:`${G}0.15)`, text:u.ok },
                        { label:'⚠ Qué confundió', c:'#fbbf24', bg:'rgba(251,191,36,0.05)', bd:'rgba(251,191,36,0.2)', text:u.issue },
                        { label:'→ Qué cambió',   c:O,         bg:OB, bd:OBR, text:u.fix },
                      ].map((col,j) => (
                        <div key={j} style={{ background:col.bg, border:`1px solid ${col.bd}`, borderRadius:'9px', padding:'11px 13px' }}>
                          <div style={{ fontSize:'10px', fontWeight:700, color:col.c, marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{col.label}</div>
                          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', lineHeight:1.55 }}>{col.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── PROOF CHECKLIST ── */}
      <div style={{ marginBottom:'52px' }}>
        {section('🧠 Qué Demuestra Este Venture')}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'10px' }}>
          {[
            { label:'Problema claro',           val:'PYMES mexicanas pierden contratos por no entender inglés — mercado de 4.1M negocios' },
            { label:'Usuario específico',        val:'Dueño de PYME 35–55 años, importa o exporta, sin presupuesto para traductor o abogado' },
            { label:'Núcleo generativo',         val:'LLM multilingüe (Claude Sonnet 4.6) con prompt específico de comercio exterior mexicano' },
            { label:'Lógica de mercado',         val:'Benchmarking vs DeepL, Google Translate, consultores y plataformas de exportación' },
            { label:'Arquitectura de producto',  val:'10 módulos integrados, Navigation global, PageShell, API routes, localStorage + Supabase' },
            { label:'Lógica de precios',         val:'3 tiers ($29/$49/$99) + simulador de MRR/ARR/churn con 3 escenarios' },
            { label:'Sistema de marketing',      val:'Posts, guiones, calendario editorial y copys — todos en español para PYME exportadora' },
            { label:'Interacción pública',       val:'Chat en español con intake, guardarraíles, checkpoint humano y panel de perfil lateral' },
            { label:'Dashboard y evidencia',     val:'5 tabs: análisis, feedback, pruebas de usuario, pruebas de software, estado del sistema' },
            { label:'Biblioteca de prompts',     val:'8 prompts con botón de copia, arquitectura completa y log semanal de construcción' },
            { label:'Pruebas e iteración',       val:'5 usuarios externos, antes/después documentados, bugs identificados y corregidos' },
            { label:'Impacto y riesgos',         val:'10 preguntas de impacto respondidas, 4 categorías de riesgo con guardarraíl implementado' },
            { label:'Roadmap V2',                val:'6 mejoras documentadas con justificación técnica y plan de ejecución' },
          ].map((p,i) => (
            <div key={i} style={{ background:`${G}0.04)`, border:`1px solid ${G}0.12)`, borderRadius:'10px', padding:'12px 16px', display:'flex', gap:'10px', alignItems:'flex-start' }}>
              <span style={{ color:'#4ade80', fontSize:'13px', marginTop:'1px', flexShrink:0 }}>✓</span>
              <div>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#fff', marginBottom:'2px' }}>{p.label}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', lineHeight:1.5 }}>{p.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'16px', padding:'28px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px', flexWrap:'wrap' }}>
        <div>
          <div style={{ fontSize:'18px', fontWeight:700, color:'#fff', marginBottom:'6px' }}>¿Listo para analizar tu primer documento?</div>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.65 }}>
            Pega cualquier cotización, contrato o instrucción de embarque en inglés y obtén análisis completo en español en 30 segundos.
          </div>
        </div>
        <div style={{ display:'flex', gap:'10px', flexShrink:0 }}>
          <a href="/dashboard" style={{ background:C, color:'rgba(255,255,255,0.6)', border:`1px solid ${B}`, padding:'11px 20px', borderRadius:'10px', fontSize:'13px', textDecoration:'none' }}>Ver evidencias</a>
          <a href="/core" style={{ background:O, color:'#fff', padding:'11px 24px', borderRadius:'10px', fontSize:'14px', fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' }}>Analizar ahora →</a>
        </div>
      </div>
    </div>
  )
}
