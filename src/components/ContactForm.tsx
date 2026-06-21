'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppStore } from '@/lib/store'

// Número de WhatsApp de DeLaHuasteca (sin + ni espacios)
const WHATSAPP_NUMBER = '524831234567'

const serviceLabels: Record<string, string> = {
  gratuito: 'Plan Gratuito - Registro en Directorio',
  landing: 'Landing Page Profesional',
  chatbot: 'Chatbot con IA',
  'menu-digital': 'Menú Digital Interactivo',
  otro: 'Otro',
}

export default function ContactForm() {
  const { contactService, setContactService } = useAppStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    service: '',
    message: '',
  })

  // Sync service from store (when user clicks CTA on services section)
  // We use useEffect only to subscribe to the store, and apply changes via queueMicrotask
  // to satisfy the lint rule about not calling setState in effects synchronously
  useEffect(() => {
    if (contactService) {
      queueMicrotask(() => {
        setFormData((prev) => ({ ...prev, service: contactService }))
        setContactService('')
      })
    }
  }, [contactService, setContactService])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const buildWhatsAppMessage = () => {
    const parts: string[] = []
    parts.push('📩 *Nuevo contacto desde DeLaHuasteca*')
    parts.push('')
    parts.push(`👤 *Nombre:* ${formData.name}`)
    if (formData.phone) parts.push(`📱 *Teléfono:* ${formData.phone}`)
    if (formData.business) parts.push(`🏪 *Negocio:* ${formData.business}`)
    if (formData.service) parts.push(`💼 *Servicio:* ${serviceLabels[formData.service] || formData.service}`)
    parts.push('')
    parts.push(`💬 *Mensaje:*`)
    parts.push(formData.message)

    return encodeURIComponent(parts.join('\n'))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = buildWhatsAppMessage()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(url, '_blank')
  }

  return (
    <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">Contáctanos</CardTitle>
            <CardDescription className="text-base">
              ¿Tienes un negocio? ¡Nosotros te ayudamos a digitalizarlo!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono / WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(483) 123-4567"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Nombre de tu negocio</Label>
                <Input
                  id="business"
                  placeholder="Ej: Restaurante El Sabor"
                  value={formData.business}
                  onChange={(e) => handleChange('business', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Servicio de interés</Label>
                <Select value={formData.service} onValueChange={(v) => handleChange('service', v)}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gratuito">Plan Gratuito - Registro en Directorio</SelectItem>
                    <SelectItem value="landing">Landing Page Profesional</SelectItem>
                    <SelectItem value="chatbot">Chatbot con IA</SelectItem>
                    <SelectItem value="menu-digital">Menú Digital Interactivo</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 text-base py-5"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar por WhatsApp
              </Button>

              <p className="text-center text-xs text-gray-400 mt-2">
                Se abrirá WhatsApp con tu mensaje listo para enviar
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
