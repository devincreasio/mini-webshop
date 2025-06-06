import { Geist, Geist_Mono } from 'next/font/google'

import Layout from '@/components/layout'
import { Providers } from '@/providers'

import type { Metadata } from 'next'

import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Mini Webshop',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <Layout>{children}</Layout>
                </Providers>
            </body>
        </html>
    )
}
