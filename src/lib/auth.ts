import { NextRequest } from 'next/server'

const ADMIN_TOKEN_PREFIX = 'admin-session-'

export function verifyAdminAuth(request: NextRequest | Request): boolean {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return false
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false
  const token = parts[1]
  if (!token.startsWith(ADMIN_TOKEN_PREFIX)) return false
  return true
}
