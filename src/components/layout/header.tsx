'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'

export function Header() {
    const { items, openSheet } = useCartStore()

    return (
        <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-3xl font-bold text-gray-900">Mini Webshop</h1>
                    </Link>
                    <Button className="relative" size="lg" variant="outline" onClick={openSheet}>
                        <ShoppingCart className="h-5 w-5" />
                        <span className="ml-2 hidden sm:inline">Cart</span>
                        {items.length > 0 ? (
                            <Badge
                                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs"
                                variant="destructive"
                            >
                                {items.reduce((acc, item) => acc + item.quantity, 0)}
                            </Badge>
                        ) : null}
                    </Button>
                </div>
            </div>
        </header>
    )
}
