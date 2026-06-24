'use client'

const ORANGE = '#E8620A'
const ORANGE_BG = 'rgba(232,98,10,0.1)'
const ORANGE_BORDER = 'rgba(232,98,10,0.25)'
const CARD = 'rgba(255,255,255,0.03)'
const BORDER = 'rgba(255,255,255,0.08)'

const features = [
  { icon: '📄', title: 'Análisis de documentos', desc: 'Pega cualquier contrato, cotización o instrucción en inglés. Resumen en español en 30 segundos.' },
  { icon: '⚠️', title: 'Banderas de riesgo', desc: 'Cláusulas peligrosas detectadas automáticamente: penalizaciones, pagos, exclusividad, arbitraje.' },
  { icon: '✍️', title: 'Respuesta sugerida', desc: 'Borrador de respuesta profesional en inglés listo para revisar y enviar a tu proveedor.' },
  { icon: '💬', title: 'Asesor en español', desc: 'Chat con IA especializada en comercio exterior. Pregunta lo que necesites en tu idioma.' },
  { icon: '🛡️', title: 'Siempre tú decides', desc: 'Borderless propone. Tú firmas. La IA nunca actúa de forma autónoma en tu nombre.' },
  { icon: '📊', title: 'Historial completo', desc: 'Todos tus análisis guardados y accesibles en el dashboard para referencia futura.' },
]

const useCases = [
  { initials: 'PE', name: 'PYME Exportadora', color: '#FFF3E8', textColor: '#8B3A00', desc: 'Recibe purchase orders en inglés de compradores americanos. Necesita identificar errores y negociar términos.' },
  { initials: 'IA', name: 'Importador de Maquinaria', color: '#E8F3FF', textColor: '#00458B', desc: 'Importa maquinaria de Alemania y China. Recibe contratos técnicos y términos FOB que no puede descifrar.' },
  { initials: 'DA', name: 'Despacho Aduanal', color: '#E8FFE8', textColor: '#00622A', desc: 'Procesa decenas de documentos por semana para clientes. Necesita velocidad y consistencia en el análisis.' },
]

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: ORANGE_BG, color: ORANGE, border: `1px solid ${ORANGE_BORDER}`, fontSize: '12px', fontWeight: 600, padding: '5px 14px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '0.04em' }}>
          🌎 Co-piloto de comercio exterior para PYMES mexicanas
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Tu contrato en inglés,<br />
          <span style={{ background: `linear-gradient(135deg,${ORANGE},#f59e0b)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>en español y sin riesgos</span><br />
          en 60 segundos.
        </h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          Borderless elimina la barrera del inglés para PYMES mexicanas que importan y exportan — sin abogados, sin traductores, sin perder el trato.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/core" style={{ background: ORANGE, color: '#fff', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Analiza tu primer documento →
          </a>
          <a href="/chat" style={{ background: CARD, color: 'rgba(255,255,255,0.7)', border: `1px solid ${BORDER}`, padding: '14px 28px', borderRadius: '10px', fontSize: '15px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Hablar con el asesor IA
          </a>
        </div>
        <div style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          Primer análisis gratis · Sin tarjeta de crédito · Respuesta en español
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Qué hace Borderless</div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Todo lo que necesitas para negociar con el mundo</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '22px 24px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{f.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases */}
      <div style={{ marginBottom: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>¿Para quién?</div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Construido para el dueño de negocio mexicano</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {useCases.map((u, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '22px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: u.textColor, flexShrink: 0 }}>{u.initials}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{u.name}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{u.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, borderRadius: '16px', padding: '32px', marginBottom: '72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { stat: '4.1M', desc: 'PYMES en México', sub: 'El mercado objetivo' },
            { stat: '1 cláusula', desc: 'mal traducida', sub: 'puede costar miles de dólares' },
            { stat: '$29/mes', desc: 'Plan Profesional', sub: 'vs $200/hr de abogado' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: ORANGE, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.stat}</div>
              <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, margin: '8px 0 4px' }}>{s.desc}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Empieza gratis hoy</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 24px' }}>Sin tarjeta de crédito. Sin instalación. Análisis completo en 30 segundos.</p>
        <a href="/core" style={{ background: ORANGE, color: '#fff', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Analizar mi primer documento →
        </a>
      </div>
    </div>
  )
}
