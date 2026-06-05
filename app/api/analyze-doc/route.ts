import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No se recibio archivo." }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    const clean = text.replace(/[^\x20-\x7E\n\r\t]/g, " ").trim().slice(0, 12000);

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      system: "Eres un agente experto en analisis de documentos comerciales internacionales para PYMES mexicanas. Recibes texto en ingles de un contrato, orden de compra, factura o documento comercial. Devuelves SOLO un objeto JSON valido en espanol con exactamente estos 5 campos: resumen (string con un parrafo claro explicando de que trata el documento), clausulas_clave (array de objetos con campo y explicacion), items_con_costo (array de objetos con item e impacto), banderas_riesgo (array de objetos con riesgo, severidad como HIGH o MEDIUM o LOW, y mitigacion), recomendacion (string con que revisar con un especialista antes de firmar). Sin markdown. Sin texto adicional. Solo JSON valido.",
      messages: [{ role: "user", content: "Analiza este documento comercial en ingles:\n\n" + clean }],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    const stripped = raw.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(stripped);
    return NextResponse.json(parsed);
  } catch (e: any) {
    console.error("analyze-doc error:", e);
    return NextResponse.json({ error: e.message || "Error al analizar." }, { status: 500 });
  }
}
