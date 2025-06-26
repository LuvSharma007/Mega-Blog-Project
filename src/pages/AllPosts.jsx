import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container , PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setLoading, setPosts } from '../store/postSlice'

const AllPosts = () => {

    
    const posts = useSelector(state=>state.posts.posts)
    const error = useSelector(state => state.posts.error);
    const loading = useSelector(state=>state.posts.loading);
    const dispatch = useDispatch();

    useEffect(()=>{
        const allPosts = async () =>{
            dispatch(setError(null))
            dispatch(setLoading(true));
            try {
            const allPosts = await appwriteService.getAllPost();  
            if(allPosts){
                dispatch(setPosts(allPosts.documents));              
            }
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error.msg || "Something went wrong while rendering all posts"))
            dispatch(setLoading(false));
            console.log("Error fetching posts ",error);
        }
        }
        allPosts();
    },[dispatch])
    
    if(loading) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <p className='text-xl animate-pulse'>Loading posts...</p>
            </div>
        );
    }

  return (
    <div className='w-full py-8'>
    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts