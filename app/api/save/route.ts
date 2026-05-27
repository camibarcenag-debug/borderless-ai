import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    console.log('✅ Save route hit');
    const { input_text, output_json, venture_name } = await request.json();

    const { data, error } = await supabase.from('core_outputs').insert([
      {
        input_document: input_text,
        problem: output_json.problem,
        user: output_json.user,
        slice: output_json.slice,
        ai_pattern: output_json.ai_pattern,
        value_created: output_json.value_created,
        core_principles: output_json.core_principles,
        use_cases: output_json.use_cases,
        venture_direction: output_json.venture_direction,
        business_logic: output_json.business_logic,
        risk: output_json.risk,
        venture_name: venture_name,
        created_at: new Date().toISOString(),
      },
    ]);

    console.log('✅ Save response:', { data, error });

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
