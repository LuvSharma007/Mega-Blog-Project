import React from 'react'
import PostFrom from '../components/postForm/PostForm'
import { Container, PostForm } from '../components'

const AddPost = () => {
  return (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost