'use client'

import { CheckCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCartStore } from '@/store/cart-store'

interface CheckoutModalProps {
    open: boolean
    onClose: () => void
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
    const { items, getTotalCost, clearCart } = useCartStore()

    const totalCost = getTotalCost()

    const handleConfirm = () => {
        clearCart()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Checkout Confirmation
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">Order Summary:</h4>
                        <div className="space-y-1 text-sm">
                            {items.map((item) => (
                                <div className="flex justify-between" key={item.product.id}>
                                    <span>
                                        {item.product.title} × {item.quantity}
                                    </span>
                                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span className="text-green-600">${totalCost.toFixed(2)}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">Are you sure you want to complete this purchase?</p>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>Confirm Purchase</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
