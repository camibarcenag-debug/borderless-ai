import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { venture_idea, target_user, problem_input, output_json } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const response = await fetch(`${supabaseUrl}/rest/v1/research_outputs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ venture_idea, target_user, problem_input, output_json }),
    });

    console.log('Supabase response status:', response.status);
    const data = await response.json();
    console.log('Supabase response:', JSON.stringify(data).slice(0, 200));

    if (response.status !== 201) {
      throw new Error(`Supabase error: ${JSON.stringify(data)}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  }
}
