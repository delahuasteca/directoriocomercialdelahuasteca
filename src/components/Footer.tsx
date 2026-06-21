'use client'

import { Mountain, Phone, MessageCircle, MapPin } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Directorio', href: '#directorio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
]

const serviceLinks = [
  'Plan Gratuito',
  'Landing Pages',
  'Chatbots con IA',
  'Menús Digitales',
]

export default function Footer() {
  const { setAdminModalOpen } = useAppStore()

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => scrollTo('#inicio')} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DeLaHuasteca</span>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu directorio digital empresarial de la región Huasteca. Conectamos lo local con el mundo digital.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo('#servicios')}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/524831234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                (483) 123-4567
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Ciudad Valles, San Luis Potosí, México
              </li>
            </ul>
            <button
              onClick={() => setAdminModalOpen(true)}
              className="mt-4 text-xs text-gray-600 hover:text-emerald-400 transition-colors"
            >
              Acceso administrador
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DeLaHuasteca. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
