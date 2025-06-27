import React from 'react'
import { useEffect,useState } from 'react'
import { Container , PostForm} from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const EditPost = () => {
    const [post , setPosts] = useState(null);
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const editPost = async () =>{
            try {
                const post = await appwriteService.getPost(id);
                if(post){
                    setPosts(post);
                }
            } catch (error) {
                console.log("Error while edit post",error);
                navigate('/')
            }
        }
        editPost();
    },[id,navigate])
  return post ?  (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost