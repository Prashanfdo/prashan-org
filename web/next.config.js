module.exports = {
    swcMinify: true, 
    images: {
        domains: ['picsum.photos'],
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
        ]
    },
}