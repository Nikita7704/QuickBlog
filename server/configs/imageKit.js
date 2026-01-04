import ImageKit from '@imagekit/nodejs'

// Validate environment variables
if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
    console.error('ImageKit environment variables are missing!')
    throw new Error('ImageKit configuration is incomplete. Please check your .env file.')
}

// ImageKit v7 only needs privateKey (not publicKey)
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// Store URL endpoint for URL generation
imagekit.urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

export default imagekit