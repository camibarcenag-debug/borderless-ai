'use client'
import { useState } from 'react'

const ORANGE = '#E8620A'
const ORANGE_BG = 'rgba(232,98,10,0.1)'
const ORANGE_BORDER = 'rgba(232,98,10,0.25)'
const CARD = 'rgba(255,255,255,0.03)'
const BORDER = 'rgba(255,255,255,0.08)'

const tabs = ['Biblioteca de Prompts', 'Arquitectura', 'Log de Construcción']

const prompts = [
  {
    num: 'PROMPT 1', module: 'Núcleo Generativo — /core',
    text: `"I am building the core AI feature for a platform called Borderless — an AI co-pilot that removes the English language barrier for Mexican SME owners at the moment a trade document arrives. Given an English trade document pasted by the user (which could be a supplier quote, shipping instruction, contract clause, platform onboarding form, or negotiation email), generate a complete structured analysis in plain Spanish including: (1) a 2-3 sentence plain-Spanish summary of what the document says and what action it requires, (2) a list of key trade terms explained in simple Spanish with no jargon, (3) a list of risk flags — clauses, terms, or conditions that the SME owner should be cautious about, highlighted with a clear warning, (4) a suggested professional reply draft in English that the SME owner can review and send, and (5) a confidence indicator — if the document is ambiguous or the AI is uncertain, say so clearly. Never produce confident-sounding output when uncertain. Always flag that the output is a proposal and the owner makes the final decision."`,
  },
  {
    num: 'PROMPT 2', module: 'Agente de Investigación — /research',
    text: `"I am building a Research and Benchmarking Agent for Borderless, a trade document AI platform for Mexican SME importers and exporters. Generate a complete competitive analysis comparing Borderless against: Google Translate, DeepL, general AI tools (ChatGPT, Claude), trade consultants and lawyers, and export promotion platforms (PROMEXICO successor programs). For each competitor include: their core value proposition, who they serve, their pricing, their key strength, their key weakness, and how Borderless is positioned differently. Then write a market opportunity statement explaining why no current solution adequately serves the Mexican SME trade document problem. Format as a structured comparison table followed by a 2-paragraph market gap analysis."`,
  },
  {
    num: 'PROMPT 3', module: 'Producto y Precios — /product /pricing',
    text: `"I am building a Pricing Simulator for Borderless, an AI trade document co-pilot for Mexican SMEs. Generate three pricing tiers: Tier 1 self-serve at $29/month (individual SME owner, limited document analyses per month), Tier 2 professional at $49/month (unlimited analyses, reply drafting, risk flag export), and Tier 3 agency at $99/month (multi-client management, bulk processing, priority support). Also generate an enterprise white-label API pricing model for banks (Banorte, BBVA MX) and export agencies. For each tier include the feature list, the target buyer, the pricing rationale, and the ROI calculation showing how one saved deal pays for the subscription."`,
  },
  {
    num: 'PROMPT 4', module: 'Motor de Marketing — /marketing',
    text: `"I am building a Marketing Engine for Borderless, an AI co-pilot for Mexican SME importers and exporters. Generate marketing content in Spanish for: (1) three LinkedIn posts targeting Mexican business owners and export agents, (2) one WhatsApp message script for outreach to SME contacts, (3) one email subject line and body for cold outreach to export consultants, (4) one hero headline and subheadline for the landing page in Spanish, (5) five SEO keyword phrases in Spanish targeting Mexican importers and exporters, and (6) one idea for a YouTube video that would attract SME owners organically. All content must feel trustworthy, specific, and professional. Tone: knowledgeable trade advisor who speaks perfect Spanish."`,
  },
  {
    num: 'PROMPT 5', module: 'Asesor de Comercio — /chat',
    text: `"You are the Borderless trade advisor — an AI co-pilot specifically designed to help Mexican SME owners navigate international trade, supplier communication, contracts, and logistics in plain Spanish. The user has answered 3 intake questions: their industry (e.g. textiles, food, crafts, machinery), whether they are importing or exporting, and their main trade challenge. Your rules: always respond in clear, plain Spanish — never in English unless quoting a specific document term. Always personalize your response to the user's industry and trade direction. When discussing contracts, shipping terms, or payment conditions, always add: '(Nota: esto es orientación general — no asesoría legal. Consulta con un especialista para tu situación específica.)' Never give legal advice or act as a licensed attorney."`,
  },
  {
    num: 'PROMPT 6', module: 'UX / Generación de Imagen',
    text: `"Generate a high-fidelity UI mockup for the final demo page of an AI trade co-pilot called Borderless. The design must show: a dark professional background with warm orange and amber accents (not playful — serious and trustworthy), the Borderless logo and BETA badge in the top left, a persistent navigation bar with links to 10 pages, a hero section with the headline 'Tu co-piloto para el comercio global', an agent map showing 10 modules connected in sequence with directional arrows and dark cards with orange accent colors, a practical impact section showing 3 key stats (95% of Mexican businesses are SMEs, one mistranslated clause = thousands lost, first Spanish-first trade AI), and a Version 2 roadmap preview. The overall vibe is: trusted business tool, professional, specific to Mexican trade context."`,
  },
  {
    num: 'PROMPT 7', module: 'Claude Code — Integración Final Week 6',
    text: `"Build the final Week 6 integration for a Next.js 14 app called Borderless — an AI trade document co-pilot for Mexican SME importers and exporters. Build these 3 new pages and one shared component in one complete implementation with zero placeholders: (1) app/demo/page.tsx — guided demo walkthrough with agent map showing all 10 trade modules connected in sequence, each module as a dark card with orange accent, live link, and one-line description, plus an impact statement and Version 2 roadmap. (2) app/dashboard/page.tsx — reads localStorage keys bai_core_output, bai_feedback, bai_chat_logs and displays them in dark professional cards with module status indicators. (3) app/docs/page.tsx — 3 sections: Prompt Library with 8 prompts organized by module, Architecture Notes with full system architecture, Build Log with weekly progress. (4) components/Navigation.tsx — persistent top nav bar with Borderless logo and orange accent, links to all 10 pages, added to root layout. Output every file completely."`,
  },
  {
    num: 'PROMPT 8', module: 'Debugging y Optimización',
    text: `"My Next.js 14 final integration for Borderless is showing the following error: [paste error]. The issue is in [file name]. Here is the complete current code: [paste code]. Fix the error without changing any other functionality. After fixing, audit the entire file for: (1) missing use client directive on any component using hooks, (2) any localStorage access that could fail during server-side rendering — wrap all localStorage calls in a useEffect or typeof window check, (3) any broken navigation links — verify all href values match the actual page routes, (4) any API route missing the anthropic-version header — add anthropic-version: 2023-06-01 to all Claude API calls, (5) any environment variable used client-side missing the NEXT_PUBLIC prefix. Return the complete corrected file with a one-sentence explanation of what was wrong."`,
  },
]

