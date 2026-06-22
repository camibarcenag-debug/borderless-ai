import { NextRequest, NextResponse } from 'next/server'
const GUARDRAIL_KEYWORDS = ['tax evasion','fake documents','fake visa','fake passport','illegal visa','bribe','hide income','launder','commit fraud','how to lie','forged','counterfeit','black market','evade taxes','hide money']
const CHECKPOINT_KEYWORDS = ['tax filing','legal proceedings','court','irs','hmrc','lawsuit','deportation order','criminal charge','under investigation','tax audit']
function buildSystemPrompt(ctx: Record<string,string>): string {
  return `You are the Borderless AI advisor — a smart, warm, no-nonsense relocation and visa expert for remote workers and digital nomads.\nUSER PROFILE (personalize EVERY reply):\n- Country: ${ctx.country||'not specified'}\n- Work: ${ctx.workType||'not specified'}\n- Goal: ${ctx.goal||'not specified'}\nHelp with: visa eligibility, tax residency concepts, relocation planning, country comparisons.\nRULES: Always personalize. Use bullet points for regulatory topics. Never act as a lawyer. Add disclaimer for legal/tax specifics. Stay in scope. Be warm, direct, specific. Under 300 words.`
}
function isGuardrail(m: string): boolean { return GUARDRAIL_KEYWORDS.some(k => m.toLowerCase().includes(k)) }
function needsCheckpoint(r: string): boolean { return CHECKPOINT_KEYWORDS.some(k => r.toLowerCase().includes(k)) }
export async function POST(req: NextRequest) {
  try {
    const { message, intakeContext, history } = await req.json()
    if (!message?.trim()) return NextResponse.json({ error: 'Message required.' }, { status: 400 })
    if (isGuardrail(message)) return NextResponse.json({ type: 'guardrail', response: '⚠️ This is outside what Borderless AI can safely advise on.\n\nWe cover legal visa pathways and compliant tax planning only. Please speak with a licensed immigration attorney or tax professional.\n\nIf we misunderstood your question, feel free to rephrase it.', needsCheckpoint: false })
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'API key not configured.' }, { status: 500 })
    const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1024, system: buildSystemPrompt(intakeContext||{}), messages: [...(Array.isArray(history)?history.slice(-10):[]), { role: 'user', content: message.trim() }] }) })
    if (!res.ok) return NextResponse.json({ error: 'AI service unavailable.' }, { status: 502 })
    const data = await res.json()
    const responseText = data.content?.filter((b: {type:string})=>b.type==='text').map((b: {text:string})=>b.text).join('\n')||'Could not generate response.'
    return NextResponse.json({ type: 'response', response: responseText, needsCheckpoint: needsCheckpoint(responseText) })
  } catch(e) { return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 }) }
}
