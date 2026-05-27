import { NextResponse } from "next/server";
export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, "");
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const res = await fetch(`${url}/rest/v1/core_outputs?select=*&order=created_at.desc&limit=5`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch { return NextResponse.json([]); }
}
