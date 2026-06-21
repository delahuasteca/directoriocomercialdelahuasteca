import { NextResponse } from 'next/server'
import { getStats } from '@/lib/data'

export async function GET() {
  try {
    const stats = getStats()
    return NextResponse.json({ success: true, stats })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 })
  }
}
