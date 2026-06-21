export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  order: number
  businessCount: number
}

export const categories: Category[] = [
  { id: 'cat-1', name: 'Restaurantes', slug: 'restaurantes', icon: 'UtensilsCrossed', description: 'Gastronomía y restaurantes', order: 1, businessCount: 2 },
  { id: 'cat-2', name: 'Salud', slug: 'salud', icon: 'Heart', description: 'Servicios médicos y de salud', order: 2, businessCount: 2 },
  { id: 'cat-3', name: 'Tecnología', slug: 'tecnologia', icon: 'Monitor', description: 'Servicios tecnológicos', order: 3, businessCount: 1 },
  { id: 'cat-4', name: 'Educación', slug: 'educacion', icon: 'GraduationCap', description: 'Centros educativos', order: 4, businessCount: 1 },
  { id: 'cat-5', name: 'Automotriz', slug: 'automotriz', icon: 'Car', description: 'Servicios automotrices', order: 5, businessCount: 1 },
  { id: 'cat-6', name: 'Belleza', slug: 'belleza', icon: 'Scissors', description: 'Salones y servicios de belleza', order: 6, businessCount: 1 },
  { id: 'cat-7', name: 'Hogar', slug: 'hogar', icon: 'Home', description: 'Servicios para el hogar', order: 7, businessCount: 1 },
  { id: 'cat-8', name: 'Legal', slug: 'legal', icon: 'Scale', description: 'Servicios legales y jurídicos', order: 8, businessCount: 1 },
]
