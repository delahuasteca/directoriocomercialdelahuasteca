import { NextResponse } from 'next/server'
//import { sendContactEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      )
    }

    await sendContactEmail({
      name,
      email,
      phone: body.phone || undefined,
      business: body.business || undefined,
      service: body.service || undefined,
      message,
    })

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el mensaje. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
