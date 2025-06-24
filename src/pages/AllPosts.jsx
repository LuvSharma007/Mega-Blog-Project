import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container , PostCard } from '../components'

const AllPosts = () => {

    const [posts , setPosts] = useState([])
    const [error , setError] = useState('')
    
    useEffect(()=>{
        setError('')
        const AllPosts = async () =>{
            try {
            const posts =  await appwriteService.getAllPost([])            
            
            if(posts){
                setPosts(posts.documents)
                console.log('AllPost component is mount');                
            }
        } catch (error) {
            console.log("Error fetching posts ",error);
            setError(error);            
        }
        }
        AllPosts();
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