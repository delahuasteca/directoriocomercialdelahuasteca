import { categories, type Category } from './categories'
import businessesData from './businesses.json'

export interface Business {
  id: string
  name: string
  slug: string
  description: string
  phone: string | null
  email: string | null
  website: string | null
  address: string | null
  logo: string | null
  coverImage: string | null
  featured: boolean
  active: boolean
  categoryId: string
  services: string | null
  whatsapp: string | null
  facebook: string | null
  instagram: string | null
  createdAt: string
  updatedAt: string
  category?: Category
}

export interface BusinessFilters {
  category?: string
  search?: string
  featured?: boolean
  active?: boolean
}

export function getCategories(): Category[] {
  return categories.map((cat) => ({
    ...cat,
    businessCount: businessesData.filter(
      (b) => b.categoryId === cat.id && b.active
    ).length,
  }))
}

export function getBusinesses(filters?: BusinessFilters): Business[] {
  let results = [...businessesData] as Business[]

  const showActive = filters?.active !== undefined ? filters.active : true
  if (showActive) {
    results = results.filter((b) => b.active)
  }

  if (filters?.category) {
    const categoryObj = categories.find(
      (c) => c.slug === filters.category || c.id === filters.category
    )
    if (categoryObj) {
      results = results.filter((b) => b.categoryId === categoryObj.id)
    }
  }

  if (filters?.search) {
    const query = filters.search.toLowerCase()
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query)
    )
  }

  if (filters?.featured !== undefined) {
    results = results.filter((b) => b.featured === filters.featured)
  }

  return results.map((b) => ({
    ...b,
    category: categories.find((c) => c.id === b.categoryId),
  }))
}

export function getBusinessById(id: string): Business | undefined {
  const business = businessesData.find((b) => b.id === id)
  if (!business) return undefined
  return {
    ...business,
    category: categories.find((c) => c.id === business.categoryId),
  }
}

export function getBusinessBySlug(slug: string): Business | undefined {
  const business = businessesData.find((b) => b.slug === slug)
  if (!business) return undefined
  return {
    ...business,
    category: categories.find((c) => c.id === business.categoryId),
  }
}

export function getStats() {
  return {
    totalBusinesses: businessesData.filter((b) => b.active).length,
    totalCategories: categories.length,
    featuredBusinesses: businessesData.filter((b) => b.featured && b.active).length,
  }
}

export function getAllBusinesses(): Business[] {
  return businessesData.map((b) => ({
    ...b,
    category: categories.find((c) => c.id === b.categoryId),
  }))
}
