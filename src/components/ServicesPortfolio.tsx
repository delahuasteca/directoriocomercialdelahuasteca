'use client'

import { motion } from 'framer-motion'
import { Globe, Bot, UtensilsCrossed, Check, ArrowRight, ListChecks, Star, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'

const services = [
  {
    title: 'Plan Gratuito',
    description: 'Aparece en el directorio digital de la Huasteca sin costo. Ideal para empezar a tener presencia en línea.',
    price: 'Gratis',
    period: 'sin costo',
    icon: ListChecks,
    color: 'sky',
    gradient: 'from-sky-500 to-cyan-600',
    popular: false,
    features: [
      'Registro en el directorio',
      'Nombre y descripción del negocio',
      'Teléfono y dirección',
      'Enlace a redes sociales',
      'Apareces en búsquedas',
      'Categoría del negocio',
    ],
    cta: 'Registrarme Gratis',
    serviceValue: 'gratuito',
  },
  {
    title: 'Landing Page Profesional',
    description: 'Presencia digital impactante para tu negocio con diseño moderno y optimizado para convertir visitantes en clientes.',
    price: 'Desde $2,999 MXN',
    period: 'pago único',
    icon: Globe,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    popular: true,
    features: [
      'Todo del Plan Gratuito',
      'Diseño responsive personalizado',
      'Optimización SEO básica',
      'Formulario de contacto',
      'Integración con redes sociales',
      'Certificado SSL incluido',
      'Hosting por 1 año',
    ],
    cta: 'Solicitar Cotización',
    serviceValue: 'landing',
  },
  {
    title: 'Chatbot con IA',
    description: 'Automatiza la atención a tus clientes 24/7 con inteligencia artificial que responde preguntas y genera leads.',
    price: 'Desde $1,999 MXN/mes',
    period: 'suscripción mensual',
    icon: Bot,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    popular: false,
    features: [
      'Todo del Plan Gratuito',
      'Asistente virtual 24/7',
      'Respuestas personalizadas',
      'Integración WhatsApp',
      'Panel de métricas',
      'Capacitación continua',
      'Soporte técnico prioritario',
    ],
    cta: 'Solicitar Cotización',
    serviceValue: 'chatbot',
  },
  {
    title: 'Menú Digital Interactivo',
    description: 'Transforma tu menú en una experiencia digital con fotos, descripciones y pedidos directos desde el celular.',
    price: 'Desde $999 MXN/mes',
    period: 'suscripción mensual',
    icon: UtensilsCrossed,
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    popular: false,
    features: [
      'Todo del Plan Gratuito',
      'Menú interactivo con fotos',
      'Código QR personalizado',
      'Actualizaciones ilimitadas',
      'Multilingüe (ES/EN)',
      'Compatible con todos los dispositivos',
      'Sin descarga de app necesaria',
    ],
    cta: 'Solicitar Cotización',
    serviceValue: 'menu-digital',
  },
]

const colorClasses = {
  sky: {
    badge: 'bg-sky-100 text-sky-700',
    featureIcon: 'bg-sky-100 text-sky-600',
    border: 'border-t-sky-500',
  },
  emerald: {
    badge: 'bg-emerald-100 text-emerald-700',
    featureIcon: 'bg-emerald-100 text-emerald-600',
    border: 'border-t-emerald-500',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-700',
    featureIcon: 'bg-amber-100 text-amber-600',
    border: 'border-t-amber-500',
  },
  rose: {
    badge: 'bg-rose-100 text-rose-700',
    featureIcon: 'bg-rose-100 text-rose-600',
    border: 'border-t-rose-500',
  },
}

export default function ServicesPortfolio() {
  const { setContactService } = useAppStore()

  const handleCta = (serviceValue: string) => {
    setContactService(serviceValue)
    const el = document.querySelector('#contacto')
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="servicios" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900">Nuestros Planes y Servicios</h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Soluciones digitales diseñadas para impulsar tu negocio en la Huasteca. ¡Empieza gratis!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {services.map((service, i) => {
          const colors = colorClasses[service.color as keyof typeof colorClasses]
          const Icon = service.icon

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex"
            >
              <Card className={`h-full w-full flex flex-col border-t-4 ${colors.border} hover:shadow-xl transition-shadow duration-300 relative ${service.popular ? 'ring-2 ring-emerald-500 shadow-lg' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 px-3 py-1 gap-1">
                      <Star className="w-3 h-3" />
                      Más Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={colors.badge}>{service.period}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-3">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    {service.price === 'Gratis' ? (
                      <div className="flex items-baseline gap-1">
                        <Zap className="w-5 h-5 text-sky-500" />
                        <span className="text-2xl font-bold text-gray-900">Gratis</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className={`w-5 h-5 rounded-full ${colors.featureIcon} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white gap-2 mt-auto`}
                    onClick={() => handleCta(service.serviceValue)}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Comparison note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10 text-center"
      >
        <p className="text-sm text-gray-500">
          Todos los planes de pago incluyen los beneficios del <span className="font-semibold text-sky-600">Plan Gratuito</span>. 
          ¿Necesitas algo personalizado?{' '}
          <button
            onClick={() => handleCta('otro')}
            className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2"
          >
            Contáctanos
          </button>
        </p>
      </motion.div>
    </section>
  )
}
