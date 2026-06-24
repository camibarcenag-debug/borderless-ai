'use client'

const O = '#E8620A'
const OB = 'rgba(232,98,10,0.1)'
const OBR = 'rgba(232,98,10,0.25)'

interface Props {
  module: string
  icon: string
  title: string
  subtitle: string
  crumbs?: { label: string; href: string }[]
  nextHref?: string
  nextLabel?: string
  children: React.ReactNode
}

export default function PageShell({ module, icon, title, subtitle, crumbs, nextHref, nextLabel, children }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#111111', color: '#fff', fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>

      {/* Page header */}
      <div style={{ background: 'rgba(232,98,10,0.05)', borderBottom: '1px solid rgba(232,98,10,0.15)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.28)', textDecoration: 'none' }}>Borderless</a>
            {crumbs?.map((c, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>/</span>
                <a href={c.href} style={{ color: i === (crumbs.length - 1) ? O : 'rgba(255,255,255,0.28)', textDecoration: 'none' }}>{c.label}</a>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: OB, border: `1px solid ${OBR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              {icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: O, background: OB, border: `1px solid ${OBR}`, padding: '2px 8px', borderRadius: '5px', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.05em' }}>MÓDULO {module}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-geist-mono)' }}>Borderless — Sistema Integrado</span>
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{title}</h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '3px 0 0', lineHeight: 1.5 }}>{subtitle}</p>
            </div>
            {/* System dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
              {[
                {r:'/', ic:'🏠'},{r:'/core',ic:'🧬'},{r:'/research',ic:'🔎'},
                {r:'/product',ic:'📦'},{r:'/pricing',ic:'💰'},{r:'/marketing',ic:'📣'},
                {r:'/chat',ic:'💬'},{r:'/dashboard',ic:'📊'},{r:'/docs',ic:'📚'},{r:'/demo',ic:'🐉'},
              ].map((m, i) => (
                <a key={i} href={m.r} title={m.r} style={{ width:'24px', height:'24px', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', textDecoration:'none', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                  {m.ic}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>{children}</div>

      {/* Next module footer */}
      {nextHref && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '24px', marginTop: '48px', background: 'rgba(232,98,10,0.04)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginBottom: '4px', fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Siguiente módulo</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>Continúa explorando el sistema Borderless</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="/demo" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', padding: '8px 14px', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px' }}>Ver Demo completo</a>
              <a href={nextHref} style={{ background: O, color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>{nextLabel || 'Siguiente →'}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
