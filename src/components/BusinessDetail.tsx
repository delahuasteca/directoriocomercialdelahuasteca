'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Globe,
  ExternalLink,
  X,
  Star,
  Facebook,
  Instagram,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAppStore } from '@/lib/store'

interface Business {
  id: string
  name: string
  slug: string
  description: string
  phone: string | null
  email: string | null
  website: string | null
  address: string | null
  logo: string | null
  featured: boolean
  services: string | null
  whatsapp: string | null
  facebook: string | null
  instagram: string | null
  category: { name: string; slug: string }
}

interface FetchResult {
  id: string
  business: Business | null
}

export default function BusinessDetailModal() {
  const { selectedBusinessId, setSelectedBusinessId } = useAppStore()
  const [result, setResult] = useState<FetchResult | null>(null)

  const isOpen = selectedBusinessId !== null

  useEffect(() => {
    if (!selectedBusinessId) return
    let cancelled = false

    fetch(`/api/businesses/${selectedBusinessId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setResult({ id: selectedBusinessId, business: data.success ? data.business : null })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ id: selectedBusinessId, business: null })
        }
      })

    return () => { cancelled = true }
  }, [selectedBusinessId])

  const loading = result === null || result.id !== selectedBusinessId
  const business = result?.id === selectedBusinessId ? result.business : null

  const close = () => setSelectedBusinessId(null)

  const servicesList = business?.services
    ? business.services.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">{business?.name ?? 'Detalle del negocio'}</DialogTitle>
        <DialogDescription className="sr-only">Detalles e información de contacto del negocio</DialogDescription>

        {loading ? (
          <div className="p-6">
            <div className="h-40 rounded-2xl bg-gray-100 animate-pulse mb-6" />
            <div className="h-8 w-1/2 bg-gray-100 animate-pulse mb-4 rounded" />
            <div className="h-4 w-1/3 bg-gray-100 animate-pulse mb-8 rounded" />
            <div className="h-40 bg-gray-100 animate-pulse rounded" />
          </div>
        ) : !business ? (
          <div className="py-16 text-center px-6">
            <h2 className="text-2xl font-bold text-gray-600">Negocio no encontrado</h2>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={close}>
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            {/* Cover */}
            <div className="h-40 sm:h-48 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 relative overflow-hidden rounded-t-lg">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              {business.featured && (
                <Badge className="absolute top-4 right-4 bg-white/90 text-emerald-700 gap-1">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  Destacado
                </Badge>
              )}
              <button
                onClick={close}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              {/* Logo */}
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-emerald-600 border-4 border-white">
                  {business.name.charAt(0)}
                </div>
              </div>
            </div>

            <div className="px-6 pt-14 pb-6">
              {/* Name and category */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{business.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-emerald-100 text-emerald-700">{business.category.name}</Badge>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {business.phone && (
                  <a href={`tel:${business.phone}`}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                      <Phone className="w-4 h-4" />
                      Llamar
                    </Button>
                  </a>
                )}
                {business.whatsapp && (
                  <a href={`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  </a>
                )}
                {business.email && (
                  <a href={`mailto:${business.email}`}>
                    <Button variant="outline" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </a>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-4">Descripción</h2>
                      <p className="text-gray-600 leading-relaxed">{business.description}</p>

                      {/* Contact info */}
                      <div className="mt-6 space-y-3">
                        {business.phone && (
                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-gray-700">{business.phone}</span>
                          </div>
                        )}
                        {business.email && (
                          <div className="flex items-center gap-3 text-sm">
                            <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-gray-700">{business.email}</span>
                          </div>
                        )}
                        {business.address && (
                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-gray-700">{business.address}</span>
                          </div>
                        )}
                        {business.website && (
                          <div className="flex items-center gap-3 text-sm">
                            <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <a
                              href={business.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:underline flex items-center gap-1"
                            >
                              Sitio web <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Social media */}
                      {(business.facebook || business.instagram) && (
                        <div className="mt-4 flex gap-2">
                          {business.facebook && (
                            <a
                              href={business.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
                            >
                              <Facebook className="w-4 h-4 text-blue-600" />
                            </a>
                          )}
                          {business.instagram && (
                            <a
                              href={business.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                            >
                              <Instagram className="w-4 h-4 text-pink-600" />
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Services */}
                {servicesList.length > 0 && (
                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Servicios</h2>
                        <ul className="space-y-2">
                          {servicesList.map((service, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
