import { NextResponse } from 'next/server'

// Password change not available without database
// Update ADMIN_PASSWORD in .env file instead
export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Actualiza la contraseña en el archivo .env (ADMIN_PASSWORD)' },
    { status: 400 }
  )
}
