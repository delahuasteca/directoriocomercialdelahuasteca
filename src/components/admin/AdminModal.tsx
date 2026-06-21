'use client'

import { useState } from 'react'
import { Shield, Eye, EyeOff, Loader2, LogOut, Mountain, Settings, FileJson, MessageCircle, Building2, FolderOpen, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAppStore, type AdminViewType } from '@/lib/store'
import { toast } from 'sonner'

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Error al iniciar sesión')
        return
      }

      onLogin(data.token)
      toast.success('Sesión iniciada correctamente')
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-4">
      <CardHeader className="text-center pb-2 px-0">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-emerald-600" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">Panel de Administración</CardTitle>
        <CardDescription className="text-gray-500">DeLaHuasteca — Ingresa tus credenciales</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="admin-username">Usuario</Label>
            <Input
              id="admin-username"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Contraseña</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </Button>
        </form>
      </CardContent>
    </div>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState<{ totalBusinesses: number; totalCategories: number; featuredBusinesses: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useState(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  })

  const statCards = stats
    ? [
        { title: 'Negocios', value: stats.totalBusinesses, icon: Building2, bgClass: 'bg-emerald-50', iconClass: 'text-emerald-600' },
        { title: 'Categorías', value: stats.totalCategories, icon: FolderOpen, bgClass: 'bg-amber-50', iconClass: 'text-amber-600' },
        { title: 'Destacados', value: stats.featuredBusinesses, icon: Star, bgClass: 'bg-sky-50', iconClass: 'text-sky-600' },
        { title: 'Contacto', value: 'WhatsApp', icon: MessageCircle, bgClass: 'bg-green-50', iconClass: 'text-green-600' },
      ]
    : []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500">Panel de administración</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${card.bgClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${card.iconClass}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{card.title}</p>
                      <p className="text-xl font-bold text-gray-900">{card.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Card className="border-emerald-100">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-700">DeLaHuasteca</h3>
              <p className="text-xs text-gray-500 mt-1">
                Datos en <code className="bg-gray-100 px-1 rounded text-[10px]">businesses.json</code> · 
                Mensajes vía WhatsApp
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0">Sin BD</Badge>
                <Badge className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0">JSON</Badge>
                <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0">WhatsApp</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminSettings() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Configuración</h2>
        <p className="text-sm text-gray-500">Información del sistema</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <FileJson className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-semibold text-amber-700">Datos del Directorio</span>
        </div>
        <p className="text-[11px] text-amber-600">
          Editar <code className="bg-amber-100 px-1 rounded text-[10px]">src/lib/data/businesses.json</code>
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-3.5 h-3.5 text-green-600" />
          <span className="text-xs font-semibold text-green-700">Formulario → WhatsApp</span>
        </div>
        <p className="text-[11px] text-green-600">
          Los mensajes se envían directo por WhatsApp
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">Credenciales</span>
        </div>
        <p className="text-[11px] text-gray-600">
          Configurar vía <code className="bg-gray-100 px-1 rounded text-[10px]">ADMIN_USERNAME</code> y <code className="bg-gray-100 px-1 rounded text-[10px]">ADMIN_PASSWORD</code>
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {['Restaurantes', 'Salud', 'Tecnología', 'Educación', 'Automotriz', 'Belleza', 'Hogar', 'Legal'].map((cat) => (
          <div key={cat} className="px-2 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] rounded text-center font-medium">
            {cat}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminModal() {
  const { adminToken, setAdminToken, adminView, setAdminView, adminModalOpen, setAdminModalOpen } = useAppStore()

  const isLoggedIn = adminToken !== null

  const handleLogin = (token: string) => {
    setAdminToken(token)
    setAdminView('dashboard')
  }

  const handleLogout = () => {
    setAdminToken(null)
    setAdminView('dashboard')
    setAdminModalOpen(false)
  }

  const navItems: { label: string; view: AdminViewType; icon: React.ElementType }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: Building2 },
    { label: 'Config', view: 'settings', icon: Settings },
  ]

  return (
    <Dialog open={adminModalOpen} onOpenChange={setAdminModalOpen}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">Panel de Administración</DialogTitle>
        <DialogDescription className="sr-only">Acceso al panel de administración de DeLaHuasteca</DialogDescription>

        {!isLoggedIn ? (
          <div className="p-6">
            <AdminLogin onLogin={handleLogin} />
          </div>
        ) : (
          <div>
            {/* Admin header */}
            <div className="p-4 border-b border-emerald-100 flex items-center justify-between bg-emerald-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Mountain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold text-emerald-700 text-sm">DeLaHuasteca</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-[9px] px-1 py-0 ml-1">ADMIN</Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600 hover:bg-red-50 h-8 gap-1 text-xs"
                onClick={handleLogout}
              >
                <LogOut className="w-3.5 h-3.5" />
                Salir
              </Button>
            </div>

            {/* Nav tabs */}
            <div className="flex border-b border-gray-100">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = adminView === item.view
                return (
                  <button
                    key={item.view}
                    onClick={() => setAdminView(item.view)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Content */}
            <div className="p-4">
              {adminView === 'settings' ? <AdminSettings /> : <AdminDashboard />}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
