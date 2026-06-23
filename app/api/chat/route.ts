import { NextRequest, NextResponse } from 'next/server'
const G = ['tax evasion','fake documents','fake visa','fake passport','illegal visa','bribe','hide income','launder','commit fraud','forged','counterfeit','black market','evade taxes','hide money']
const C = ['tax filing','legal proceedings','court','irs','hmrc','lawsuit','deportation order','criminal charge','under investigation','tax audit']
function buildPrompt(ctx: Record<string,string>) {
  return `You are Borderless AI — a visa and relocation advisor for remote workers.
USER: country=${ctx.country||'unknown'}, work=${ctx.workType||'unknown'}, goal=${ctx.goal||'unknown'}
RULES: Personalize every reply. Bullet points for regulatory topics. Never act as lawyer. Add disclaimer for legal/tax specifics. Stay in scope: visas, tax residency, relocation, country comparisons. Warm, direct, specific. Under 300 words.`
}
export async function POST(req: NextRequest) {
  try {
    const { message, intakeContext, history } = await req.json()
    if (!message?.trim()) return NextResponse.json({ error: 'Message required.' }, { status: 400 })
    if (G.some(k => message.toLowerCase().includes(k))) return NextResponse.json({ type:'guardrail', response:'This is outside what Borderless AI can safely advise on.\n\nWe cover legal visa pathways and compliant relocation strategies only. Please speak with a licensed immigration attorney or tax professional.\n\nFeel free to rephrase if we misunderstood.', needsCheckpoint:false })
    const key = process.env.ANTHROPIC_API_KEY
    if (!key) return NextResponse.json({ error: 'API key not configured.' }, { status: 500 })
    const res = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'}, body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1024, system:buildPrompt(intakeContext||{}), messages:[...(Array.isArray(history)?history.slice(-10):[]),{role:'user',content:message.trim()}] }) })
    if (!res.ok) return NextResponse.json({ error: 'AI unavailable.' }, { status: 502 })
    const data = await res.json()
    const text = data.content?.filter((b: {type:string})=>b.type==='text').map((b: {text:string})=>b.text).join('\n')||'Could not generate response.'
    return NextResponse.json({ type:'response', response:text, needsCheckpoint:C.some(k=>text.toLowerCase().includes(k)) })
  } catch(e) { return NextResponse.json({ error:'Something went wrong.' }, { status:500 }) }
}
