export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-500 text-xs font-mono tracking-widest mb-2">AI-101 · WEEK 1 · PROMPT LIBRARY</p>
        <h1 className="text-3xl font-bold mb-8">Borderless — Prompt Documentation</h1>
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-orange-500 text-xs font-mono mb-3">PROMPT 1 — 10-CHAPTER ARCHITECTURE</p>
            <p className="text-gray-300 text-sm leading-relaxed">You are my disciplined AI-101 thinking partner. I am creating a 10-chapter book for a 6-week AI venture-building course. Help me propose 10 chapter ideas each must include title, problem, user, slice, technology, venture idea, who pays, impact, and risk. Ask me questions before recommending.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-orange-500 text-xs font-mono mb-3">PROMPT 2 — CHAPTER SELECTION</p>
            <p className="text-gray-300 text-sm leading-relaxed">I have 10 chapter ideas. Help me compare them on 5 dimensions: commercial viability, prototypability in 6 weeks, personal conviction, user clarity, and AI fit. Do not choose for me. My strongest candidates are Chapter 1 water infrastructure and Chapter 6 English for Mexican SMEs.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-orange-500 text-xs font-mono mb-3">PROMPT 3 — GENERATIVE CORE EXTRACTION</p>
            <p className="text-gray-300 text-sm leading-relaxed">I selected Chapter 6 Borderless. Help me extract the full Generative Core with all 10 fields: problem, target user, specific slice, AI pattern, value created, core principles, use cases, venture direction, business logic, and risk. Do not write the chapter. Extract the core only.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-orange-500 text-xs font-mono mb-3">PROMPT 4 — CLAUDE API SYSTEM PROMPT</p>
            <p className="text-gray-300 text-sm leading-relaxed">You are Borderless an AI trade document assistant for Mexican SME owners. Analyze English trade documents and return structured JSON with exactly 10 fields: problem, user, slice, ai_pattern, value_created, core_principles, use_cases, venture_direction, business_logic, risk. Return ONLY valid JSON. No markdown. No preamble.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-orange-500 text-xs font-mono mb-3">PROMPT 5 — BUILD PROMPT</p>
            <p className="text-gray-300 text-sm leading-relaxed">Build a Next.js 14 app with a page at /core showing a 10-chapter architecture table with Chapter 6 highlighted, a selected venture card, a textarea for pasting English trade documents, a submit button calling the Anthropic Claude API, a structured output card with 10 fields, a save button storing to Supabase core_outputs, and a saved examples section.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-orange-500 text-xs font-mono mb-3">PROMPT 6 — DEBUGGING</p>
            <p className="text-gray-300 text-sm leading-relaxed">The save button returned PGRST125 Invalid path. Fix: remove /rest/v1 from NEXT_PUBLIC_SUPABASE_URL in .env.local so it is just https://projectid.supabase.co</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800">
          <a href="/core" className="text-orange-500 text-sm font-mono">Back to /core</a>
        </div>
      </div>
    </div>
  );
}
