'use client'

const ORANGE = '#E8620A'
const ORANGE_BG = 'rgba(232,98,10,0.1)'
const ORANGE_BORDER = 'rgba(232,98,10,0.25)'
const CARD = 'rgba(255,255,255,0.03)'
const BORDER = 'rgba(255,255,255,0.08)'

const modules = [
  { icon: '🧬', name: 'Núcleo Generativo', href: '/core', route: '/core', desc: 'Analiza documentos de comercio en inglés y entrega resumen en español con banderas de riesgo y respuesta sugerida.' },
  { icon: '🔎', name: 'Investigación', href: '/research', route: '/research', desc: 'Benchmarking competitivo contra Google Translate, DeepL y consultores de comercio exterior. Análisis del mercado PYME.' },
  { icon: '📦', name: 'Producto', href: '/product', route: '/product', desc: 'Arquitectura del producto, mapa de funcionalidades, stack tecnológico e integración con bancos y agencias.' },
  { icon: '💰', name: 'Precios', href: '/pricing', route: '/pricing', desc: 'Simulador de ingresos con 3 escenarios: Conservador, Esperado y Agresivo. MRR, ARR y churn proyectados.' },
  { icon: '📣', name: 'Marketing', href: '/marketing', route: '/marketing', desc: 'Motor de contenido en español para PYMES exportadoras. Posts, guiones de video, calendario editorial y copys.' },
  { icon: '💬', name: 'Asesor IA', href: '/chat', route: '/chat', desc: 'Chat en español con intake de 3 preguntas, respuestas personalizadas, guardarraíles de seguridad y checkpoint humano.' },
  { icon: '📊', name: 'Dashboard', href: '/dashboard', route: '/dashboard', desc: 'Panel de evidencias: análisis guardados, logs de chat, retroalimentación de usuarios y estado de todos los módulos.' },
  { icon: '📚', name: 'Docs', href: '/docs', route: '/docs', desc: 'Biblioteca de prompts, notas de arquitectura y log de construcción semanal con toda la evidencia del curso.' },
]

const impacts = [
  { stat: '95%', desc: 'de negocios en México son PYMES', sub: 'La mayoría sin staff con inglés fluido' },
  { stat: '30s', desc: 'para entender cualquier contrato', sub: 'vs días esperando un traductor' },
  { stat: '$0', desc: 'abogado necesario para la primera lectura', sub: 'Claridad inmediata en español' },
]

const roadmap = [
  { tag: 'Feature', color: ORANGE, bg: ORANGE_BG, icon: '📎', text: 'Carga de documentos — lee y analiza PDFs y Word directamente sin copiar texto' },
  { tag: 'Feature', color: ORANGE, bg: ORANGE_BG, icon: '🈯', text: 'Entrada en chino mandarín — analiza documentos de proveedores chinos directamente en español' },
  { tag: 'Backend', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', icon: '🗄️', text: 'Supabase — cuentas de usuario, historial de análisis y acceso multidispositivo' },
  { tag: 'Enterprise', color: '#6ee7b7', bg: 'rgba(110,231,183,0.1)', icon: '🏦', text: 'API white-label para bancos y agencias de exportación (Banorte, BBVA MX, INADEM)' },
  { tag: 'UX', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', icon: '🗺️', text: 'Tour guiado del producto con indicador de progreso entre los 10 módulos' },
]

export default function DemoPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)', fontSize: '11px', fontWeight: 600, padding: '5px 14px', borderRadius: '20px', marginBottom: '20px', letterSpacing: '0.04em' }}>
          ✓ Sistema final integrado — 10 módulos en vivo
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Tu co-piloto para el<br />
          <span style={{ background: 'linear-gradient(135deg,#E8620A,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>comercio global</span>
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '540px', margin: '0 auto 28px', lineHeight: 1.7 }}>
          Borderless elimina la barrera del inglés para PYMES mexicanas importadoras y exportadoras — en el momento exacto en que llega un documento de comercio.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/core" style={{ background: ORANGE, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Analizar un documento →
          </a>
          <a href="/chat" style={{ background: ORANGE_BG, color: ORANGE, border: `1px solid ${ORANGE_BORDER}`, padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Hablar con el asesor IA
          </a>
        </div>
      </div>

      {/* Impact stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '52px' }}>
        {impacts.map((s, i) => (
          <div key={i} style={{ background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 800, color: ORANGE, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.stat}</div>
            <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, margin: '8px 0 4px', lineHeight: 1.3 }}>{s.desc}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Agent map */}
      <div style={{ marginBottom: '52px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
          🧭 Mapa de agentes — cómo se conecta el sistema
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {modules.map((m, i) => (
            <a key={i} href={m.href} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: CARD,
                border: m.route === '/chat' ? `2px solid rgba(110,231,183,0.5)` : `1px solid ${BORDER}`,
                borderRadius: '14px', padding: '16px 18px',
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                transition: 'border-color 0.15s',
              }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: m.route === '/chat' ? 'rgba(110,231,183,0.1)' : ORANGE_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{m.name}</div>
                    <span style={{ fontSize: '10px', color: m.route === '/chat' ? '#6ee7b7' : 'rgba(255,255,255,0.3)', background: m.route === '/chat' ? 'rgba(110,231,183,0.1)' : 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '5px', flexShrink: 0 }}>{m.route}</span>
                  </div>
                  {m.route === '/chat' && (
                    <div style={{ fontSize: '10px', background: 'rgba(110,231,183,0.1)', color: '#6ee7b7', padding: '1px 7px', borderRadius: '5px', display: 'inline-block', marginBottom: '5px', fontWeight: 600 }}>IA en vivo — en español</div>
                  )}
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{m.desc}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '28px 32px', marginBottom: '52px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
          ⚙️ Cómo funciona en la práctica
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { step: '01', title: 'Pega tu documento en inglés', desc: 'Cotización de proveedor, contrato, instrucciones de embarque, formulario de plataforma o correo de negociación.' },
            { step: '02', title: 'IA analiza en segundos', desc: 'Claude lee el documento con contexto específico de comercio exterior — no traducción genérica, sino inteligencia comercial.' },
            { step: '03', title: 'Recibes análisis completo en español', desc: 'Resumen ejecutivo, términos clave explicados, ⚠️ cláusulas de riesgo destacadas y borrador de respuesta profesional.' },
            { step: '04', title: 'Tú decides — IA propone', desc: 'Borderless nunca firma ni compromete por ti. Toda salida es una propuesta. El dueño toma la decisión final.' },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: '20px', paddingBottom: i < arr.length - 1 ? '20px' : 0, borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none', marginBottom: i < arr.length - 1 ? '20px' : 0 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: ORANGE, flexShrink: 0 }}>{s.step}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Version 2 roadmap */}
      <div style={{ marginBottom: '52px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
          🔮 Hoja de ruta — Versión 2
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {roadmap.map((r, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `2px solid ${r.color}`, borderRadius: '0 10px 10px 0', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{r.icon}</span>
              <div style={{ flex: 1, fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{r.text}</div>
              <span style={{ fontSize: '10px', background: r.bg, color: r.color, padding: '2px 9px', borderRadius: '5px', flexShrink: 0, fontWeight: 600 }}>{r.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, borderRadius: '16px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>¿Listo para analizar tu primer documento?</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>Pega cualquier cotización, contrato o instrucción de embarque en inglés y obtén análisis completo en español en 30 segundos.</div>
        </div>
        <a href="/core" style={{ background: ORANGE, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Analizar ahora →
        </a>
      </div>
    </div>
  )
}
