'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',           label: 'Inicio' },
  { href: '/core',       label: 'Núcleo' },
  { href: '/research',   label: 'Investigación' },
  { href: '/product',    label: 'Producto' },
  { href: '/pricing',    label: 'Precios' },
  { href: '/marketing',  label: 'Marketing' },
  { href: '/chat',       label: 'Asesor IA' },
  { href: '/dashboard',  label: 'Dashboard' },
  { href: '/docs',       label: 'Docs' },
  { href: '/demo',       label: 'Demo' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.95)',
      borderBottom: '1px solid rgba(232,98,10,0.25)',
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '54px' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#E8620A,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '-0.02em' }}>B</div>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '-0.02em' }}>Borderless</span>
          <span style={{ fontSize: '10px', background: 'rgba(232,98,10,0.15)', color: '#E8620A', border: '1px solid rgba(232,98,10,0.35)', padding: '2px 8px', borderRadius: '20px', fontWeight: 500 }}>Beta</span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {links.map(l => {
            const active = pathname === l.href
            return (
              <Link key={l.href} href={l.href} style={{
                fontSize: '12px', padding: '5px 10px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap',
                color: active ? '#E8620A' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(232,98,10,0.1)' : 'transparent',
                border: active ? '1px solid rgba(232,98,10,0.3)' : '1px solid transparent',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
              }}>
                {l.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
