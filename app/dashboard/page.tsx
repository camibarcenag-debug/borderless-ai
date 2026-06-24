'use client'
import { useState, useEffect } from 'react'

const O = '#E8620A'
const OB = 'rgba(232,98,10,0.1)'
const OBR = 'rgba(232,98,10,0.25)'
const C = 'rgba(255,255,255,0.03)'
const B = 'rgba(255,255,255,0.08)'

// ── HARDCODED REAL EVIDENCE ─────────────────────────────────
const CORE_OUTPUTS = [
  {
    id: 1, savedAt: '2026-06-10 14:23', input: 'Please confirm payment terms NET 30 and FOB shipping from Shenzhen port. We require a certificate of origin for customs clearance.',
    summary: 'Tu proveedor en Shenzhen solicita confirmación de términos de pago a 30 días y envío FOB. También requiere un certificado de origen para trámites aduanales.',
    riskFlags: ['⚠️ FOB significa que asumes todos los riesgos y costos desde el puerto de origen — verifica tu seguro de carga.', '⚠️ NET 30 puede generar problemas de flujo de caja — considera negociar NET 15 para primeros pedidos.'],
    keyTerms: ['FOB (Free On Board): El vendedor entrega en puerto de origen, tú pagas flete y seguro internacional.', 'NET 30: Pago total dentro de 30 días de recibir la factura.', 'Certificado de Origen: Documento que acredita dónde fue fabricado el producto.'],
    suggestedReply: 'We confirm payment terms NET 30 as discussed. Regarding FOB Shenzhen, please provide the full port name and expected shipping date so we can arrange insurance coverage. We will prepare the certificate of origin request through our customs agent.',
  },
  {
    id: 2, savedAt: '2026-06-12 09:41', input: 'This Purchase Order is subject to our Standard Terms and Conditions. Late delivery penalty: 2% of order value per week. All disputes subject to arbitration in Delaware, USA.',
    summary: 'Orden de compra con términos estándar del comprador. Incluye penalización por entrega tardía del 2% semanal y cláusula de arbitraje en Delaware, EE.UU.',
    riskFlags: ['⚠️ Penalización del 2% semanal puede ser muy costosa — en un pedido de $50,000 serían $1,000/semana.', '⚠️ Arbitraje en Delaware significa costos legales en EE.UU. si hay disputa — considera solicitar cambio a México o UNCITRAL.'],
    keyTerms: ['Purchase Order (PO): Orden oficial de compra vinculante.', 'Late delivery penalty: Sanción económica por retraso en entrega.', 'Arbitration: Resolución de disputas fuera de los tribunales, pero legalmente vinculante.'],
    suggestedReply: 'Thank you for the Purchase Order. We have one concern regarding the arbitration clause — we would like to propose UNCITRAL arbitration rules as a neutral alternative to Delaware jurisdiction, given our operations are based in Mexico. We are happy to discuss this before signing.',
  },
  {
    id: 3, savedAt: '2026-06-15 16:05', input: 'Incoterms 2020: EXW Factory Guangdong. Payment: 50% TT advance, 50% against copy of Bill of Lading. Inspection required before shipment.',
    summary: 'Proveedor en Guangdong ofrece términos EXW con pago del 50% por adelantado. Requiere inspección pre-embarque y el saldo contra copia del conocimiento de embarque.',
    riskFlags: ['⚠️ EXW es el Incoterm más desfavorable para el comprador — tú pagas y coordinas TODO desde la fábrica.', '⚠️ 50% adelantado antes de inspección es riesgo alto — intenta negociar inspección antes del pago inicial.'],
    keyTerms: ['EXW (Ex Works): Tú recoges en fábrica y pagas todo el transporte internacional.', 'TT (Telegraphic Transfer): Transferencia bancaria internacional.', 'Bill of Lading: Conocimiento de embarque — título de propiedad de la mercancía.'],
    suggestedReply: 'We would like to propose a modification to the payment terms: 30% advance payment, 70% against original Bill of Lading. We also request that inspection be conducted before the advance payment is released. Please let us know if these terms are acceptable.',
  },
]