const architecture = `FRONTEND (Next.js 14 — App Directory)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app/layout.tsx
  → Root layout — wraps all pages
  → Includes persistent Navigation component
  → Dark background #0a0a0a, orange #E8620A accents

app/page.tsx (/)
  → Homepage en español
  → Hero: "Tu co-piloto para el comercio global"
  → Features, use cases, stats, CTA

app/core/page.tsx (/core)
  → Trade Document Analyzer
  → Textarea: pegar documento en inglés
  → API: /api/analyze → Claude analiza
  → Output en español: resumen, términos, riesgos, respuesta sugerida
  → Auto-save → localStorage: borderless_saved_outputs

app/research/page.tsx (/research)
  → Research + Benchmarking Agent
  → Análisis competitivo vs Google Translate, DeepL,
    consultores de comercio, herramientas IA generales
  → Brecha de mercado para PYME mexicana

app/product/page.tsx (/product)
  → Arquitectura de producto
  → 3 tiers de pricing, feature map, integraciones bancarias

app/pricing/page.tsx (/pricing)
  → Simulador de ingresos
  → Escenarios: Conservador / Esperado / Agresivo
  → MRR, ARR, churn proyectados

app/marketing/page.tsx (/marketing)
  → Motor de marketing en español
  → Posts, guiones de video, calendario editorial

app/chat/page.tsx (/chat)
  → Asesor de Comercio Exterior IA
  → Intake de 3 preguntas: industria, importa/exporta, reto principal
  → Claude responde en español con contexto de comercio
  → Guardarraíles de seguridad
  → Checkpoint humano para situaciones legales complejas
  → Feedback 👍👎 → localStorage: bai_feedback
  → Chat logs → localStorage: bai_chat_logs

app/dashboard/page.tsx (/dashboard)
  → Lee todos los keys de localStorage
  → Muestra análisis guardados, feedback, logs de chat
  → Indicadores de estado por módulo

app/docs/page.tsx (/docs)
  → Biblioteca de prompts (8 prompts por módulo)
  → Notas de arquitectura
  → Log de construcción semanal

app/demo/page.tsx (/demo)
  → Walkthrough guiado del sistema completo
  → Mapa de agentes con todos los módulos
  → Statement de impacto + Roadmap V2
  → Links en vivo a cada página

COMPONENTES COMPARTIDOS
━━━━━━━━━━━━━━━━━━━━━━━
components/Navigation.tsx
  → Nav persistente en todas las páginas
  → Logo Borderless + acento naranja
  → Links a los 10 módulos
  → Indicador de página activa

RUTAS API
━━━━━━━━━
app/api/analyze/route.ts
  → Recibe texto de documento en inglés
  → Prompt de Claude específico para comercio exterior
  → Devuelve JSON en español:
    { summary, keyTerms, riskFlags, suggestedReply }

app/api/analyze-doc/route.ts
  → Versión con upload de documento
  → Extrae texto de PDF/DOCX
  → Misma lógica de análisis

app/api/chat/route.ts
  → Recibe mensaje + contexto de intake
  → Guardarraíl antes de llamar a Claude
  → Devuelve orientación comercial en español

app/api/research/route.ts
  → Análisis competitivo automatizado
  → Benchmarking vs competidores

CAPA DE DATOS
━━━━━━━━━━━━━
localStorage (client-side):
  borderless_saved_outputs → análisis de documentos guardados
  bai_feedback             → calificaciones de retroalimentación
  bai_chat_logs            → logs completos de sesión de chat

DESPLIEGUE
━━━━━━━━━━
GitHub → push a main → Vercel auto-deploy
Entorno: ANTHROPIC_API_KEY en Vercel dashboard`

