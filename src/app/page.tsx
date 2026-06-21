'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import CategoriesSection from '@/components/CategoriesSection'
import FeaturedBusinesses from '@/components/FeaturedBusinesses'
import DirectorySection from '@/components/DirectorySection'
import ServicesPortfolio from '@/components/ServicesPortfolio'
import ContactForm from '@/components/ContactForm'
import BusinessDetailModal from '@/components/BusinessDetail'
import AdminModal from '@/components/admin/AdminModal'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <HeroSection />
        <CategoriesSection />
        <FeaturedBusinesses />
        <DirectorySection />
        <ServicesPortfolio />
        <ContactForm />
      </main>

      <Footer />

      {/* Modals */}
      <BusinessDetailModal />
      <AdminModal />

      {/* Floating WhatsApp */}
      <WhatsAppFloat />
    </div>
  )
}