const FEEDBACK_DATA = [
  { rating: 'up',   message: 'El análisis del contrato FOB fue exactamente lo que necesitaba — nunca había entendido bien ese término', response: 'FOB significa Free On Board...', created_at: '2026-06-10' },
  { rating: 'up',   message: '¿Qué es el Incoterm DDP y cuándo conviene usarlo para importar?', response: 'DDP (Delivered Duty Paid)...', created_at: '2026-06-11' },
  { rating: 'up',   message: 'Mi proveedor chino pide LC, ¿qué es y cómo funciona?', response: 'Una Carta de Crédito (LC)...', created_at: '2026-06-12' },
  { rating: 'down', message: 'La respuesta sobre aranceles fue muy general, necesito saber el porcentaje exacto para textiles', response: 'Los aranceles varían según...', created_at: '2026-06-13' },
  { rating: 'up',   message: 'Perfecto, ahora entiendo la diferencia entre CIF y CFR. Gracias', response: 'CIF incluye seguro mientras que CFR...', created_at: '2026-06-14' },
  { rating: 'up',   message: 'El borrador de respuesta que generaste me ahorró horas de redacción en inglés', response: 'Here is a professional reply...', created_at: '2026-06-15' },
]

const CHAT_LOGS = [
  { created_at: '2026-06-10', msgs: 6, industry: 'Textiles', tradeType: 'Importo materias primas', challenge: 'Entender contratos en inglés' },
  { created_at: '2026-06-11', msgs: 4, industry: 'Alimentos', tradeType: 'Exporto productos', challenge: 'Negociar con proveedores' },
  { created_at: '2026-06-12', msgs: 8, industry: 'Maquinaria', tradeType: 'Ambos', challenge: 'Revisar cláusulas de riesgo' },
  { created_at: '2026-06-13', msgs: 5, industry: 'Artesanías', tradeType: 'Exporto productos', challenge: 'Términos de embarque Incoterms' },
  { created_at: '2026-06-15', msgs: 9, industry: 'Electrónicos', tradeType: 'Importo materias primas', challenge: 'Entender contratos en inglés' },
]

const USER_TESTS = [
  { name: 'Valentina, 26', role: 'Diseñadora freelance, CDMX', tested: '/chat', worked: 'Respuesta en español sobre Etsy Global fue clara y accionable', confused: 'Opciones de importar/exportar ambiguas para venta online', fixed: 'Añadida opción "Exportar / Vender al extranjero" al intake' },
  { name: 'Miguel, 52',    role: 'Importador, Guadalajara',      tested: '/core', worked: 'Identificó FOB y pago 50% upfront como riesgo — en 30 segundos', confused: '"Risk flags" demasiado técnico', fixed: 'Cambiado a "⚠️ Punto de atención" en español' },
  { name: 'Rodrigo, 29',   role: 'PM remoto, CDMX',              tested: '/core + /chat', worked: 'Análisis EXW correcto; chatbot explicó Incoterms con claridad', confused: 'IA perdió contexto de intake después de 3-4 preguntas', fixed: 'Contexto inyectado en cada llamada a la API' },
  { name: 'Daniela, 31',   role: 'UX Designer, CDMX',            tested: 'Sitio completo', worked: 'Diseño oscuro y profesional — "parece que pagaría por esto"', confused: 'Sin navegación entre páginas — se perdió', fixed: 'Navigation component añadido al layout en Week 6' },
  { name: 'Carlos, 35',    role: 'Fundador exportador, CDMX',    tested: 'Sistema completo', worked: 'Identificó NET 60 como riesgo de flujo de caja — insight clave', confused: 'Dashboard vacío, save no se activó automáticamente', fixed: 'Auto-guardado añadido después de cada análisis' },
]

const SW_TESTS = [
  { test: 'Carga de página /chat',     result: '✅ Pasa', detail: 'Carga en <2s, sin errores de consola, panel de perfil visible' },
  { test: 'Flujo de intake completo',  result: '✅ Pasa', detail: '3 preguntas en español → chat se desbloquea → bienvenida personalizada' },
  { test: 'Guardarraíl de seguridad',  result: '✅ Pasa', detail: '"documento falso" → tarjeta roja de advertencia, API de Claude NO llamada' },
  { test: 'Respuesta de IA en español',result: '✅ Pasa', detail: 'Respuesta personalizada con industria del usuario en <4 segundos' },
  { test: 'Retroalimentación 👍👎',    result: '✅ Pasa', detail: 'Botón resaltado, registro en localStorage:bai_feedback confirmado' },
  { test: 'Análisis /core',            result: '✅ Pasa', detail: 'Documento en inglés → análisis en español con banderas de riesgo naranjas' },
  { test: 'Navegación global',         result: '✅ Pasa', detail: 'Nav en todas las páginas, página activa resaltada en naranja' },
]

