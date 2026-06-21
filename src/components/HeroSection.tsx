'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/lib/store'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let current = 0
    const increment = target / 40
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  )
}

// Floating tech elements with different sizes, positions, and animations
const techElements = [
  // Circuit nodes
  { type: 'circuit', x: '8%', y: '15%', size: 60, delay: 0, duration: 6 },
  { type: 'circuit', x: '85%', y: '25%', size: 45, delay: 1.5, duration: 7 },
  { type: 'circuit', x: '15%', y: '70%', size: 50, delay: 0.8, duration: 5.5 },
  { type: 'circuit', x: '78%', y: '75%', size: 55, delay: 2, duration: 6.5 },
  // Code brackets
  { type: 'code', x: '12%', y: '35%', size: 35, delay: 0.5, duration: 8 },
  { type: 'code', x: '90%', y: '55%', size: 30, delay: 2.5, duration: 7 },
  { type: 'code', x: '5%', y: '55%', size: 28, delay: 1.2, duration: 9 },
  // Chips
  { type: 'chip', x: '92%', y: '15%', size: 40, delay: 0.3, duration: 7.5 },
  { type: 'chip', x: '4%', y: '85%', size: 35, delay: 1.8, duration: 6 },
  // WiFi / Signal
  { type: 'signal', x: '75%', y: '10%', size: 38, delay: 1, duration: 8 },
  { type: 'signal', x: '20%', y: '20%', size: 32, delay: 2.2, duration: 7 },
  // Gear
  { type: 'gear', x: '88%', y: '85%', size: 42, delay: 0.7, duration: 10 },
  { type: 'gear', x: '10%', y: '45%', size: 36, delay: 1.6, duration: 9 },
]

function TechElement({ type, x, y, size, delay, duration }: {
  type: string; x: string; y: string; size: number; delay: number; duration: number
}) {
  const renderIcon = () => {
    switch (type) {
      case 'circuit':
        return (
          <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.6" />
            <circle cx="30" cy="30" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="30" y1="0" x2="30" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="30" y1="42" x2="30" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="0" y1="30" x2="18" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="42" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <circle cx="30" cy="2" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="30" cy="58" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="2" cy="30" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="58" cy="30" r="2" fill="currentColor" opacity="0.4" />
          </svg>
        )
      case 'code':
        return (
          <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <path d="M13 10L5 20L13 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <path d="M27 10L35 20L27 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <line x1="22" y1="6" x2="18" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          </svg>
        )
      case 'chip':
        return (
          <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
            <rect x="12" y="12" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            <rect x="18" y="18" width="14" height="14" rx="2" fill="currentColor" opacity="0.2" />
            <line x1="18" y1="0" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="32" y1="0" x2="32" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="18" y1="38" x2="18" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="32" y1="38" x2="32" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="0" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="0" y1="30" x2="12" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="38" y1="20" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <line x1="38" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          </svg>
        )
      case 'signal':
        return (
          <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="32" r="3" fill="currentColor" opacity="0.5" />
            <path d="M12 28C12 28 15 22 20 22C25 22 28 28 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            <path d="M6 24C6 24 11 14 20 14C29 14 34 24 34 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
            <path d="M0 20C0 20 7 6 20 6C33 6 40 20 40 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
          </svg>
        )
      case 'gear':
        return (
          <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180
              const x1 = 20 + 9 * Math.cos(rad)
              const y1 = 20 + 9 * Math.sin(rad)
              const x2 = 20 + 14 * Math.cos(rad)
              const y2 = 20 + 14 * Math.sin(rad)
              return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            })}
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="absolute text-white/20 pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.7, 0.5, 0.7],
        scale: [0.8, 1, 0.95, 1],
        y: [0, -15, 5, -10],
        rotate: [0, type === 'gear' ? 90 : 5, type === 'gear' ? 180 : -3, type === 'gear' ? 270 : 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
    >
      {renderIcon()}
    </motion.div>
  )
}

export default function HeroSection() {
  const { setSearchQuery } = useAppStore()
  const [searchInput, setSearchInput] = useState('')
  const [stats, setStats] = useState({ businesses: 10, categories: 8 })

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats({
            businesses: data.stats.totalBusinesses,
            categories: data.stats.totalCategories,
          })
        }
      })
      .catch(() => {})
  }, [])

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleSearch = () => {
    setSearchQuery(searchInput)
    scrollTo('#directorio')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-500" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl" />

      {/* Floating tech elements */}
      <div className="absolute inset-0 hidden sm:block">
        {techElements.map((el, i) => (
          <TechElement key={i} {...el} />
        ))}
      </div>

      {/* Mobile: fewer elements */}
      <div className="absolute inset-0 sm:hidden">
        {techElements.slice(0, 5).map((el, i) => (
          <TechElement key={i} {...el} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6 border border-white/10">
            <Building2 className="w-4 h-4" />
            Directorio Digital Empresarial
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Tu Directorio Digital{' '}
          <span className="relative">
            <span className="text-emerald-200">Empresarial</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-1 bg-emerald-300/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Descubre los mejores negocios y servicios de la región Huasteca.
          Conectamos lo local con el mundo digital.
        </motion.p>

        {/* Search bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <div className="flex gap-2 bg-white rounded-xl p-2 shadow-xl shadow-black/10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar negocios, servicios..."
                className="pl-10 border-0 shadow-none focus-visible:ring-0 text-gray-700"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold text-base px-8 shadow-lg shadow-black/10"
            onClick={() => scrollTo('#directorio')}
          >
            Explorar Directorio
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 backdrop-blur-sm"
            onClick={() => scrollTo('#contacto')}
          >
            Agregar mi Negocio — ¡Gratis!
          </Button>
        </motion.div>

        {/* Animated counters */}
        <motion.div
          className="grid grid-cols-2 gap-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <AnimatedCounter target={stats.businesses} suffix="+" />
          <AnimatedCounter target={stats.categories} />
          <p className="text-emerald-200 text-sm -mt-3">Negocios</p>
          <p className="text-emerald-200 text-sm -mt-3">Categorías</p>
        </motion.div>
      </div>
    </section>
  )
}
