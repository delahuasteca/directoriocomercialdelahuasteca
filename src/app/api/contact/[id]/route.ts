import { NextResponse } from 'next/server'

// Contact messages are sent to email — no storage or retrieval
export async function GET() {
  return NextResponse.json({ success: false, error: 'Messages are sent to email, not stored' }, { status: 404 })
}

export async function PUT() {
  return NextResponse.json({ success: false, error: 'Messages are sent to email, not stored' }, { status: 404 })
}

export async function DELETE() {
  return NextResponse.json({ success: false, error: 'Messages are sent to email, not stored' }, { status: 404 })
}
