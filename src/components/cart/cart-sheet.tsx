'use client'

import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

import { CartItem } from '@/components/cart/cart-item'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { useCartStore } from '@/store/cart-store'

import { CheckoutModal } from '../checkout-modal'

export function CartSheet() {
    const { items, isSheetOpen, closeSheet, getTotalCost } = useCartStore()
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)

    const totalCost = getTotalCost()

    const handleCheckout = () => {
        closeSheet()
        setShowCheckoutModal(true)
    }

    return (
        <>
            <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
                <SheetContent className="flex w-full flex-col sm:w-96" side="right">
                    <SheetHeader className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5" />
                                Shopping Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
                            </SheetTitle>
                        </div>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <ShoppingCart className="mb-4 h-12 w-12 text-gray-300" />
                                <p className="text-gray-500">Your cart is empty</p>
                                <p className="mt-1 text-sm text-gray-400">Add some products to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <CartItem item={item} key={item.product.id} />
                                ))}
                            </div>
                        )}
                    </div>
                    {items.length > 0 && (
                        <SheetFooter className="flex-col space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Total:</span>
                                <span className="text-green-600">${totalCost.toFixed(2)}</span>
                            </div>
                            <Button className="w-full" size="lg" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </SheetFooter>
                    )}
                </SheetContent>
            </Sheet>
            <CheckoutModal open={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} />
        </>
    )
}
