import { NextResponse } from 'next/server'
import { getBusinesses, getBusinessById } from '@/lib/data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const id = searchParams.get('id')

    if (id) {
      const business = getBusinessById(id)
      if (!business) {
        return NextResponse.json({ success: false, error: 'Negocio no encontrado' }, { status: 404 })
      }
      return NextResponse.json({ success: true, business })
    }

    const businesses = getBusinesses({
      category: category || undefined,
      search: search || undefined,
      featured: featured === 'true' ? true : undefined,
    })

    return NextResponse.json({ success: true, businesses })
  } catch {
    return NextResponse.json({ success: false, error: 'Error al obtener negocios' }, { status: 500 })
  }
}
