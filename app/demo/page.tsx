'use client'

const O = '#E8620A'
const OB = 'rgba(232,98,10,0.12)'
const OBR = 'rgba(232,98,10,0.28)'
const C = 'rgba(255,255,255,0.04)'
const B = 'rgba(255,255,255,0.09)'

const modules = [
  { n:'01', icon:'🧬', name:'Núcleo Generativo', route:'/core',      desc:'Analiza documentos de comercio en inglés. Devuelve resumen, términos clave, banderas de riesgo y respuesta sugerida — en español, en 30 segundos.' },
  { n:'02', icon:'🔎', name:'Investigación',     route:'/research',  desc:'Benchmarking competitivo vs Google Translate, DeepL y consultores. Análisis del mercado PYME mexicano exportador.' },
  { n:'03', icon:'📦', name:'Arquitectura',      route:'/product',   desc:'Mapa de funcionalidades, stack tecnológico, integraciones bancarias y modelo de distribución para bancos y agencias exportadoras.' },
  { n:'04', icon:'💰', name:'Simulador de Precios', route:'/pricing', desc:'Tres tiers ($29/$49/$99/mes) con simulación de MRR, ARR y churn. Escenarios conservador, esperado y agresivo.' },
  { n:'05', icon:'📣', name:'Motor de Marketing', route:'/marketing', desc:'Contenido en español para PYMES exportadoras: posts, guiones de video, calendario editorial, copys de WhatsApp y LinkedIn.' },
  { n:'06', icon:'💬', name:'Asesor de Comercio IA', route:'/chat',  desc:'Chat en español con intake de 3 preguntas (industria, operación, reto). Guardarraíles de seguridad y checkpoint humano para casos legales.' },
  { n:'07', icon:'📊', name:'Dashboard',         route:'/dashboard', desc:'Panel de evidencias: análisis guardados, retroalimentación de usuarios, logs de chat y estado de todos los módulos.' },
  { n:'08', icon:'📚', name:'Docs',              route:'/docs',      desc:'Biblioteca de 8 prompts, arquitectura completa del sistema y log de construcción semanal organizado por semana.' },
]

const impacts = [
  { stat:'4.1M', label:'PYMES en México', sub:'El mercado objetivo directo' },
  { stat:'30s',  label:'Para entender un contrato', sub:'vs días esperando traductor' },
  { stat:'$0',   label:'Abogado para la primera lectura', sub:'Claridad inmediata en español' },
]

const roadmap = [
  { tag:'Feature',    c:O,          bg:OB, icon:'📎', text:'Carga de documentos — sube PDFs y Word directamente; el sistema extrae el texto y ejecuta el análisis sin copiar y pegar' },
  { tag:'Feature',    c:O,          bg:OB, icon:'🈯', text:'Entrada en mandarín — analiza documentos de proveedores chinos directamente en español sin intermediarios' },
  { tag:'Backend',    c:'#a78bfa',  bg:'rgba(167,139,250,0.1)', icon:'🗄️', text:'Supabase — cuentas de usuario, historial de análisis y acceso multidispositivo con cifrado en reposo' },
  { tag:'Enterprise', c:'#6ee7b7',  bg:'rgba(110,231,183,0.1)', icon:'🏦', text:'API white-label para bancos y agencias de exportación — Banorte, BBVA MX, agencias sucesoras de INADEM' },
  { tag:'UX',         c:'#fbbf24',  bg:'rgba(251,191,36,0.1)',  icon:'📋', text:'Historial de análisis en barra lateral — referencia rápida de todos los documentos analizados por fecha y tipo' },
]

const proof = [
  { label:'Problema claro', value:'PYMES mexicanas pierden contratos por no entender inglés', ok:true },
  { label:'Usuario específico', value:'Dueño de PYME, 35–55 años, importa o exporta', ok:true },
  { label:'Núcleo generativo', value:'LLM multilingüe con prompt específico de comercio exterior', ok:true },
  { label:'Lógica de mercado', value:'Benchmarking vs DeepL, Google Translate, consultores', ok:true },
  { label:'Arquitectura de producto', value:'10 módulos integrados, API routes, localStorage', ok:true },
  { label:'Lógica de precios', value:'3 tiers + simulador de ingresos con MRR/ARR', ok:true },
  { label:'Sistema de marketing', value:'Contenido en español, WhatsApp, LinkedIn, SEO', ok:true },
  { label:'Interacción pública', value:'Chat en español con intake, guardarraíles y checkpoint', ok:true },
  { label:'Dashboard y evidencia', value:'Análisis guardados, feedback, logs, estado de módulos', ok:true },
  { label:'Biblioteca de prompts', value:'8 prompts documentados con arquitectura y log semanal', ok:true },
  { label:'Pruebas de usuario', value:'5 usuarios externos, antes/después documentados', ok:true },
  { label:'Impacto y riesgos', value:'Check de impacto completo, guardarraíles implementados', ok:true },
  { label:'Roadmap V2', value:'5 mejoras documentadas con justificación técnica', ok:true },
]

