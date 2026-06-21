import { NextResponse } from 'next/server'

// Contact form sends via WhatsApp directly from the client
// This endpoint exists for potential future integrations
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Nombre y mensaje son requeridos' },
        { status: 400 }
      )
    }

    // WhatsApp message is built and sent client-side
    return NextResponse.json({ success: true, message: 'Usa WhatsApp para contactarnos' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

