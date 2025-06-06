import { CartSheet } from '@/components/cart/cart-sheet'
import { Header } from '@/components/layout/header'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <CartSheet />
        </>
    )
}
