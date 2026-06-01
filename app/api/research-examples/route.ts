import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('URL exists:', !!supabaseUrl);
    console.log('Key exists:', !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing env vars', url: !!supabaseUrl, key: !!supabaseKey }, { status: 500 });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/research_outputs?select=*&order=created_at.desc&limit=10`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await response.json();
    console.log('Supabase status:', response.status);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Examples error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
