import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Borderless — an AI trade document assistant built specifically for Mexican SME owners who import or export internationally. Return ONLY valid JSON with exactly these 10 fields: problem, user, slice, ai_pattern, value_created, core_principles, use_cases, venture_direction, business_logic, risk. No markdown. No preamble.`;

function parseOutput(rawText: string) {
  const FALLBACK = { problem: 'Unavailable', user: 'Unavailable', slice: 'Unavailable', ai_pattern: 'Unavailable', value_created: 'Unavailable', core_principles: 'Unavailable', use_cases: 'Unavailable', venture_direction: 'Unavailable', business_logic: 'Unavailable', risk: 'Unavailable' };
  try {
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return FALLBACK;
  }
}

export async function POST(request: Request) {
  try {
    console.log('✅ API route hit');
    const { document } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log('✅ API key exists:', !!apiKey);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1200,
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
