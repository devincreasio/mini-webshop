import { API_URL } from '@/constants'

import type { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json() as Promise<Product[]>
}

export async function getCategories(): Promise<string[]> {
    const response = await fetch(`${API_URL}/products/categories`)
    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }
    return response.json() as Promise<string[]>
}
