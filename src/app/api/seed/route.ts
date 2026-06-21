import { NextResponse } from 'next/server'

// No database needed — data comes from JSON files
export async function GET() {
  return NextResponse.json({ success: true, message: 'Data loaded from JSON files', seeded: false })
}
