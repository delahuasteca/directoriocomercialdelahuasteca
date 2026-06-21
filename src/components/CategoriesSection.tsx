'use client'

import { motion } from 'framer-motion'
import {
  UtensilsCrossed,
  Heart,
  Monitor,
  GraduationCap,
  Car,
  Scissors,
  Home,
  Scale,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAppStore } from '@/lib/store'
import { categories } from '@/lib/data/categories'

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Heart,
  Monitor,
  GraduationCap,
  Car,
  Scissors,
  Home,
  Scale,
}

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  restaurantes: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
  salud: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-200' },
  tecnologia: { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200' },
  educacion: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
  automotriz: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-200' },
  belleza: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200' },
  hogar: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-200' },
  legal: { bg: 'bg-slate-50', icon: 'text-slate-600', border: 'border-slate-200' },
}

const defaultColors = { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-200' }

export default function CategoriesSection() {
  const { setSelectedCategory } = useAppStore()

  const handleClick = (cat: typeof categories[number]) => {
    setSelectedCategory(cat.id, cat.slug)
    const el = document.querySelector('#directorio')
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Explora por Categoría</h2>
        <p className="text-center text-gray-500 mb-10">Encuentra lo que necesitas en nuestra región</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const Icon = (cat.icon && iconMap[cat.icon]) || Home
          const colors = colorMap[cat.slug] || defaultColors

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card
                className={`cursor-pointer border ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                onClick={() => handleClick(cat)}
              >
                <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <span className="font-semibold text-gray-800 text-center text-sm">{cat.name}</span>
                  {cat.description && (
                    <span className="text-xs text-gray-400 text-center line-clamp-2">{cat.description}</span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
