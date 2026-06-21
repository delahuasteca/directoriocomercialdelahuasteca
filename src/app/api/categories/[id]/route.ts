import { NextResponse } from 'next/server'

// Categories are hardcoded — no individual CRUD operations
export async function GET() {
  return NextResponse.json({ success: false, error: 'Use /api/categories to list all categories' }, { status: 404 })
}
