import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import appwriteService from "../appwrite/config"
import { Container ,Button } from '../components/index';
import parser from "html-react-parser"


const Posts = () => {

    const [post , setPosts] = useState(null);
    const {Id} = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(()=>{
        const fetchPost = async()=>{
            if(Id){
            const post = await appwriteService.getPost(Id)
            if(post){
                setPosts(post);
            }else{
                navigate("/");
            }
        }else{
            navigate("/");
        }
        }
        fetchPost();
    },[Id ,navigate]);

    const deletePost = () =>{
        appwriteService.deletePost(post.$id).then((status=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage.Id);
                navigate('/');
            }
        }))
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
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
                            <Button bgColor="bg-red-500" onClick={deletePost}>
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