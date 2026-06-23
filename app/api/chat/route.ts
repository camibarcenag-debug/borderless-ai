import { NextRequest, NextResponse } from 'next/server'

const GUARDRAIL_KEYWORDS = [
  'tax evasion', 'fake documents', 'fake visa', 'fake passport',
  'illegal visa', 'bribe', 'hide income', 'launder', 'undocumented worker',
  'commit fraud', 'how to lie', 'forged', 'counterfeit', 'black market',
  'evade taxes', 'avoid paying tax illegally', 'hide money', 'offshore secretly',
]

const CHECKPOINT_KEYWORDS = [
  'tax filing', 'legal proceedings', 'court', 'irs', 'hmrc',
  'lawsuit', 'deportation order', 'criminal charge', 'under investigation',
  'tax audit', 'immigration court',
]

function buildSystemPrompt(ctx: Record<string, string>): string {
  return `You are the Borderless AI advisor — a smart, warm, no-nonsense relocation and visa expert for remote workers and digital nomads.

USER PROFILE (personalize EVERY reply using this):
- Current country of residence: ${ctx.country || 'not specified'}
- Work situation: ${ctx.workType || 'not specified'}
- Main goal: ${ctx.goal || 'not specified'}

YOUR ROLE:
You help users with: digital nomad visa eligibility and requirements, tax residency concepts and optimization strategies, legal relocation planning, and country comparisons for remote workers.

RULES YOU MUST ALWAYS FOLLOW:
1. Always personalize your response using the user profile — mention their country, work situation, and goal.
2. For regulatory, visa, or tax comparison topics: always respond in clear bullet points organized by topic.
3. Never give actual tax filing instructions or act as a licensed attorney.
4. Always add a short disclaimer when discussing specific tax or legal rules: "(Note: this is general information — not legal or tax advice. Consult a licensed professional for your specific situation.)"
5. Recommend human consultation for decisions involving more than €5,000 or any legal proceedings.
6. Stay strictly within the domain of visa eligibility, tax residency concepts, relocation logistics, and country comparisons.
7. If the user asks something outside your scope (crypto, medical, relationships, general business etc.), politely say: "That's outside my area, but I can help you with your visa or relocation plan — just ask!"
8. Be warm, direct, and specific. Always give real country names, real visa names, and real requirements. No filler.
9. Keep responses concise — under 300 words. If more detail is needed, offer to go deeper on a specific topic.

TONE: Smart friend who knows immigration law. Confident but never arrogant. Empathetic to the stress of moving countries.`
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
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    // ── GUARDRAIL CHECK (before any API call) ──────────────
    if (isGuardrail(message)) {
      return NextResponse.json({
        type: 'guardrail',
        response: `⚠️ This is outside what Borderless AI can safely advise on.\n\nOur assistant covers legal visa pathways, compliant tax planning, and above-board relocation strategies — not anything that could create legal risk for you.\n\nFor this kind of question, please speak directly with a licensed immigration attorney or certified tax professional. If you have a legitimate question we misunderstood, feel free to rephrase it and we'll do our best to help.`,
        needsCheckpoint: false,
      })
    }

    // ── BUILD CONVERSATION HISTORY ─────────────────────────
    const safeHistory = Array.isArray(history) ? history.slice(-10) : []
    const messages = [
      ...safeHistory,
      { role: 'user', content: message.trim() },
    ]

    // ── CLAUDE API CALL ────────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured.' }, { status: 500 })
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
      return NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again.' },
        { status: 502 }
      )
    }

    const data = await claudeRes.json()
    const responseText: string =
      data.content
        ?.filter((b: { type: string }) => b.type === 'text')
        .map((b: { text: string }) => b.text)
        .join('\n') || 'Sorry, I could not generate a response. Please try again.'

    return NextResponse.json({
      type: 'response',
      response: responseText,
      needsCheckpoint: needsCheckpoint(responseText),
    })
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
