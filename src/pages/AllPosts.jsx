import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container , PostCard } from '../components'

const AllPosts = () => {

    const [posts , setPosts] = useState([])
    const [error , setError] = useState('')
    
    useEffect(async()=>{
        setError('')
        try {
            const posts = await appwriteService.getAllPost([])
            if(posts){
                setPosts(posts)
            }
        } catch (error) {
            console.log("Error fetching posts ",error);
            setError(error);            
        }
    },[])
    


  return (
    <div className='w-full py-8'>
    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <Container>
            <div className='flex- flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts