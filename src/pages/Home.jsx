import React from 'react'
import { useEffect , useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container , PostCard } from '../components'


const Home = () => {

    const [posts , setPosts] = useState([])
    const [error , SetError] = useState('')
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        const fetchPosts = async () =>{
        SetError('')
        setLoading(true)
        try {
            const posts = await appwriteService.getAllPost();
            if(posts){
                setPosts(posts.documents);
            }
            setLoading(false);
        } catch (error) {
            console.log('Error fetching errors',error);
            SetError(error);
            setLoading(false);
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
                            Login to read posts
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