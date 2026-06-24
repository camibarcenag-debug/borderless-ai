import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Borderless — Tu co-piloto para el comercio global',
  description: 'Analiza contratos en inglés en segundos. Resumen en español, riesgos detectados, respuesta lista.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, minHeight: '100vh', background: '#111111', color: '#fff', fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
