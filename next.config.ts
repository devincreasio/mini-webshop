import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
            {
                hostname: 'localhost',
            },
        ],
    },
}

export default nextConfig
