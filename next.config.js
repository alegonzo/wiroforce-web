module.exports = {
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
    basePath: process.env.BASE_PATH || "/wiroforce",
};
