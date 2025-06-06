'use client'

import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { useMemo } from 'react'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCategories } from '@/services/product-service'
import { useSearchStore } from '@/store/search-store'

import { Button } from './ui/button'

export function SearchFilter() {
    const { searchTerm, selectedCategory, setSearchTerm, setSelectedCategory, clearFilters } = useSearchStore()

    const { data: apiCategories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    const categories = useMemo(() => ['all', ...apiCategories], [apiCategories])

    const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all'

    return (
        <div className="mb-6 space-y-4 sm:flex sm:items-center sm:gap-4 sm:space-y-0">
            <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                    className="pl-10"
                    placeholder="Search products..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                    <SelectValue className="sm:w-48" placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category === 'all'
                                ? 'All Categories'
                                : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {hasActiveFilters && (
                <Button className="w-full sm:w-auto" variant="outline" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                </Button>
            )}
        </div>
    )
}
