import React from 'react'
import PostForm from '../components/postForm/PostForm'
import { Container } from '../components'

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