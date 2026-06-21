import { NextResponse } from 'next/server'
import { getBusinessById } from '@/lib/data'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const business = getBusinessById(id)

    if (!business) {
      return NextResponse.json({ success: false, error: 'Negocio no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true, business })
  } catch {
    return NextResponse.json({ success: false, error: 'Error al obtener negocio' }, { status: 500 })
  }
}
