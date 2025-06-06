'use client'

import { ProductList } from '@/components/product/product-list'
import { ProductSkeleton } from '@/components/product/product-skeleton'
import { SearchFilter } from '@/components/search-filter'
import { useProducts } from '@/hooks/use-products'

export default function Home() {
    const { products, isLoading, error } = useProducts()

    return (
        <div className="container mx-auto flex flex-col py-10">
            <SearchFilter />
            {error ? (
                <div className="py-12 text-center">
                    <p className="text-lg text-red-500">Error loading products. Please try again later.</p>
                </div>
            ) : isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <ProductList products={products} />
            )}
        </div>
    )
}
