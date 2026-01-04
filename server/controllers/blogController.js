import fs from 'fs'
import mongoose from 'mongoose'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import main from '../configs/gemini.js'

export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog)

        const imageFile = req.file

        // Check if all credits are present
        if(!title || !description || !category) {
            return res.json({success: false, message: "Missing required fields: title, description, or category"})
        }
        
        if(!imageFile) {
            return res.json({success: false, message: "Your request is missing file. Please upload an image."})
        }

        console.log('Uploading file:', imageFile.originalname, 'Path:', imageFile.path)

        // Read file as buffer (faster than stream for smaller files)
        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload Image to ImageKit using v7 API
        console.log('Starting ImageKit upload...')
        console.log('File size:', fileBuffer.length, 'bytes')
        const uploadStartTime = Date.now()
        
        let response
        try {
            response = await imagekit.beta.v2.files.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/blogs"
            })
            const uploadTime = Date.now() - uploadStartTime
            console.log(`ImageKit upload completed in ${uploadTime}ms`)
            console.log('ImageKit upload response:', JSON.stringify(response, null, 2))
        } catch (uploadError) {
            console.error('ImageKit upload failed:', uploadError)
            throw new Error(`ImageKit upload failed: ${uploadError.message}`)
        }

        // Get the file path from response (v7 API response structure)
        let filePath = response.filePath || response.path
        if (!filePath && response.url) {
            // Extract path from full URL
            const urlObj = new URL(response.url)
            filePath = urlObj.pathname
        }
        if (!filePath && response.fileId) {
            // If we only have fileId, try to get path from filePath property or construct
            filePath = response.filePath || `/${response.fileId}`
        }
        if (!filePath) {
            console.error('ImageKit response structure:', Object.keys(response))
            console.error('Full ImageKit response:', JSON.stringify(response, null, 2))
            throw new Error(`Failed to get file path from ImageKit response. Response keys: ${Object.keys(response).join(', ')}`)
        }
        
        console.log('Extracted file path:', filePath)

        // Clean up the temporary file
        fs.unlinkSync(imageFile.path)

        // Optimization through ImageKit URL Transformation
        // Build the optimized URL manually since v7 API structure is different
        let optimizedImageUrl
        
        // If response already has a full URL, use it and add transformations
        if (response.url) {
            const url = new URL(response.url)
            url.searchParams.set('tr', 'q_auto,f_webp,w_1280')
            optimizedImageUrl = url.toString()
        } else {
            // Build URL from path
            const transformations = 'q_auto,f_webp,w_1280'
            optimizedImageUrl = `${imagekit.urlEndpoint}${filePath}?tr=${transformations}`
        }
        
        console.log('Final image URL:', optimizedImageUrl)
        const image = optimizedImageUrl

        // Check if mongoose is connected before creating
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database is not connected. Please check your MongoDB connection.')
        }

        console.log('Creating blog in database...')
        const dbStartTime = Date.now()
        await Blog.create({title, subTitle, description, category, image, isPublished})
        const dbTime = Date.now() - dbStartTime
        console.log(`Blog created successfully in ${dbTime}ms!`)

        res.json({success: true, message: "Blog added successfully"})

    } catch(error) {
        console.error('Error adding blog:', error)
        // Clean up temp file if it exists
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path)
            } catch (cleanupError) {
                console.error('Error cleaning up temp file:', cleanupError)
            }
        }
        res.json({success: false, message: error.message || "Failed to upload image"})
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)
        if(!blog) {
            return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body
        await Blog.findByIdAndDelete(id)

        // Delete all comments associated with this blog
        await Comment.deleteMany({blog: id})

        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({success: true, message: "Blog status updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body
        await Comment.create({blog, name, content})
        res.json({success: true, message: "Comment added for review"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req , res)=> {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + "Generate a blog content for this topic in simple text format")
        res.json({success : true , content})
    } catch (error) {
        res.json({success : false , message: error.message})
    }

}