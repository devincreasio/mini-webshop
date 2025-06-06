import { create } from 'zustand'

interface SearchStore {
    searchTerm: string
    selectedCategory: string
    setSearchTerm: (term: string) => void
    setSelectedCategory: (category: string) => void
    clearFilters: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
    searchTerm: '',
    selectedCategory: 'all',

    setSearchTerm: (term: string) => set({ searchTerm: term }),
    setSelectedCategory: (category: string) => set({ selectedCategory: category }),
    clearFilters: () => set({ searchTerm: '', selectedCategory: 'all' }),
}))
