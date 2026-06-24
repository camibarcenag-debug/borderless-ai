import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo.' }, { status: 400 })
    }

    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|txt|doc|docx)$/i)) {
      return NextResponse.json({ error: 'Formato no soportado. Sube un PDF, TXT, DOC o DOCX.' }, { status: 400 })
    }

    // Read file as text (works for txt, and extracts readable text from simple PDFs)
    const buffer = await file.arrayBuffer()
    const bytes = new Uint8Array(buffer)

    // Extract text — for PDF try to find readable text chunks
    let extractedText = ''

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      extractedText = new TextDecoder('utf-8').decode(bytes)
    } else {
      // For PDF/DOC: decode and extract printable ASCII/UTF-8 text chunks
      const raw = new TextDecoder('latin1').decode(bytes)
      // Extract text between PDF stream markers and readable strings
      const chunks: string[] = []

      // Try to find text in PDF streams
      const streamMatches = raw.match(/BT[\s\S]*?ET/g) || []
      for (const stream of streamMatches) {
        const textMatches = stream.match(/\(([^)]{3,})\)/g) || []
        for (const t of textMatches) {
          const clean = t.slice(1, -1).replace(/\\[nrt\\()]/g, ' ').trim()
          if (clean.length > 3 && /[a-zA-Z]/.test(clean)) {
            chunks.push(clean)
          }
        }
      }

      // Also extract readable sequences directly
      const readable = raw.match(/[\x20-\x7E]{8,}/g) || []
      for (const chunk of readable) {
        if (/[a-zA-Z]{3,}/.test(chunk) && !/^[0-9\s.]+$/.test(chunk)) {
          chunks.push(chunk)
        }
      }

      extractedText = [...new Set(chunks)].join(' ').substring(0, 8000)
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return NextResponse.json({
        error: 'No se pudo extraer texto del archivo. Por favor pega el texto manualmente en el campo de análisis.',
        partial: true
      }, { status: 422 })
    }

    return NextResponse.json({
      text: extractedText.trim(),
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (err) {
    console.error('PDF parse error:', err)
    return NextResponse.json({ error: 'Error procesando el archivo. Intenta de nuevo.' }, { status: 500 })
  }
}
