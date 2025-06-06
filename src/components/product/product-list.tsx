import { ProductCard } from '@/components/product/product-card'

import type { Product } from '@/types'

interface ProductListProps {
    products: Product[]
}

export function ProductList({ products }: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-gray-500">No products found matching your criteria.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