const buildLog = [
  {
    week: 'Semanas 1–3 — Fundación',
    color: '#6ee7b7',
    items: [
      'Inicialización de Next.js 14 con Tailwind CSS y TypeScript',
      'Homepage con concepto del venture y sección hero',
      'Configuración de despliegue en Vercel con auto-deploy desde GitHub',
      'Página /core con análisis de documentos y integración con Claude API',
      'Tabla de 10 capítulos de arquitectura con Capítulo 6 seleccionado',
      'Integración con Supabase para guardar outputs del núcleo',
    ]
  },
  {
    week: 'Semana 4 — Motor de Marketing',
    color: ORANGE,
    items: [
      'Página /marketing con landing page completa en español',
      'Posts para redes sociales, guiones de video, calendario editorial',
      'Copy específico para PYMES mexicanas importadoras y exportadoras',
      'Commits: feat/week4 — marketing page, Spanish copy, responsive layout',
    ]
  },
  {
    week: 'Semana 5 — Asesor de Comercio IA',
    color: '#a78bfa',
    items: [
      'Página /chat con flujo de intake de 3 preguntas (industria, importa/exporta, reto)',
      'Integración con Claude API respondiendo en español con contexto de comercio',
      'Función de guardarraíl bloqueando solicitudes fuera de alcance o dañinas',
      'Tarjeta de checkpoint humano para escalación legal/contractual',
      'Retroalimentación 👍👎 guardada en localStorage',
      'Logs de chat guardados cada 5 mensajes',
      'Panel de perfil izquierdo con datos de sesión del usuario',
      'Commits: feat/week5 — chat page, Spanish system prompt, guardrails, feedback',
    ]
  },
  {
    week: 'Semana 6 — Integración Final',
    color: ORANGE,
    items: [
      'Página /demo — walkthrough guiado con mapa de agentes, impacto y roadmap V2',
      'Página /dashboard — lee localStorage, muestra análisis, feedback y evidencia de pruebas',
      'Página /docs — biblioteca de prompts, arquitectura, log de construcción semanal',
      'Componente Navigation persistente añadido al root layout — en todas las páginas',
      'Homepage rediseñada en español con propuesta de valor, casos de uso y stats',
      'API de parsing de PDF/DOCX para futura carga de documentos',
      'Prueba de regresión completa — los 10 módulos en vivo y conectados',
      'Commits: feat/week6 — demo, dashboard, docs, navigation, homepage, final integration',
    ]
  },
]

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: ORANGE, marginBottom: '10px' }}>Documentación Técnica</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Docs</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Biblioteca de prompts, arquitectura del sistema y log de construcción semanal.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', borderBottom: `1px solid ${BORDER}`, paddingBottom: '0' }}>
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px',
            fontSize: '13px', fontWeight: activeTab === i ? 600 : 400,
            color: activeTab === i ? ORANGE : 'rgba(255,255,255,0.45)',
            borderBottom: activeTab === i ? `2px solid ${ORANGE}` : '2px solid transparent',
            marginBottom: '-1px', transition: 'all 0.15s',
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Prompt Library */}
      {activeTab === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {prompts.map((p, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: ORANGE, background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, padding: '3px 9px', borderRadius: '6px', letterSpacing: '0.05em' }}>{p.num}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{p.module}</span>
                </div>
                <button onClick={() => copyPrompt(p.text, i)} style={{
                  background: copiedIdx === i ? 'rgba(74,222,128,0.1)' : ORANGE_BG,
                  border: `1px solid ${copiedIdx === i ? 'rgba(74,222,128,0.3)' : ORANGE_BORDER}`,
                  color: copiedIdx === i ? '#4ade80' : ORANGE,
                  fontSize: '11px', fontWeight: 600, padding: '5px 12px', borderRadius: '6px', cursor: 'pointer',
                }}>
                  {copiedIdx === i ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'var(--font-geist-mono), monospace', whiteSpace: 'pre-wrap' }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Architecture */}
      {activeTab === 1 && (
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '24px' }}>
          <pre style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontFamily: 'var(--font-geist-mono), monospace', whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
            {architecture}
          </pre>
        </div>
      )}

      {/* Tab 3: Build Log */}
      {activeTab === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {buildLog.map((week, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${week.color}`, borderRadius: '0 14px 14px 0', padding: '20px 24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: week.color, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{week.week}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {week.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: week.color, fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
