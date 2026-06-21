import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    name: 'delaHuasteca',
    version: '1.0.0',
    description: 'Directorio Digital Empresarial de la Huasteca',
    dataStorage: 'JSON',
    contactForm: 'WhatsApp',
  })
}
