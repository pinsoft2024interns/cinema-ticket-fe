/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ebayimg.com',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/t/**',
            },
            {
                protocol: 'https',
                hostname: 'posters.movieposterdb.com',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
