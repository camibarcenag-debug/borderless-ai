export async function POST(request: Request) {
  try {
    console.log('✅ API route hit');
    
    const { document } = await request.json();
    console.log('✅ Document received, length:', document?.length);

    if (!document || document.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please paste a trade document with enough content to analyze.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log('✅ API key exists:', !!apiKey);
    console.log('✅ API key starts with:', apiKey?.substring(0, 10));

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
        messages: [
          {
            role: 'user',
            content: `Please analyze this trade document and return the structured JSON output:\n\n${document}`,
          },
        ],
      }),
    });

    console.log('✅ Claude response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Claude API error:', errorData);
      return NextResponse.json(
        { error: 'AI analysis failed. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const rawText = data.content
      .map((block: any) => (block.type === 'text' ? block.text : ''))
      .filter(Boolean)
      .join('\n');

    console.log('✅ Raw text received, length:', rawText.length);

    const parsed = parseOutput(rawText);
    console.log('✅ Parsed output keys:', Object.keys(parsed));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}