import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('✅ Save route hit');
    
    const { input_text, output_json, venture_name } = await request.json();
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, '');
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    console.log('✅ Supabase URL:', supabaseUrl);

    const body = {
      input_document: String(input_text || ''),
      problem: String(output_json?.problem || ''),
      user: String(output_json?.user || ''),
      slice: String(output_json?.slice || ''),
      ai_pattern: String(output_json?.ai_pattern || ''),
      value_created: String(output_json?.value_created || ''),
      core_principles: String(output_json?.core_principles || ''),
      use_cases: String(output_json?.use_cases || ''),
      venture_direction: String(output_json?.venture_direction || ''),
      business_logic: String(output_json?.business_logic || ''),
      risk: String(output_json?.risk || ''),
      venture_name: String(venture_name || 'Borderless'),
    };

    console.log('✅ Sending to Supabase...');

    const response = await fetch(`${supabaseUrl}/rest/v1/core_outputs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log('✅ Supabase status:', response.status);
    console.log('✅ Supabase response:', responseText);

    if (!response.ok) {
      console.error('❌ Supabase error:', responseText);
      return NextResponse.json({ error: responseText }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
