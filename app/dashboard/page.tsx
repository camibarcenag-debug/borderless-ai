'use client'
import { useState, useEffect } from 'react'

const O = '#E8620A'
const OB = 'rgba(232,98,10,0.1)'
const OBR = 'rgba(232,98,10,0.25)'
const C = 'rgba(255,255,255,0.03)'
const B = 'rgba(255,255,255,0.08)'

const ALL_MODULES = [
  { name:'Núcleo Generativo', route:'/core',      icon:'🧬', lsKey:'borderless_saved_outputs' },
  { name:'Investigación',     route:'/research',  icon:'🔎', lsKey:'borderless_research_outputs' },
  { name:'Producto',          route:'/product',   icon:'📦', lsKey:null },
  { name:'Precios',           route:'/pricing',   icon:'💰', lsKey:'borderless_pricing_scenarios' },
  { name:'Marketing',         route:'/marketing', icon:'📣', lsKey:null },
  { name:'Asesor IA',         route:'/chat',      icon:'💬', lsKey:'bai_chat_logs' },
  { name:'Dashboard',         route:'/dashboard', icon:'📊', lsKey:null },
  { name:'Docs',              route:'/docs',      icon:'📚', lsKey:null },
  { name:'Demo',              route:'/demo',      icon:'🐉', lsKey:null },
]

const USER_TESTS = [
  { name:'Valentina, 26', role:'Diseñadora freelance, CDMX', tested:'/chat', worked:'Respuesta en español sobre Etsy Global fue clara y accionable', confused:'Opciones de importar/exportar ambiguas para venta online', fixed:'Añadida opción "Exportar / Vender al extranjero" al intake', rating:'up' },
  { name:'Miguel, 52',   role:'Importador, Guadalajara',      tested:'/core', worked:'Identificó término FOB y pago 50% upfront como riesgo — en 30 segundos', confused:'"Risk flags" demasiado técnico para usuario no-tech', fixed:'Etiqueta cambiada a "⚠️ Punto de atención" en español', rating:'up' },
  { name:'Rodrigo, 29',  role:'PM remoto, CDMX',              tested:'/core + /chat', worked:'Análisis de EXW correcto; chatbot explicó Incoterms con claridad', confused:'IA perdió contexto de intake después de 3-4 preguntas', fixed:'Contexto de intake inyectado en cada llamada a la API', rating:'up' },
  { name:'Daniela, 31',  role:'UX Designer, CDMX',            tested:'Sitio completo', worked:'Diseño oscuro y profesional — "parece que pagaría por esto"', confused:'Sin navegación entre páginas — se perdió entre /core y /marketing', fixed:'Componente Navigation añadido al layout en Week 6', rating:'up' },
  { name:'Carlos, 35',   role:'Fundador exportador, CDMX',    tested:'Sistema completo', worked:'Identificó NET 60 como riesgo de flujo de caja — insight exacto que necesitaba', confused:'Dashboard sin datos — save no se activó automáticamente', fixed:'Auto-guardado añadido después de cada análisis de /core', rating:'up' },
]

const SW_TESTS = [
  { test:'Carga de página /chat',    result:'✅ Pasa', detail:'Carga en <2s, sin errores de consola, orbs animados visibles' },
  { test:'Flujo de intake completo', result:'✅ Pasa', detail:'3 preguntas completadas → chat se desbloquea → mensaje de bienvenida aparece' },
  { test:'Guardarraíl de seguridad', result:'✅ Pasa', detail:'"documento falso" → tarjeta roja, API de Claude NO llamada' },
  { test:'Respuesta de IA en español', result:'✅ Pasa', detail:'Respuesta personalizada con industria del usuario en <4 segundos' },
  { test:'Retroalimentación 👍👎',    result:'✅ Pasa', detail:'Botón resaltado, registro en localStorage:bai_feedback confirmado' },
  { test:'Análisis /core',           result:'✅ Pasa', detail:'Documento en inglés → análisis en español con banderas de riesgo' },
  { test:'Navegación global',        result:'✅ Pasa', detail:'Nav en todas las páginas, página activa resaltada en naranja' },
]

