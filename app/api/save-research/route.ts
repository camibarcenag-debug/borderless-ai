import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { venture_idea, target_user, problem_input, output_json } = await request.json();

    const { data, error } = await supabase
      .from('research_outputs')
      .insert([{ venture_idea, target_user, problem_input, output_json }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  }
}
