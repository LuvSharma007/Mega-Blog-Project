import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import appwriteService from "../appwrite/config"
import { Container ,Button } from '../components/index';
import parser from "html-react-parser"
import {deletePost as deletePostAction} from "../store/postSlice"

const Posts = () => {

    const [post , setPost] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false
    const dispatch = useDispatch();
    const error = useSelector(state => state.posts.error);
    const loading = useSelector(state => state.posts.loading);

    useEffect(()=>{
        const fetchPost = async()=>{
            if(id){
            const post = await appwriteService.getPost(id);
            if(post){
                setPost(post);
            }else{
                navigate("/");
            }
        }else{
            navigate("/");
        }
        }
        fetchPost();
    },[id ,navigate]);

    const deletePostHandler = async () =>{
        try {
            const deletedpost = await appwriteService.deletePost(post.$id)
            if(deletedpost){
                const deletedImage = await appwriteService.removeFile(post.featuredImage)
                if(deletedImage){
                    dispatch(deletePostAction(deletedpost));
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("Error getting post",error);

        }
    }
    

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getImage(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePostHandler}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parser(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Posts