export default function DemoPage() {
  return (
    <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'40px 24px 80px' }}>

      {/* Hero */}
      <div style={{ textAlign:'center', marginBottom:'56px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(74,222,128,0.08)', color:'#4ade80', border:'1px solid rgba(74,222,128,0.2)', fontSize:'11px', fontWeight:600, padding:'5px 14px', borderRadius:'20px', marginBottom:'20px', letterSpacing:'0.05em' }}>
          ✓ Sistema final integrado — 10 módulos en vivo
        </div>
        <h1 style={{ fontSize:'42px', fontWeight:800, color:'#fff', margin:'0 0 16px', letterSpacing:'-0.03em', lineHeight:1.1 }}>
          Tu co-piloto para el<br/>
          <span style={{ background:`linear-gradient(135deg,${O},#f59e0b)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>comercio global</span>
        </h1>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', maxWidth:'560px', margin:'0 auto 28px', lineHeight:1.75 }}>
          Borderless elimina la barrera del inglés para PYMES mexicanas importadoras y exportadoras — en el momento exacto en que llega un documento de comercio. Sin abogados. Sin traductores. Sin perder el trato.
        </p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="/core" style={{ background:O, color:'#fff', padding:'13px 26px', borderRadius:'10px', fontSize:'14px', fontWeight:700, textDecoration:'none' }}>Analizar un documento →</a>
          <a href="/chat" style={{ background:OB, color:O, border:`1px solid ${OBR}`, padding:'13px 26px', borderRadius:'10px', fontSize:'14px', fontWeight:500, textDecoration:'none' }}>Hablar con el asesor IA</a>
        </div>
      </div>

      {/* Impact stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'56px' }}>
        {impacts.map((s,i) => (
          <div key={i} style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'14px', padding:'24px', textAlign:'center' }}>
            <div style={{ fontSize:'36px', fontWeight:800, color:O, letterSpacing:'-0.03em', lineHeight:1 }}>{s.stat}</div>
            <div style={{ fontSize:'14px', color:'#fff', fontWeight:600, margin:'8px 0 4px', lineHeight:1.3 }}>{s.label}</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Agent map */}
      <div style={{ marginBottom:'56px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'20px' }}>
          🧭 Mapa de agentes — cómo se conecta el sistema
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {modules.map((m,i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <a href={m.route} style={{ textDecoration:'none', width:'100%' }}>
                <div style={{
                  background: m.route==='/chat' ? 'rgba(110,231,183,0.06)' : C,
                  border: m.route==='/chat' ? '2px solid rgba(110,231,183,0.4)' : `1px solid ${B}`,
                  borderRadius:'12px', padding:'16px 20px',
                  display:'flex', alignItems:'center', gap:'16px',
                  transition:'border-color 0.15s',
                }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'10px', background: m.route==='/chat' ? 'rgba(110,231,183,0.1)' : OB, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>{m.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
                      <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', fontWeight:600, fontFamily:'var(--font-geist-mono)' }}>{m.n}</span>
                      <span style={{ fontSize:'14px', fontWeight:600, color:'#fff' }}>{m.name}</span>
                      {m.route==='/chat' && <span style={{ fontSize:'10px', background:'rgba(110,231,183,0.1)', color:'#6ee7b7', padding:'1px 7px', borderRadius:'5px', fontWeight:600 }}>IA en vivo</span>}
                    </div>
                    <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>{m.desc}</div>
                  </div>
                  <span style={{ fontSize:'11px', color: m.route==='/chat' ? '#6ee7b7' : 'rgba(255,255,255,0.25)', background: m.route==='/chat' ? 'rgba(110,231,183,0.08)' : 'rgba(255,255,255,0.05)', padding:'3px 10px', borderRadius:'6px', fontFamily:'var(--font-geist-mono)', flexShrink:0 }}>{m.route}</span>
                </div>
              </a>
              {i < modules.length-1 && (
                <div style={{ width:'1px', height:'16px', background:`linear-gradient(to bottom,${O},transparent)`, margin:'0', opacity:0.4 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Proof checklist */}
      <div style={{ marginBottom:'56px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'20px' }}>
          🧠 Qué demuestra este venture
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'10px' }}>
          {proof.map((p,i) => (
            <div key={i} style={{ background:'rgba(74,222,128,0.04)', border:'1px solid rgba(74,222,128,0.12)', borderRadius:'10px', padding:'12px 16px', display:'flex', gap:'10px', alignItems:'flex-start' }}>
              <span style={{ fontSize:'13px', color:'#4ade80', marginTop:'1px', flexShrink:0 }}>✓</span>
              <div>
                <div style={{ fontSize:'12px', fontWeight:600, color:'#fff', marginBottom:'2px' }}>{p.label}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', lineHeight:1.5 }}>{p.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background:C, border:`1px solid ${B}`, borderRadius:'16px', padding:'28px', marginBottom:'56px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'20px' }}>⚙️ Cómo funciona en la práctica</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {[
            { n:'01', t:'Pega tu documento en inglés', d:'Cotización de proveedor, contrato, instrucción de embarque, formulario de plataforma o correo de negociación — cualquier documento comercial.' },
            { n:'02', t:'IA analiza con contexto de comercio', d:'Claude lee el documento con un prompt específico de comercio exterior mexicano — no traducción genérica, sino inteligencia comercial.' },
            { n:'03', t:'Recibes análisis completo en español', d:'Resumen ejecutivo, términos clave explicados, ⚠️ cláusulas de riesgo destacadas y borrador de respuesta profesional listo para enviar.' },
            { n:'04', t:'Tú decides — Borderless propone', d:'Nunca firmamos ni comprometemos por ti. Toda salida es una propuesta. El dueño del negocio toma la decisión final siempre.' },
          ].map((s,i,arr) => (
            <div key={i} style={{ display:'flex', gap:'16px', paddingBottom:i<arr.length-1?'20px':0, borderBottom:i<arr.length-1?`1px solid ${B}`:'none', marginBottom:i<arr.length-1?'20px':0 }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:OB, border:`1px solid ${OBR}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700, color:O, flexShrink:0, fontFamily:'var(--font-geist-mono)' }}>{s.n}</div>
              <div>
                <div style={{ fontSize:'14px', fontWeight:600, color:'#fff', marginBottom:'4px' }}>{s.t}</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Version 2 Roadmap */}
      <div style={{ marginBottom:'56px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'20px' }}>🔮 Roadmap — Versión 2</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {roadmap.map((r,i) => (
            <div key={i} style={{ background:C, border:`1px solid ${B}`, borderLeft:`3px solid ${r.c}`, borderRadius:'0 10px 10px 0', padding:'13px 18px', display:'flex', alignItems:'center', gap:'12px' }}>
              <span style={{ fontSize:'20px', flexShrink:0 }}>{r.icon}</span>
              <div style={{ flex:1, fontSize:'13px', color:'rgba(255,255,255,0.75)', lineHeight:1.55 }}>{r.text}</div>
              <span style={{ fontSize:'10px', background:r.bg, color:r.c, padding:'3px 9px', borderRadius:'5px', flexShrink:0, fontWeight:600, border:`1px solid ${r.c}22` }}>{r.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk & guardrails */}
      <div style={{ background:'rgba(220,38,38,0.05)', border:'1px solid rgba(220,38,38,0.2)', borderRadius:'14px', padding:'24px 28px', marginBottom:'56px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(252,165,165,0.7)', marginBottom:'16px' }}>🛡️ Riesgos y guardarraíles</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'14px' }}>
          {[
            { r:'Riesgo de uso indebido', d:'PYME firma contrato complejo basado solo en IA. Guardarraíl: disclaimer obligatorio en cada output + checkpoint humano para situaciones de alto valor.' },
            { r:'Riesgo de sesgo', d:'IA conoce mejor corredores México-EE.UU. y México-China que otros. Mitigación: curar base de datos por corredor comercial en V2.' },
            { r:'Riesgo de incentivos', d:'Alianzas afiliadas podrían sesgar recomendaciones. Regla: cualquier partnership se divulga en UI y nunca influye el output de IA.' },
            { r:'Privacidad de datos', d:'Documentos contienen información comercial sensible. Política: documentos procesados via API, no almacenados en servidor. Aviso claro al usuario.' },
          ].map((item,i) => (
            <div key={i}>
              <div style={{ fontSize:'12px', fontWeight:600, color:'#fca5a5', marginBottom:'4px' }}>{item.r}</div>
              <div style={{ fontSize:'12px', color:'rgba(252,165,165,0.6)', lineHeight:1.55 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'16px', padding:'28px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px', flexWrap:'wrap' }}>
        <div>
          <div style={{ fontSize:'18px', fontWeight:700, color:'#fff', marginBottom:'6px' }}>¿Listo para analizar tu primer documento?</div>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>Pega cualquier cotización, contrato o instrucción de embarque en inglés y obtén análisis completo en español en 30 segundos.</div>
        </div>
        <a href="/core" style={{ background:O, color:'#fff', padding:'13px 26px', borderRadius:'10px', fontSize:'14px', fontWeight:700, textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>Analizar ahora →</a>
      </div>
    </div>
  )
}
