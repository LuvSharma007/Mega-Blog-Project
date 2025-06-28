import React from 'react'
import { useEffect , useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container , PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setLoading, setPosts } from '../store/postSlice'

const Home = () => {

    const posts = useSelector(state => state.posts.posts)
    
    const error = useSelector(state => state.posts.error)
    
    const loading = useSelector(state => state.posts.loading)
    const loginStatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchPosts = async () =>{
        dispatch(setError(null));
        dispatch(setLoading(true));
        try {
            const posts = await appwriteService.getAllPost();
            if(posts){
                dispatch(setPosts(posts.documents))
            }
        } catch (error) {
            console.log('Error fetching errors',error);
            dispatch(setError(error.message || "something went wrong while fetching posts"))
        }finally{
            dispatch(setLoading(false))
        }
        }
        fetchPosts();
    },[])

  if(loading){
    return (
            <div className='w-full py-8 mt-4 text-center'>
                <p className='text-xl animate-pulse'>Loading posts...</p>
            </div>
        );
  }

  if (posts.length === 0) {
    return(
        <div className='w-full py-8 mt-4 test-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            {loginStatus ? "Add posts..." : "Login to add & read posts"}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return (
     <div className='w-full py-8'>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
  )
}

export default Home;