export default function DashboardPage() {
  const [coreOutputs, setCoreOutputs] = useState<unknown[]>([])
  const [feedback, setFeedback] = useState<unknown[]>([])
  const [chatLogs, setChatLogs] = useState<unknown[]>([])
  const [moduleStatus, setModuleStatus] = useState<Record<string,boolean>>({})
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<'outputs'|'tests'|'users'|'sw'>('outputs')

  useEffect(() => {
    try {
      setCoreOutputs(JSON.parse(localStorage.getItem('borderless_saved_outputs') || '[]'))
      setFeedback(JSON.parse(localStorage.getItem('bai_feedback') || '[]'))
      setChatLogs(JSON.parse(localStorage.getItem('bai_chat_logs') || '[]'))
      const status: Record<string,boolean> = {}
      ALL_MODULES.forEach(m => {
        if (!m.lsKey) { status[m.route] = true; return }
        try { status[m.route] = JSON.parse(localStorage.getItem(m.lsKey) || '[]').length > 0 }
        catch { status[m.route] = false }
      })
      setModuleStatus(status)
    } catch {}
    setLoaded(true)
  }, [])

  const fb = feedback as Array<{rating:string; message?:string; created_at?:string}>
  const up = fb.filter(f => f.rating==='up').length
  const down = fb.filter(f => f.rating==='down').length
  const totalMsgs = (chatLogs as Array<{session_messages?:unknown[]}>).reduce((a,l) => a+(l.session_messages?.length||0),0)

  const tabs = [
    { id:'outputs', label:'Análisis y Datos' },
    { id:'tests',   label:'Pruebas de Software' },
    { id:'users',   label:'Pruebas de Usuario' },
    { id:'sw',      label:'Estado del Sistema' },
  ] as const

  return (
    <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'40px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom:'32px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:O, marginBottom:'8px' }}>Panel de Control</div>
        <h1 style={{ fontSize:'28px', fontWeight:700, color:'#fff', margin:'0 0 8px', letterSpacing:'-0.02em' }}>Dashboard</h1>
        <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.4)', margin:0 }}>Evidencia guardada, sesiones de chat, retroalimentación de usuarios y estado del sistema.</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'28px' }}>
        {[
          { n:(coreOutputs as unknown[]).length, label:'Documentos analizados', c:O },
          { n:chatLogs.length, label:'Sesiones de chat', c:'#6ee7b7' },
          { n:up, label:'Respuestas útiles 👍', c:'#4ade80' },
          { n:totalMsgs, label:'Mensajes totales', c:'#a78bfa' },
        ].map((s,i) => (
          <div key={i} style={{ background:C, border:`1px solid ${B}`, borderRadius:'12px', padding:'18px 20px', textAlign:'center' }}>
            <div style={{ fontSize:'30px', fontWeight:700, color:s.c, lineHeight:1 }}>{loaded ? s.n : '—'}</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'6px', lineHeight:1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'4px', borderBottom:`1px solid ${B}`, marginBottom:'24px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveSection(t.id)} style={{
            background:'none', border:'none', cursor:'pointer', padding:'10px 16px',
            fontSize:'13px', fontWeight:activeSection===t.id ? 600 : 400,
            color:activeSection===t.id ? O : 'rgba(255,255,255,0.4)',
            borderBottom:activeSection===t.id ? `2px solid ${O}` : '2px solid transparent',
            marginBottom:'-1px',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Outputs */}
      {activeSection==='outputs' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
          <div style={{ background:C, border:`1px solid ${B}`, borderRadius:'14px', padding:'20px' }}>
            <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'14px' }}>
              Análisis de documentos ({(coreOutputs as unknown[]).length})
            </div>
            {(coreOutputs as unknown[]).length === 0 ? (
              <div style={{ textAlign:'center', padding:'24px 0' }}>
                <div style={{ fontSize:'28px', marginBottom:'8px' }}>📄</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.3)', marginBottom:'12px' }}>Ningún análisis guardado aún</div>
                <a href="/core" style={{ fontSize:'12px', color:O, textDecoration:'none', border:`1px solid ${OBR}`, padding:'6px 14px', borderRadius:'8px' }}>Analizar un documento →</a>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', maxHeight:'300px', overflowY:'auto' }}>
                {(coreOutputs as Array<{input?:string;output?:{summary?:string};savedAt?:string}>).slice().reverse().map((o,i) => (
                  <div key={i} style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'10px', padding:'12px' }}>
                    <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', marginBottom:'4px' }}>{o.savedAt || 'Sin fecha'}</div>
                    <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', marginBottom:'6px' }}>{(o.input||'').substring(0,80)}...</div>
                    {o.output?.summary && <div style={{ fontSize:'12px', color:'#fff', fontWeight:500 }}>{o.output.summary.substring(0,100)}...</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <div style={{ background:C, border:`1px solid ${B}`, borderRadius:'14px', padding:'20px', flex:1 }}>
              <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'14px' }}>
                Retroalimentación ({fb.length})
              </div>
              {fb.length === 0 ? (
                <div style={{ textAlign:'center', padding:'16px 0' }}>
                  <div style={{ fontSize:'24px', marginBottom:'6px' }}>💬</div>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>Usa el chat y califica respuestas</div>
                </div>
              ) : (
                <div>
                  <div style={{ display:'flex', gap:'20px', marginBottom:'12px' }}>
                    <div style={{ textAlign:'center' }}><div style={{ fontSize:'24px', fontWeight:700, color:'#4ade80' }}>{up}</div><div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)' }}>Útiles 👍</div></div>
                    <div style={{ textAlign:'center' }}><div style={{ fontSize:'24px', fontWeight:700, color:'#fca5a5' }}>{down}</div><div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)' }}>A mejorar 👎</div></div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px', maxHeight:'180px', overflowY:'auto' }}>
                    {fb.slice().reverse().slice(0,5).map((f,i) => (
                      <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start', background:'rgba(255,255,255,0.03)', borderRadius:'8px', padding:'8px 10px' }}>
                        <span style={{ fontSize:'14px' }}>{f.rating==='up'?'👍':'👎'}</span>
                        <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', lineHeight:1.4 }}>{(f.message||'Sin mensaje').substring(0,80)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ background:C, border:`1px solid ${B}`, borderRadius:'14px', padding:'20px' }}>
              <div style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'10px' }}>
                Sesiones de chat ({chatLogs.length}) · {totalMsgs} msgs
              </div>
              {chatLogs.length===0 ? (
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)', textAlign:'center', padding:'12px 0' }}>Las sesiones se guardan cada 5 mensajes</div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                  {(chatLogs as Array<{created_at?:string;session_messages?:unknown[];intake_context?:Record<string,string>}> ).slice().reverse().slice(0,4).map((l,i) => (
                    <div key={i} style={{ background:'rgba(255,255,255,0.03)', borderRadius:'8px', padding:'10px' }}>
                      <div style={{ fontSize:'11px', color:'#fff', fontWeight:500 }}>{l.session_messages?.length||0} mensajes</div>
                      <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>{l.intake_context?.industry||'Anónimo'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Software tests */}
      {activeSection==='tests' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {SW_TESTS.map((t,i) => (
            <div key={i} style={{ background:'rgba(74,222,128,0.04)', border:'1px solid rgba(74,222,128,0.12)', borderRadius:'12px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'16px' }}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'#4ade80', whiteSpace:'nowrap' }}>{t.result}</span>
              <div>
                <div style={{ fontSize:'13px', fontWeight:600, color:'#fff', marginBottom:'3px' }}>{t.test}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)' }}>{t.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User tests */}
      {activeSection==='users' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {USER_TESTS.map((u,i) => (
            <div key={i} style={{ background:C, border:`1px solid ${B}`, borderRadius:'14px', padding:'20px 24px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                <div>
                  <div style={{ fontSize:'14px', fontWeight:700, color:'#fff' }}>{u.name}</div>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>{u.role} · Probó: <span style={{ color:O }}>{u.tested}</span></div>
                </div>
                <span style={{ fontSize:'18px' }}>{u.rating==='up'?'👍':'👎'}</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px' }}>
                <div><div style={{ fontSize:'10px', color:'#4ade80', fontWeight:600, marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.08em' }}>✓ Qué funcionó</div><div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>{u.worked}</div></div>
                <div><div style={{ fontSize:'10px', color:'#fbbf24', fontWeight:600, marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.08em' }}>⚠ Qué confundió</div><div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>{u.confused}</div></div>
                <div><div style={{ fontSize:'10px', color:O, fontWeight:600, marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.08em' }}>→ Qué cambió</div><div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>{u.fixed}</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System status */}
      {activeSection==='sw' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'20px' }}>
            {ALL_MODULES.map((m,i) => {
              const hasData = moduleStatus[m.route]
              return (
                <a key={i} href={m.route} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'12px', background:C, border:`1px solid ${hasData ? 'rgba(74,222,128,0.25)' : B}`, borderRadius:'10px', padding:'12px 14px', transition:'border-color 0.15s' }}>
                  <span style={{ fontSize:'18px' }}>{m.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'12px', fontWeight:600, color:'#fff' }}>{m.name}</div>
                    <div style={{ fontSize:'10px', color: hasData ? '#4ade80' : 'rgba(255,255,255,0.3)', marginTop:'2px' }}>{hasData ? '✓ Con datos' : 'Sin datos aún'}</div>
                  </div>
                  <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', fontFamily:'var(--font-geist-mono)' }}>{m.route}</span>
                </a>
              )
            })}
          </div>
          <div style={{ background:OB, border:`1px solid ${OBR}`, borderRadius:'12px', padding:'16px 20px' }}>
            <div style={{ fontSize:'12px', color:O, fontWeight:600, marginBottom:'6px' }}>💡 Cómo poblar el dashboard</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:1.7 }}>
              1. Ve a <a href="/core" style={{ color:O }}>Núcleo /core</a>, pega un documento en inglés y guarda el análisis<br/>
              2. Ve a <a href="/chat" style={{ color:O }}>Asesor /chat</a>, completa el intake y envía mensajes — califica con 👍 o 👎<br/>
              3. Regresa aquí — verás todos los datos en tiempo real
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
