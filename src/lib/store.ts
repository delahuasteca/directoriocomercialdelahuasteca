import { create } from 'zustand'

export type AdminViewType = 'dashboard' | 'settings'

interface AppState {
  // Business detail modal
  selectedBusinessId: string | null
  setSelectedBusinessId: (id: string | null) => void

  // Directory filters
  selectedCategorySlug: string | null
  searchQuery: string
  setSelectedCategory: (id: string | null, slug: string | null) => void
  setSearchQuery: (query: string) => void

  // Admin modal
  adminToken: string | null
  adminView: AdminViewType
  adminModalOpen: boolean
  setAdminToken: (token: string | null) => void
  setAdminView: (view: AdminViewType) => void
  setAdminModalOpen: (open: boolean) => void

  // Contact form prefill
  contactService: string
  setContactService: (service: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedBusinessId: null,
  setSelectedBusinessId: (id) => set({ selectedBusinessId: id }),

  selectedCategorySlug: null,
  searchQuery: '',
  setSelectedCategory: (_id, slug) => set({ selectedCategorySlug: slug }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  adminToken: null,
  adminView: 'dashboard',
  adminModalOpen: false,
  setAdminToken: (token) => set({ adminToken: token }),
  setAdminView: (view) => set({ adminView: view }),
  setAdminModalOpen: (open) => set({ adminModalOpen: open }),

  contactService: '',
  setContactService: (service) => set({ contactService: service }),
}))
