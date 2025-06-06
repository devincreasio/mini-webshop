'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'

import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCartStore()
    const { product, quantity } = item

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1)
        } else {
            removeFromCart(product.id)
        }
    }

    const handleIncrease = () => {
        updateQuantity(product.id, quantity + 1)
    }

    const handleRemove = () => {
        removeFromCart(product.id)
    }

    return (
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium">{product.title}</h4>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
                <p className="text-sm font-semibold text-green-600">${(product.price * quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <Button className="h-8 w-8 p-0" size="sm" variant="outline" onClick={handleDecrease}>
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <Button className="h-8 w-8 p-0" size="sm" variant="outline" onClick={handleIncrease}>
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
                <Button
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    size="sm"
                    variant="outline"
                    onClick={handleRemove}
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </div>
        </div>
    )
}
