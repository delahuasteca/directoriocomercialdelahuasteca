import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/data'

export async function GET() {
  try {
    const categories = getCategories()
    return NextResponse.json({ success: true, categories })
  } catch {
    return NextResponse.json({ success: false, error: 'Error al obtener categorías' }, { status: 500 })
  }
}
