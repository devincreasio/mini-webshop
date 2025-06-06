'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getProducts, getCategories } from '@/services/product-service'
import { useSearchStore } from '@/store/search-store'

export function useProducts() {
    const { searchTerm, selectedCategory } = useSearchStore()

    const {
        data: products = [],
        isLoading: isLoadingProducts,
        error: productsError,
    } = useQuery({
        queryKey: ['products', searchTerm, selectedCategory],
        queryFn: getProducts,
    })

    const {
        data: apiCategories = [],
        isLoading: isLoadingCategories,
        error: categoriesError,
    } = useQuery({
        queryKey: ['categories', searchTerm, selectedCategory],
        queryFn: getCategories,
    })

    const categories = useMemo(() => ['all', ...apiCategories], [apiCategories])

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [products, searchTerm, selectedCategory])

    const isLoading = isLoadingProducts || isLoadingCategories
    const error = productsError ?? categoriesError

    return {
        products: filteredProducts,
        categories,
        isLoading,
        error,
    }
}
