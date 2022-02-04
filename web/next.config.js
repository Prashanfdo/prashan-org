module.exports = {
    swcMinify: true, 
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
        ]
    },
}