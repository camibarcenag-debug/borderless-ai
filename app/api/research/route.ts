import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { venture_idea, target_user, problem } = await request.json();

    const systemPrompt = `Eres un agente de investigación y benchmarking para emprendedores mexicanos.
Devuelve ÚNICAMENTE un objeto JSON válido en español con exactamente estos 8 campos.
Sé conciso — máximo 2 oraciones por campo de texto. Exactamente 5 benchmarks y 8 competidores.
Sin markdown. Sin texto fuera del JSON. Solo JSON válido y completo.`;

    const userMessage = `Genera un análisis de investigación y benchmarking para esta idea:
Idea de negocio: ${venture_idea}
Usuario objetivo: ${target_user}
Problema: ${problem}

Responde SOLO con este JSON completo:
{
  "validacion_problema": "por qué este problema es real y urgente",
  "clarificacion_usuario": "descripción del usuario objetivo",
  "benchmarks_globales": [
    {"nombre": "Stripe Atlas", "pais": "USA", "que_hace": "simplifica constitución de empresas", "que_aprende_borderless": "lección"},
    {"nombre": "Faire", "pais": "USA/Europa", "que_hace": "simplifica comercio mayorista", "que_aprende_borderless": "lección"},
    {"nombre": "Kompass", "pais": "Francia", "que_hace": "directorio B2B multilingüe", "que_aprende_borderless": "lección"},
    {"nombre": "QuickBooks Commerce", "pais": "Australia", "que_hace": "operaciones para PYMES globales", "que_aprende_borderless": "lección"},
    {"nombre": "AlphaSense", "pais": "USA", "que_hace": "IA lee documentos financieros", "que_aprende_borderless": "lección"}
  ],
  "localizacion_mexico": {
    "que_transfiere": "qué funciona en México",
    "que_no_transfiere": "qué no aplica directamente"
  },
  "competidores": [
    {"nombre": "Google Translate", "tipo": "traducción general", "usuario": "cualquier persona", "idioma": "100+ idiomas", "especifico_comercio": "No", "precio": "Gratis", "brecha": "sin contexto comercial"},
    {"nombre": "DeepL", "tipo": "traducción premium", "usuario": "profesionales", "idioma": "31 idiomas", "especifico_comercio": "No", "precio": "$8.74+/mes", "brecha": "sin inteligencia de comercio"},
    {"nombre": "ChatGPT", "tipo": "asistente IA", "usuario": "tech-savvy", "idioma": "multilingüe", "especifico_comercio": "Parcialmente", "precio": "$20/mes", "brecha": "no específico de comercio"},
    {"nombre": "Microsoft Translator", "tipo": "API de traducción", "usuario": "empresas", "idioma": "100+ idiomas", "especifico_comercio": "No", "precio": "por uso", "brecha": "sin UI para PYMES"},
    {"nombre": "Lionbridge", "tipo": "agencia humana", "usuario": "grandes corporaciones", "idioma": "350+ idiomas", "especifico_comercio": "Sí", "precio": "$0.10-0.25/palabra", "brecha": "caro e inaccesible"},
    {"nombre": "Flexport", "tipo": "freight digital", "usuario": "importadores", "idioma": "solo inglés", "especifico_comercio": "Sí", "precio": "personalizado", "brecha": "asume inglés fluido"},
    {"nombre": "ContractPodAi", "tipo": "análisis contratos IA", "usuario": "equipos legales enterprise", "idioma": "inglés", "especifico_comercio": "Sí", "precio": "$50,000+/año", "brecha": "solo enterprise"},
    {"nombre": "ProMéxico", "tipo": "agencia gobierno", "usuario": "exportadores mexicanos", "idioma": "español", "especifico_comercio": "Sí", "precio": "gratis", "brecha": "lento, sin IA en tiempo real"}
  ],
  "brecha_oportunidad": "dónde existe el hueco de mercado real",
  "mapa_riesgos": [
    {"nivel": "ALTO", "descripcion": "Error en traducción de contrato", "escenario": "PYME firma términos incorrectos", "mitigacion": "siempre recomendar revisión legal"},
    {"nivel": "ALTO", "descripcion": "Dependencia excesiva del AI", "escenario": "usuario no revisa el output", "mitigacion": "disclaimer permanente en UI"},
    {"nivel": "MEDIO", "descripcion": "Competidor agrega español", "escenario": "Google o DeepL mejora para comercio", "mitigacion": "construir switching costs"},
    {"nivel": "MEDIO", "descripcion": "Privacidad de contratos", "escenario": "datos sensibles expuestos", "mitigacion": "no guardar por defecto"},
    {"nivel": "BAJO", "descripcion": "Regulación IA en México", "escenario": "COFECE restringe uso", "mitigacion": "humano siempre decide"},
    {"nivel": "BAJO", "descripcion": "Fricción de adopción", "escenario": "PYME no confía en IA", "mitigacion": "integración WhatsApp"}
  ],
  "recomendacion": "qué construir primero y por qué"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Full response keys:', Object.keys(data));
    console.log('stop_reason:', data.stop_reason);
    console.log('error:', data.error);

    if (data.error) {
      console.error('Anthropic API error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const rawText = data.content?.[0]?.text || '';
    console.log('Raw text length:', rawText.length);

    const clean = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);

  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json({ error: 'Error al procesar la investigación' }, { status: 500 });
  }
}