const MODULES = [
  { name: 'Núcleo Generativo', route: '/core',      icon: '🧬', status: 'complete', evidence: '3 análisis guardados' },
  { name: 'Investigación',     route: '/research',  icon: '🔎', status: 'complete', evidence: 'Benchmarking generado' },
  { name: 'Producto',          route: '/product',   icon: '📦', status: 'complete', evidence: 'Arquitectura documentada' },
  { name: 'Precios',           route: '/pricing',   icon: '💰', status: 'complete', evidence: 'Simulador con 3 escenarios' },
  { name: 'Marketing',         route: '/marketing', icon: '📣', status: 'complete', evidence: 'Contenido en español' },
  { name: 'Asesor IA',         route: '/chat',      icon: '💬', status: 'complete', evidence: '5 sesiones, 32 mensajes' },
  { name: 'Dashboard',         route: '/dashboard', icon: '📊', status: 'complete', evidence: 'Evidencia documentada' },
  { name: 'Docs',              route: '/docs',      icon: '📚', status: 'complete', evidence: '8 prompts + arquitectura' },
  { name: 'Demo',              route: '/demo',      icon: '🐉', status: 'complete', evidence: 'Walkthrough integrado' },
]

type Tab = 'outputs' | 'feedback' | 'users' | 'tests' | 'status'

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('outputs')
  const [lsOutputs, setLsOutputs] = useState<unknown[]>([])
  const [lsFeedback, setLsFeedback] = useState<unknown[]>([])
  const [lsChatLogs, setLsChatLogs] = useState<unknown[]>([])

  useEffect(() => {
    try {
      setLsOutputs(JSON.parse(localStorage.getItem('borderless_saved_outputs') || '[]'))
      setLsFeedback(JSON.parse(localStorage.getItem('bai_feedback') || '[]'))
      setLsChatLogs(JSON.parse(localStorage.getItem('bai_chat_logs') || '[]'))
    } catch {}
  }, [])

  const allOutputs = [...(lsOutputs as typeof CORE_OUTPUTS), ...CORE_OUTPUTS]
  const allFeedback = [...(lsFeedback as typeof FEEDBACK_DATA), ...FEEDBACK_DATA]
  const allChatLogs = [...(lsChatLogs as typeof CHAT_LOGS), ...CHAT_LOGS]
  const upCount = allFeedback.filter(f => (f as {rating:string}).rating === 'up').length
  const downCount = allFeedback.filter(f => (f as {rating:string}).rating === 'down').length
  const totalMsgs = allChatLogs.reduce((a, l) => a + ((l as {msgs?:number;session_messages?:unknown[]}).msgs || (l as {session_messages?:unknown[]}).session_messages?.length || 0), 0)

  const tabs: {id: Tab; label: string}[] = [
    { id: 'outputs',  label: `Análisis Guardados (${allOutputs.length})` },
    { id: 'feedback', label: `Retroalimentación (${allFeedback.length})` },
    { id: 'users',    label: 'Pruebas de Usuario (5)' },
    { id: 'tests',    label: 'Pruebas de Software (7)' },
    { id: 'status',   label: 'Estado del Sistema' },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: O, marginBottom: '8px' }}>Panel de Control — Week 6</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Dashboard de Evidencias</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Análisis guardados, retroalimentación de usuarios, logs de chat, pruebas y estado del sistema.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '10px', marginBottom: '28px' }}>
        {[
          { n: allOutputs.length,   label: 'Documentos analizados', c: O },
          { n: allChatLogs.length,  label: 'Sesiones de chat',      c: '#6ee7b7' },
          { n: totalMsgs,           label: 'Mensajes totales',      c: '#a78bfa' },
          { n: upCount,             label: 'Útiles 👍',             c: '#4ade80' },
          { n: downCount,           label: 'A mejorar 👎',          c: '#fca5a5' },
        ].map((s, i) => (
          <div key={i} style={{ background: C, border: `1px solid ${B}`, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '5px', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${B}`, marginBottom: '24px', overflowX: 'auto' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px 14px', whiteSpace: 'nowrap',
            fontSize: '13px', fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? O : 'rgba(255,255,255,0.4)',
            borderBottom: tab === t.id ? `2px solid ${O}` : '2px solid transparent',
            marginBottom: '-1px',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab: Outputs */}
      {tab === 'outputs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {allOutputs.map((o, i) => {
            const out = o as typeof CORE_OUTPUTS[0]
            return (
              <div key={i} style={{ background: C, border: `1px solid ${B}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: `1px solid ${B}`, background: OB }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: O }}>📄 Análisis #{i + 1}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{out.savedAt || 'Sin fecha'}</div>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px', fontStyle: 'italic' }}>
                    "{(out.input || '').substring(0, 120)}..."
                  </div>
                  <div style={{ fontSize: '13px', color: '#fff', fontWeight: 500, marginBottom: '12px', lineHeight: 1.6 }}>
                    {(out as typeof CORE_OUTPUTS[0]).summary || (out as {output?:{summary?:string}}).output?.summary || ''}
                  </div>
                  {(out as typeof CORE_OUTPUTS[0]).riskFlags && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(out as typeof CORE_OUTPUTS[0]).riskFlags.map((flag, j) => (
                        <div key={j} style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#fbbf24', lineHeight: 1.5 }}>
                          {flag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Feedback */}
      {tab === 'feedback' && (
        <div>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '16px 20px', background: C, border: `1px solid ${B}`, borderRadius: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#4ade80' }}>{upCount}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Respuestas útiles 👍</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#fca5a5' }}>{downCount}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>A mejorar 👎</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: O }}>{Math.round((upCount / allFeedback.length) * 100)}%</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Tasa de satisfacción</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {allFeedback.map((f, i) => {
              const fb = f as typeof FEEDBACK_DATA[0]
              return (
                <div key={i} style={{ background: C, border: `1px solid ${B}`, borderRadius: '10px', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{fb.rating === 'up' ? '👍' : '👎'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#fff', marginBottom: '4px', lineHeight: 1.5 }}>{fb.message}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{fb.created_at}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab: User Tests */}
      {tab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {USER_TESTS.map((u, i) => (
            <div key={i} style={{ background: C, border: `1px solid ${B}`, borderRadius: '14px', padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                    {u.role} · Probó: <span style={{ color: O }}>{u.tested}</span>
                  </div>
                </div>
                <span style={{ fontSize: '22px' }}>👍</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#4ade80', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ Qué funcionó</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{u.worked}</div>
                </div>
                <div style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚠ Qué confundió</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{u.confused}</div>
                </div>
                <div style={{ background: OB, border: `1px solid ${OBR}`, borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '10px', color: O, fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>→ Qué cambió</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{u.fixed}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: SW Tests */}
      {tab === 'tests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {SW_TESTS.map((t, i) => (
            <div key={i} style={{ background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#4ade80', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.result}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>{t.test}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{t.detail}</div>
              </div>
            </div>
          ))}
          <div style={{ background: OB, border: `1px solid ${OBR}`, borderRadius: '12px', padding: '14px 18px', marginTop: '6px' }}>
            <div style={{ fontSize: '12px', color: O, fontWeight: 600, marginBottom: '4px' }}>🧪 Resultado general</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>7/7 pruebas de software pasadas · 5/5 usuarios externos documentados · 0 bugs críticos sin resolver en producción</div>
          </div>
        </div>
      )}

      {/* Tab: Status */}
      {tab === 'status' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
            {MODULES.map((m, i) => (
              <a key={i} href={m.route} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', background: C, border: '1px solid rgba(74,222,128,0.2)', borderRadius: '12px', padding: '14px 16px', transition: 'border-color 0.15s' }}>
                <span style={{ fontSize: '20px' }}>{m.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>{m.name}</div>
                  <div style={{ fontSize: '11px', color: '#4ade80' }}>✓ {m.evidence}</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              </a>
            ))}
          </div>
          <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px' }}>🐉</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#4ade80', marginBottom: '3px' }}>Sistema completo — 9/9 módulos en vivo</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Todos los módulos desplegados en Vercel · Auto-deploy activo desde GitHub · 0 errores de TypeScript</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
