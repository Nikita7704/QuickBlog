import mongoose from "mongoose"
 
const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI
        
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables')
        }

        // Parse the URI and add database name
        let connectionString = MONGODB_URI
        const queryIndex = MONGODB_URI.indexOf('?')
        
        if (queryIndex !== -1) {
            // Insert database name before the query string
            connectionString = MONGODB_URI.slice(0, queryIndex) + '/quickblog' + MONGODB_URI.slice(queryIndex)
        } else {
            // No query string, append database name and add default options
            connectionString = MONGODB_URI + '/quickblog?retryWrites=true&w=majority'
        }
        
        console.log('Connecting to MongoDB...')

        mongoose.connection.on('connected', () => {
            console.log("✅ Database Connected Successfully")
        })

        mongoose.connection.on('error', (err) => {
            console.error("❌ Database Connection Error:", err.message)
        })

        mongoose.connection.on('disconnected', () => {
            console.log("⚠️ Database Disconnected")
        })

        // Connect with better options
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
        })
        
        console.log("✅ MongoDB connection established")
        
    } catch(error) {
        console.error("❌ Database connection failed:", error.message)
        process.exit(1) // Exit if database connection fails
    }
}

export default connectDB

// let mongodb_uri = 'mongodb+srv://zoom169speedster:HunterZolomon@zoom-cluster.wtvvdih.mongodb.net/?retryWrites=true&w=majority&appName=zoom-cluster'
// const qureyIndex = mongodb_uri.indexOf('?')
// const modified_uri = mongodb_uri.slice(0, qureyIndex) + 'quickblog' + mongodb_uri.slice(qureyIndex)
// console.log(modified_uri)