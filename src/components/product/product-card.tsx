'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'

import type { Product } from '@/types'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCartStore()

    const handleAddToCart = () => {
        addToCart(product, 1)
    }

    return (
        <Card className="flex h-full flex-col">
            <CardContent className="flex-1">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                        fill
                        alt={product.title}
                        className="pointer-events-none object-contain p-2"
                        src={product.image || '/placeholder.svg'}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-lg leading-tight font-semibold">{product.title}</h3>
                        <Badge className="shrink-0" variant="secondary">
                            {product.category}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating.rate}</span>
                        <span className="text-sm text-gray-500">({product.rating.count})</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
                </div>
            </CardContent>
            <CardFooter className="px-4 py-0">
                <Button className="w-full" size="lg" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
