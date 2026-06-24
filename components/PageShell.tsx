'use client'

const O = '#E8620A'
const OB = 'rgba(232,98,10,0.1)'
const OBR = 'rgba(232,98,10,0.25)'

interface Crumb { label: string; href: string }

interface Props {
  module: string        // e.g. "01"
  icon: string          // e.g. "🧬"
  title: string         // e.g. "Núcleo Generativo"
  subtitle: string      // one-line description
  crumbs?: Crumb[]      // breadcrumb trail
  nextHref?: string     // e.g. "/research"
  nextLabel?: string    // e.g. "Ir a Investigación →"
  children: React.ReactNode
}

export default function PageShell({ module, icon, title, subtitle, crumbs, nextHref, nextLabel, children }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>

      {/* Page hero header */}
      <div style={{ background: 'rgba(232,98,10,0.06)', borderBottom: '1px solid rgba(232,98,10,0.18)', padding: '24px 24px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Borderless</a>
            {crumbs?.map((c, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>/</span>
                <a href={c.href} style={{ color: i === (crumbs.length - 1) ? O : 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{c.label}</a>
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: OB, border: `1px solid ${OBR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
              {icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: O, background: OB, border: `1px solid ${OBR}`, padding: '2px 8px', borderRadius: '5px', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.04em' }}>MÓDULO {module}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-geist-mono)' }}>Borderless — Sistema Integrado</span>
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{title}</h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', lineHeight: 1.5 }}>{subtitle}</p>
            </div>

            {/* System progress dots */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[
                {r:'/',  ic:'🏠'},{r:'/core',ic:'🧬'},{r:'/research',ic:'🔎'},
                {r:'/product',ic:'📦'},{r:'/pricing',ic:'💰'},{r:'/marketing',ic:'📣'},
                {r:'/chat',ic:'💬'},{r:'/dashboard',ic:'📊'},{r:'/docs',ic:'📚'},{r:'/demo',ic:'🐉'},
              ].map((m, i) => (
                <a key={i} href={m.r} title={m.r} style={{
                  width: '26px', height: '26px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', textDecoration: 'none',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.15s',
                }}>
                  {m.ic}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>{children}</div>

      {/* Next module CTA */}
      {nextHref && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px', marginTop: '40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Siguiente módulo del sistema</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Continúa explorando Borderless →</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/demo" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', padding: '8px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                Ver Demo completo
              </a>
              <a href={nextHref} style={{ background: O, color: '#fff', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {nextLabel || 'Siguiente →'}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
