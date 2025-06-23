import React from 'react'
import { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [post, setPost] = useState([])
    const { Id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (Id) {
            appwriteService.getPost(Id).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/")
                }
            })
        }
        else navigate("/")
    }, [Id, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost