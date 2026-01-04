// import React, { useEffect, useRef, useState } from 'react'
// import { assets, blogCategories } from '../../assets/assets'
// import Quill from 'quill'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'
// import {parse} from 'marked'



// const AddBlog = () => {

//   const {axios} = useAppContext()
//   const [isAdding, setIsAdding] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const editorRef = useRef(null)
//   const quillRef = useRef(null)


//   const [image, setImage] = useState(false)
//   const [title, setTitle] = useState('')
//   const [subTitle, setSubTitle] = useState('')
//   const [category, setCategory] = useState('Startup')
//   const [isPublished, setIsPublished] = useState(false)
  
  
// const generateContent = async () => {
//   if(!title) return toast.error('Please enter a title')

//     try {
//       setLoading(true)
//       const {data} = await axios.post('/api/blog/generate' , {prompt : title})
//       if(data.success) {
//         quillRef.current.root.innerHTML = parse(data.content)
//       }else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }finally {
//       setLoading(false)
//     }
// }
  
  
//   const onSubmitHandler = async (e) => {
//     try {
//       e.preventDefault();
      
//       // Validate that image is selected
//       if (!image || image === false) {
//         toast.error('Please upload a thumbnail image')
//         return
//       }

//       // Validate that description is not empty
//       if (!quillRef.current || !quillRef.current.root.innerHTML.trim()) {
//         toast.error('Please add blog description')
//         return
//       }

//       setIsAdding(true)

//       const blog = {
//         title, subTitle, description: quillRef.current.root.innerHTML, category, isPublished
//       }

//       const formData = new FormData()
//       formData.append('blog', JSON.stringify(blog))
//       formData.append('image', image)

//       console.log('Submitting blog...', { title, category, imageName: image?.name })
      
//       // Add timeout of 2 minutes for image upload
//       const {data} = await axios.post('/api/blog/add', formData, {
//         timeout: 120000, // 2 minutes timeout
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })
      
//       console.log('Server response:', data)
      
//       if(data.success) {
//         toast.success(data.message)
//         setImage(false)
//         setTitle('')
//         setSubTitle('')
//         quillRef.current.root.innerHTML = ''
//         setCategory('Startup')
//         setIsPublished(false)
//       } else {
//         toast.error(data.message || 'Failed to add blog')
//       }
//     } catch (error) {
//       console.error('Error adding blog:', error)
//       console.error('Error response:', error.response)
      
//       if (error.code === 'ECONNABORTED') {
//         toast.error('Upload timeout. Please try again with a smaller image.')
//       } else if (error.response?.data?.message) {
//         toast.error(error.response.data.message)
//       } else if (error.message) {
//         toast.error(error.message)
//       } else {
//         toast.error('Failed to add blog. Please check the console for details.')
//       }
//     } finally {
//       setIsAdding(false)
//     }
//   }
  
//   useEffect(() => {
//     //Initiate quill only once
//     if(!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
//     }
//   }, []);
  
//   return (
//     <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
//       <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

//         <p>Upload thumbnail</p>
//         <label htmlFor="image">
//           <img className='mt-2 h-16 rounded cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image) } alt="" />
//           <input 
//             onChange={(e) => {
//               const file = e.target.files[0]
//               if (file) {
//                 setImage(file)
//               }
//             }} 
//             type="file" 
//             id='image' 
//             accept="image/*"
//             hidden 
//             required 
//           />
//         </label>
//         {image && <p className='text-xs text-gray-500 mt-1'>Selected: {image.name}</p>}

//         <p className='mt-4'>Blog Title</p>
//         <input onChange={ e=> setTitle(e.target.value) } value={title} className='w-full max-w-lg mt-2 p-2 border-gray-300 outline-none rounded' type="text" placeholder='Type here' required/>

//         <p className='mt-4'>Sub Title</p>
//         <input onChange={ e=> setSubTitle(e.target.value) } value={subTitle} className='w-full max-w-lg mt-2 p-2 border-gray-300 outline-none rounded' type="text" placeholder='Type here' required/>

//         <p className='mt-4'>Blog Description</p>
//         <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
//           <div ref={editorRef}></div>
//           {loading && (
//             <div className = 'absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
//                 <div className = 'w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
//           </div>)}
//           <button disabled = {loading} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer' type='button' onClick={generateContent}>Generate with AI</button>
//         </div>

//         <p className='mt-4'>Blog category</p>
//         <select onChange={(e) => setCategory(e.target.value)} value={category} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 ouline-none rounded' name="category">
//           <option value="">Select Category</option>
//           {blogCategories.map((item, index)=>{
//             return <option key={index} value={item}>{item}</option>
//           })}
//         </select>

//         <div className='flex gap-2 mt-4'>
//           <p>Publish Now</p>
//           <input onChange={e => setIsPublished(e.target.checked)} className='scale-125 cursor-pointer' type="checkbox" checked={isPublished} />
//         </div>

//         <button disabled={isAdding} className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm' type='submit'>{isAdding ? 'Adding...' : 'Add Blog'}</button>

//       </div>
//     </form>
//   )
// }

// export default AddBlog


import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'

const AddBlog = () => {
  const { axios } = useAppContext()

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Initialize Quill only once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...'
      })
    }
  }, [])

  // AI Content Generator
  const generateContent = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title first')
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post('/api/blog/generate', {
        prompt: title
      })

      if (!data?.content) {
        throw new Error('AI content generation failed')
      }

      quillRef.current.root.innerHTML = parse(data.content)
      toast.success('Content generated')

    } catch (error) {
      toast.error(error.message || 'Failed to generate content')
    } finally {
      setLoading(false)
    }
  }

  // Submit Blog
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error('Please upload a thumbnail image')
      return
    }

    if (!title.trim() || !subTitle.trim()) {
      toast.error('Title and subtitle are required')
      return
    }

    const description = quillRef.current.root.innerHTML
    if (!description || description === '<p><br></p>') {
      toast.error('Please add blog description')
      return
    }

    try {
      setIsAdding(true)
      toast.loading('Uploading blog...', { id: 'blog-upload' })

      const blog = {
        title,
        subTitle,
        description,
        category,
        isPublished
      }

      const formData = new FormData()
      formData.append('image', image)
      formData.append('blog', JSON.stringify(blog))

      // Debug check
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }

      const { data } = await axios.post('/api/blog/add', formData)

      if (!data || !data.success) {
        throw new Error(data?.message || 'Blog not added')
      }

      toast.success('Blog added successfully')

      // Reset form
      setImage(null)
      setTitle('')
      setSubTitle('')
      setCategory('Startup')
      setIsPublished(false)
      quillRef.current.root.innerHTML = ''

    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Failed to add blog')
    } finally {
      toast.dismiss('blog-upload')
      setIsAdding(false)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-auto"
    >
      <div className="bg-white max-w-3xl p-6 md:p-10 m-6 shadow rounded">

        {/* Thumbnail */}
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="upload"
            className="mt-2 h-20 rounded cursor-pointer"
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        {image && (
          <p className="text-xs mt-1 text-gray-500">Selected: {image.name}</p>
        )}

        {/* Title */}
        <p className="mt-4">Blog Title</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter blog title"
        />

        {/* Subtitle */}
        <p className="mt-4">Sub Title</p>
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter subtitle"
        />

        {/* Editor */}
        <p className="mt-4">Blog Description</p>
        <div className="relative mt-2">
          <div ref={editorRef} className="h-60" />
          {loading && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-4 py-1.5 rounded"
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          {blogCategories.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>

        {/* Publish */}
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isAdding}
          className="mt-6 w-40 h-10 bg-primary text-white rounded"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  )
}

export default AddBlog
