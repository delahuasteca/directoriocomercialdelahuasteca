import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    name: 'DeLaHuasteca',
    version: '1.0.0',
    description: 'Directorio Digital Empresarial de la Huasteca',
    database: false,
    dataStorage: 'JSON',
    contactForm: 'Gmail SMTP',
  })
}
