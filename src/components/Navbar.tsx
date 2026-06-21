'use client'

import { useState, useEffect } from 'react'
import { Mountain, Menu, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useAppStore } from '@/lib/store'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Directorio', href: '#directorio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const { setAdminModalOpen } = useAppStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100' : 'bg-white/80 backdrop-blur-md border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('#inicio')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-700">DeLaHuasteca</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => setAdminModalOpen(true)}
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="text-emerald-700 font-bold text-lg">DeLaHuasteca</SheetTitle>
                <SheetDescription className="sr-only">Menú de navegación móvil</SheetDescription>
                <nav className="flex flex-col gap-2 mt-6">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 justify-start"
                      onClick={() => handleNav(link.href)}
                    >
                      {link.label}
                    </Button>
                  ))}
                  <hr className="my-2 border-gray-200" />
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 justify-start gap-2"
                    onClick={() => { setOpen(false); setAdminModalOpen(true) }}
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
