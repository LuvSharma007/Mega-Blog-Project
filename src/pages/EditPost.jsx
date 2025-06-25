import React from 'react'
import { useEffect,useState } from 'react'
import { Container , PostForm} from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [post , setPosts] = useState([])
    const Id = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const editPost = async () =>{
            try {
                const post = await appwriteService.getPost(Id);
                if(post){
                    setPosts(post)
                }
            } catch (error) {
                console.log("Error while edit post",error);
                navigate('/')
            }
        }
        editPost();
    },[Id,navigate])
  return post ?  (
    <div className='py-8'>
        <Container>
            <PostForm posts={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost