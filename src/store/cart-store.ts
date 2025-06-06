import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Product, CartItem } from '@/types'

interface CartStore {
    items: CartItem[]
    isSheetOpen: boolean
    addToCart: (product: Product, quantity?: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
    getTotalCost: () => number
    openSheet: () => void
    closeSheet: () => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isSheetOpen: false,

            addToCart: (product: Product, quantity = 1) => {
                if (quantity <= 0) {
                    console.error('Invalid quantity: must be greater than 0')
                    return
                }

                set((state) => {
                    const existingItem = state.items.find((item) => item.product.id === product.id)

                    let newItems: CartItem[]
                    if (existingItem) {
                        newItems = state.items.map((item) =>
                            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
                        )
                    } else {
                        newItems = [...state.items, { product, quantity }]
                    }

                    return {
                        items: newItems,
                        isSheetOpen: true, // Auto-open sheet when adding items
                    }
                })
            },

            updateQuantity: (productId: number, newQuantity: number) => {
                if (newQuantity < 0) {
                    console.error('Invalid quantity: cannot be negative')
                    return
                }

                if (newQuantity === 0) {
                    get().removeFromCart(productId)
                    return
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId ? { ...item, quantity: newQuantity } : item,
                    ),
                }))
            },

            removeFromCart: (productId: number) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }))
            },

            clearCart: () => {
                set({ items: [], isSheetOpen: false })
            },

            getTotalCost: () => {
                const { items } = get()
                return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
            },

            openSheet: () => set({ isSheetOpen: true }),
            closeSheet: () => set({ isSheetOpen: false }),
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({ items: state.items }), // Only persist items, not sheet state
        },
    ),
)
