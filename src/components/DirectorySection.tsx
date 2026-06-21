'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Phone, Mail, MapPin, MessageCircle, X, SlidersHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/lib/store'

interface Business {
  id: string
  name: string
  slug: string
  description: string
  phone: string | null
  email: string | null
  address: string | null
  featured: boolean
  whatsapp: string | null
  category: { id: string; name: string; slug: string }
}

interface Category {
  id: string
  name: string
  slug: string
}

interface FetchResult {
  key: string
  businesses: Business[]
}

function makeFetchKey(category: string | null, search: string) {
  return `${category ?? ''}::${search}`
}

export default function DirectorySection() {
  const { setSelectedBusinessId, selectedCategorySlug, searchQuery, setSearchQuery, setSelectedCategory } = useAppStore()
  const [categories, setCategories] = useState<Category[]>([])
  const [result, setResult] = useState<FetchResult>({ key: '', businesses: [] })
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategorySlug)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => { if (data.success) setCategories(data.categories) })
      .catch(() => {})
  }, [])

  // Sync selectedCategorySlug from outside (e.g. category click from hero)
  useEffect(() => {
    setActiveCategory(selectedCategorySlug)
  }, [selectedCategorySlug])

  const currentKey = makeFetchKey(activeCategory, searchQuery)

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams()
    if (activeCategory) params.set('category', activeCategory)
    if (searchQuery) params.set('search', searchQuery)

    fetch(`/api/businesses?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setResult({ key: makeFetchKey(activeCategory, searchQuery), businesses: data.success ? data.businesses : [] })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ key: makeFetchKey(activeCategory, searchQuery), businesses: [] })
        }
      })

    return () => { cancelled = true }
  }, [activeCategory, searchQuery])

  const loading = result.key !== currentKey
  const businesses = result.key === currentKey ? result.businesses : []

  const handleSearch = () => {
    setSearchQuery(localSearch)
  }

  const handleCategoryFilter = (slug: string | null) => {
    setActiveCategory(slug)
    setSelectedCategory(null, slug)
  }

  const clearFilters = () => {
    setActiveCategory(null)
    setSelectedCategory(null, null)
    setLocalSearch('')
    setSearchQuery('')
  }

  const hasFilters = activeCategory || searchQuery

  return (
    <section id="directorio" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900">Directorio Empresarial</h2>
        <p className="text-gray-500 mt-2">Encuentra los mejores negocios de la Huasteca</p>
      </motion.div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar negocios..."
            className="pl-9"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
        {hasFilters && (
          <Button variant="outline" onClick={clearFilters} className="gap-1">
            <X className="w-3 h-3" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <Button
          variant={!activeCategory ? 'default' : 'outline'}
          size="sm"
          className={!activeCategory ? 'bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap' : 'whitespace-nowrap'}
          onClick={() => handleCategoryFilter(null)}
        >
          <SlidersHorizontal className="w-3 h-3 mr-1" />
          Todos
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.slug ? 'default' : 'outline'}
            size="sm"
            className={activeCategory === cat.slug ? 'bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap' : 'whitespace-nowrap'}
            onClick={() => handleCategoryFilter(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">No se encontraron negocios</h3>
          <p className="text-gray-400 mt-1">Intenta con otra búsqueda o categoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((biz, i) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-full"
                onClick={() => setSelectedBusinessId(biz.id)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-lg font-bold text-emerald-600 flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      {biz.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                        {biz.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1 text-xs">{biz.category.name}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 line-clamp-2">{biz.description}</p>

                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {biz.phone && (
                      <a
                        href={`tel:${biz.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                        title={biz.phone}
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    )}
                    {biz.whatsapp && (
                      <a
                        href={`https://wa.me/${biz.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                      </a>
                    )}
                    {biz.email && (
                      <a
                        href={`mailto:${biz.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                        title={biz.email}
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    )}
                    {biz.address && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto" title={biz.address}>
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">{biz.address}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
