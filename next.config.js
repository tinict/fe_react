/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: 'anonymous',
    compress: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
