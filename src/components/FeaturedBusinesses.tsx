'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Star, ChevronRight, ChevronLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

interface Business {
  id: string
  name: string
  slug: string
  description: string
  phone: string | null
  email: string | null
  address: string | null
  logo: string | null
  featured: boolean
  whatsapp: string | null
  category: { name: string; slug: string }
}

const gradients = [
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
  'from-violet-500 to-purple-600',
  'from-lime-500 to-green-600',
]

export default function FeaturedBusinesses() {
  const { setSelectedBusinessId } = useAppStore()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollIndex, setScrollIndex] = useState(0)

  useEffect(() => {
    fetch('/api/businesses?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBusinesses(data.businesses)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (dir === 'left') setScrollIndex(Math.max(0, scrollIndex - 1))
    else setScrollIndex(Math.min(businesses.length - 1, scrollIndex + 1))
  }

  if (loading) {
    return (
      <section className="py-16 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Negocios Destacados</h2>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="min-w-[300px] h-72 rounded-xl bg-gray-100 animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (businesses.length === 0) return null

  return (
    <section className="py-16 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Negocios Destacados</h2>
            <p className="text-gray-500 mt-1">Los mejores negocios de la Huasteca</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} disabled={scrollIndex === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')} disabled={scrollIndex >= businesses.length - 1}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {businesses.map((biz, i) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-start"
            >
              <Card
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 group h-full"
                onClick={() => setSelectedBusinessId(biz.id)}
              >
                {/* Gradient cover */}
                <div className={`h-32 bg-gradient-to-r ${gradients[i % gradients.length]} relative`}>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-emerald-700 gap-1">
                    <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                    Destacado
                  </Badge>
                  <div className="absolute -bottom-8 left-4">
                    <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl font-bold text-emerald-600 border-2 border-white">
                      {biz.name.charAt(0)}
                    </div>
                  </div>
                </div>

                <CardContent className="pt-12 pb-4">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
                    {biz.name}
                  </h3>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {biz.category.name}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{biz.description}</p>

                  <div className="flex items-center gap-2 mt-3">
                    {biz.phone && (
                      <a
                        href={`tel:${biz.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    )}
                    {biz.email && (
                      <a
                        href={`mailto:${biz.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    )}
                    {biz.address && (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
