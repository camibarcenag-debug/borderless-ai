import { NextRequest, NextResponse } from 'next/server'

const GUARDRAIL_KEYWORDS = [
  'falsificar', 'documento falso', 'visa falsa', 'soborno',
  'evadir impuestos', 'contrabando', 'lavado de dinero',
  'fake documents', 'bribe', 'tax evasion', 'smuggling',
  'money laundering', 'forged', 'counterfeit', 'black market',
  'commit fraud', 'illegal import', 'evade customs',
]

const CHECKPOINT_KEYWORDS = [
  'demanda', 'juicio', 'tribunal', 'embargo', 'arresto',
  'investigación fiscal', 'sat auditoría', 'denuncia penal',
  'lawsuit', 'court', 'criminal charge', 'customs seizure',
  'legal proceedings', 'under investigation',
]

function buildSystemPrompt(ctx: Record<string, string>): string {
  return `Eres el asesor de comercio exterior de Borderless — un co-piloto de IA diseñado específicamente para ayudar a dueños de PYMES mexicanas a navegar el comercio internacional, la comunicación con proveedores, los contratos y la logística en español claro.

PERFIL DEL USUARIO (personaliza CADA respuesta con esto):
- Industria: ${ctx.industry || 'no especificada'}
- Operación comercial: ${ctx.tradeType || 'no especificada'}
- Reto principal: ${ctx.challenge || 'no especificado'}

TUS REGLAS — SIEMPRE DEBES SEGUIRLAS:
1. Responde SIEMPRE en español claro y directo. Nunca en inglés a menos que cites un término específico de un documento.
2. Personaliza tu respuesta con la industria y operación del usuario.
3. Explica conceptos de comercio en lenguaje simple — como si hablaras con un dueño de negocio inteligente que no es abogado.
4. Cuando hables de contratos, términos de embarque o condiciones de pago, SIEMPRE agrega: "(Nota: esto es orientación general — no asesoría legal. Consulta con un especialista para tu situación específica.)"
5. NUNCA des asesoría legal ni actúes como abogado licenciado.
6. Cuando expliques Incoterms (FOB, CIF, EXW, DDP, etc.), siempre usa ejemplos concretos para la industria del usuario.
7. Para riesgos en contratos, identifica específicamente qué cláusulas pueden costar dinero al usuario.
8. Si algo está fuera de tu alcance (medicina, política, finanzas personales), redirige amablemente: "Eso está fuera de mi especialidad de comercio exterior, pero puedo ayudarte con..."
9. Mantente estrictamente en el dominio de: comercio internacional, comunicación con proveedores, contratos comerciales, embarques, aduanas, Incoterms, negociación, plataformas de exportación.
10. Sé cálido, directo y específico. Siempre da nombres reales de términos, documentos concretos, y pasos accionables. Sin relleno.

TONO: Asesor de confianza que conoce el comercio exterior. Confidente pero nunca arrogante. Empático con el estrés de hacer negocios internacionales.`
}

function isGuardrail(message: string): boolean {
  const lower = message.toLowerCase()
  return GUARDRAIL_KEYWORDS.some(kw => lower.includes(kw))
}

function needsCheckpoint(response: string): boolean {
  const lower = response.toLowerCase()
  return CHECKPOINT_KEYWORDS.some(kw => lower.includes(kw))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, intakeContext, history } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Se requiere un mensaje.' }, { status: 400 })
    }

    if (isGuardrail(message)) {
      return NextResponse.json({
        type: 'guardrail',
        response: `⚠️ Esto está fuera de lo que Borderless puede asesorar de manera segura.\n\nNuestro asistente cubre rutas legales de comercio exterior, documentación aduanal correcta y estrategias de negociación dentro de la ley. Para este tipo de consulta, te recomendamos hablar directamente con un abogado de comercio exterior o un agente aduanal certificado.\n\nSi tu pregunta fue malinterpretada, no dudes en reformularla y haremos nuestro mejor esfuerzo para ayudarte.`,
        needsCheckpoint: false,
      })
    }

    const safeHistory = Array.isArray(history) ? history.slice(-10) : []
    const messages = [
      ...safeHistory,
      { role: 'user', content: message.trim() },
    ]

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key no configurada. Añade ANTHROPIC_API_KEY en Vercel.' }, { status: 500 })
    }

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: buildSystemPrompt(intakeContext || {}),
        messages,
      }),
    })

    if (!claudeRes.ok) {
      const err = await claudeRes.text()
      console.error('Claude API error:', err)
      return NextResponse.json({ error: 'Servicio de IA temporalmente no disponible. Intenta de nuevo.' }, { status: 502 })
    }

    const data = await claudeRes.json()
    const responseText: string =
      data.content
        ?.filter((b: { type: string }) => b.type === 'text')
        .map((b: { text: string }) => b.text)
        .join('\n') || 'No pude generar una respuesta. Por favor intenta de nuevo.'

    return NextResponse.json({
      type: 'response',
      response: responseText,
      needsCheckpoint: needsCheckpoint(responseText),
    })
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json({ error: 'Algo salió mal. Por favor intenta de nuevo.' }, { status: 500 })
  }
}
