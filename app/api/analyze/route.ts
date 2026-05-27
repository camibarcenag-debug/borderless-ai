import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Borderless — an AI trade document assistant for Mexican SME owners.

CRITICAL: You MUST return ALL 10 fields as strings. Never return "unavailable" or null. Every field must have real content.

For EVERY field, provide meaningful analysis even if you must infer from context.

Return ONLY this exact JSON structure with NO other text:
{
  "problem": "specific language barrier or trade complexity in this document",
  "user": "type of Mexican SME that would face this document",
  "slice": "exact bottleneck this document creates for the SME",
  "ai_pattern": "how Borderless AI helps solve this specific moment",
  "value_created": "concrete value the SME gets from this analysis",
  "core_principles": "which Borderless principles apply: flag uncertainty, owner decides, trade context first",
  "use_cases": "2-3 specific Mexican business types that would benefit",
  "venture_direction": "what this document reveals about Borderless product roadmap",
  "business_logic": "who would pay for this and why",
  "risk": "what could go wrong if Borderless misinterprets this"
}`;

function parseOutput(rawText: string) {
  const FALLBACK = {
    problem: "Document analysis failed",
    user: "Mexican SME owner",
    slice: "Document understanding barrier",
    ai_pattern: "AI translation and context analysis",
    value_created: "Clear understanding of document terms",
    core_principles: "Flag uncertainty, owner decides, trade context",
    use_cases: "Exporters, importers, trade consultants",
    venture_direction: "Build document analysis features",
    business_logic: "Monthly subscription for SME owners",
    risk: "Misinterpretation of critical terms"
  };

  try {
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    
    const safe: any = {};
    for (const key of Object.keys(FALLBACK)) {
      const val = parsed[key];
      if (typeof val === 'string' && val.length > 5) {
        safe[key] = val;
      } else if (typeof val === 'object' && val !== null) {
        safe[key] = Object.values(val).join(' · ');
      } else {
        safe[key] = (FALLBACK as any)[key];
      }
    }
    return safe;
  } catch {
    return FALLBACK;
  }
}

export async function POST(request: Request) {
  try {
    console.log('✅ API route hit');
    const { document } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `Analyze this trade document:\n\n${document}` }],
      }),
    });

    console.log('✅ Claude status:', response.status);

    if (!response.ok) {
      const err = await response.json();
      console.error('❌ Claude error:', err);
      return NextResponse.json({ error: 'AI analysis failed.' }, { status: 500 });
    }

    const data = await response.json();
    const rawText = data.content.map((b: any) => b.type === 'text' ? b.text : '').join('\n');
    const parsed = parseOutput(rawText);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
