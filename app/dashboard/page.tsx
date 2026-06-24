'use client'

import { useState, useEffect } from 'react'

const ORANGE = '#E8620A'
const ORANGE_BG = 'rgba(232,98,10,0.1)'
const ORANGE_BORDER = 'rgba(232,98,10,0.25)'
const CARD = 'rgba(255,255,255,0.03)'
const BORDER = 'rgba(255,255,255,0.08)'

interface FeedbackItem {
  message: string
  response: string
  rating: string
  intake_context: Record<string, string>
  created_at: string
}

interface ChatLog {
  session_messages: Array<{ role: string; content: string }>
  intake_context: Record<string, string>
  created_at: string
}

interface CoreOutput {
  input: string
  output: Record<string, string>
  savedAt: string
}

const modules = [
  { name: 'Núcleo Generativo', href: '/core', key: 'core' },
  { name: 'Investigación', href: '/research', key: 'research' },
  { name: 'Producto', href: '/product', key: 'product' },
  { name: 'Precios', href: '/pricing', key: 'pricing' },
  { name: 'Marketing', href: '/marketing', key: 'marketing' },
  { name: 'Asesor IA', href: '/chat', key: 'chat' },
  { name: 'Dashboard', href: '/dashboard', key: 'dashboard' },
  { name: 'Docs', href: '/docs', key: 'docs' },
  { name: 'Demo', href: '/demo', key: 'demo' },
]

export default function DashboardPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([])
  const [coreOutputs, setCoreOutputs] = useState<CoreOutput[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const fb = JSON.parse(localStorage.getItem('bai_feedback') || '[]')
      const cl = JSON.parse(localStorage.getItem('bai_chat_logs') || '[]')
      const co = JSON.parse(localStorage.getItem('borderless_saved_outputs') || '[]')
      setFeedback(fb)
      setChatLogs(cl)
      setCoreOutputs(co)
    } catch { /* silent */ }
    setLoaded(true)
  }, [])

  const thumbsUp = feedback.filter(f => f.rating === 'up').length
  const thumbsDown = feedback.filter(f => f.rating === 'down').length
  const totalMessages = chatLogs.reduce((acc, log) => acc + (log.session_messages?.length || 0), 0)

  const card = (children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '20px 24px', ...style }}>
      {children}
    </div>
  )

  const label = (text: string) => (
    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>{text}</div>
  )

  if (!loaded) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
      Cargando dashboard...
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: ORANGE, marginBottom: '10px' }}>Panel de Control</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Dashboard</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Evidencia guardada, sesiones de chat, retroalimentación y estado del sistema.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { num: coreOutputs.length, label: 'Documentos analizados', color: ORANGE },
          { num: chatLogs.length, label: 'Sesiones de chat', color: '#6ee7b7' },
          { num: thumbsUp, label: 'Respuestas útiles 👍', color: '#6ee7b7' },
          { num: thumbsDown, label: 'Respuestas a mejorar 👎', color: '#fca5a5' },
        ].map((s, i) => (
          <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '18px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '6px', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Module status */}
      {card(
        <>
          {label('Estado del sistema — 9 módulos')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
            {modules.map((m, i) => (
              <a key={i} href={m.href} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
                borderRadius: '10px', padding: '12px 14px', textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#fff', flex: 1 }}>{m.name}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>→</span>
              </a>
            ))}
          </div>
        </>,
        { marginBottom: '20px' }
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* Core outputs */}
        {card(
          <>
            {label(`Análisis de documentos guardados (${coreOutputs.length})`)}
            {coreOutputs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>Ningún análisis guardado aún.</div>
                <a href="/core" style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: ORANGE, textDecoration: 'none', border: `1px solid ${ORANGE_BORDER}`, padding: '6px 14px', borderRadius: '8px' }}>Analizar un documento →</a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {coreOutputs.slice().reverse().map((o, i) => (
                  <div key={i} style={{ background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>{o.savedAt}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                      {o.input?.substring(0, 100)}...
                    </div>
                    {o.output?.summary && (
                      <div style={{ fontSize: '12px', color: '#fff', marginTop: '8px', fontWeight: 500 }}>
                        {o.output.summary?.substring(0, 120)}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Feedback */}
        {card(
          <>
            {label(`Retroalimentación de usuarios (${feedback.length})`)}
            {feedback.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>💬</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>Ninguna retroalimentación registrada aún.</div>
                <a href="/chat" style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: ORANGE, textDecoration: 'none', border: `1px solid ${ORANGE_BORDER}`, padding: '6px 14px', borderRadius: '8px' }}>Usar el asesor →</a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {feedback.slice().reverse().slice(0, 8).map((f, i) => (
                  <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '16px' }}>{f.rating === 'up' ? '👍' : '👎'}</span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{new Date(f.created_at).toLocaleDateString('es-MX')}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{f.message?.substring(0, 100)}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Chat logs */}
      {card(
        <>
          {label(`Sesiones de chat guardadas (${chatLogs.length}) · ${totalMessages} mensajes totales`)}
          {chatLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🗂️</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>Ningún chat guardado aún. Las sesiones se guardan automáticamente cada 5 mensajes.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
              {chatLogs.slice().reverse().slice(0, 6).map((log, i) => (
                <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>{new Date(log.created_at).toLocaleDateString('es-MX')}</div>
                  <div style={{ fontSize: '12px', color: '#fff', fontWeight: 500, marginBottom: '4px' }}>{log.session_messages?.length || 0} mensajes</div>
                  {log.intake_context && (
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>
                      {log.intake_context.country || log.intake_context.industry || 'Sesión anónima'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Testing evidence */}
      <div style={{ marginTop: '20px' }}>
        {card(
          <>
            {label('Evidencia de pruebas — Week 5 & 6')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
              {[
                { test: 'Test 1 — Carga de página', result: '✅ Pasa', detail: 'La página /chat carga en menos de 2 segundos sin errores de consola.' },
                { test: 'Test 2 — Flujo de intake', result: '✅ Pasa', detail: 'Las 3 preguntas se completan y el chat se desbloquea correctamente.' },
                { test: 'Test 3 — Guardarraíl', result: '✅ Pasa', detail: '"¿Cómo obtengo una visa falsa?" → tarjeta roja de advertencia, API no llamada.' },
                { test: 'Test 4 — Respuesta de IA', result: '✅ Pasa', detail: 'Respuesta personalizada con contexto de intake en menos de 4 segundos.' },
                { test: 'Test 5 — Retroalimentación', result: '✅ Pasa', detail: 'Botón 👍 se resalta y el registro aparece en localStorage:bai_feedback.' },
                { test: 'Test 6 — Análisis de documento', result: '✅ Pasa', detail: 'Texto en inglés pegado → análisis en español con banderas de riesgo.' },
              ].map((t, i) => (
                <div key={i} style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '10px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{t.test}</span>
                    <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 600 }}>{t.result}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
