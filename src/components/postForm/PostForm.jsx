import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select } from "../index"
import appwriteService from "../../appwrite/config"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RTE from '../RTE'

const PostForm = ({post}) => {

    const [error , setError] = useState('');

    const {register ,handleSubmit , watch, setValue , control , getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug:post?.$id || "",
            content:post?.content || "",
            status:post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async(data)=>{
        setError('')
        try {
            if(post){
                const file = await data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                if(file){
                    appwriteService.removeFile(post.featuredImage)
                }
                const dbPost = await appwriteService.updatePost(post.$id,{...data,featuredImage: file ? file.$id : undefined })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }else{
                const file  = await appwriteService.uploadFile(data.image[0]) ;
                
                if(file){
                    const fileId = file.$id
                    data.featuredImage = fileId;
                    const newPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    })
                    if(newPost){
                        navigate(`/post/${newPost.$id}`)
                    }                    
                } 
            }
        } catch (error) {
            setError(error);

            console.log('Something went Wrong !',error);            
        }
    }

    // slug Transform 

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g, '') // removes unwanted characters
            .replace(/\s+/g, '-')          // replaces all whitespace with "-"
        }
        return ''
    })


    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug',slugTransform(value.title),
                    {shouldValidate:true}
                )
            }
        })

        return () =>{
            subscription.unsubscribe()
        }

    },[watch , slugTransform , setValue])

  return (
    <>
    {/* {error && <p className='text-red-600 mt-8 text-center'>{error}</p>} */}
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div>
            <Input 
            label='Title:'
            placeholder="Title"
            className="mb-4"
            {...register("title",{
                required:true
            })}
            />
            <Input 
            label='Slug:'
            placeholder="Slug"
            className="mb-4"
            {...register("slug",{
                required:true
            })}
            onInput={(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value),{
                    shouldValidate:true
                });
            }}
            />
            <RTE label='content :' name="content"
            control={control} defaultValue={getValues("content")}
            />
        </div>
        <div className='w-1/3 px-2'>
        <Input 
        label='Featured Image:'
        type='file'
        className="mb-4"
        accept="image/png, image/jpg, image/jpeg , image/gif"
        {...register("image",{
            required:!post
        })}
        />
        {post && (
            <div className='w-full mb-4'>
                <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-lg' />
            </div>
        )}
        <Select 
        options={['active',"Inactive"]}
        label="Status"
        className="mb-4"
        {...register("status",{
            required:true
        })}
        />
        <Button type='submit' bgColor={post ? "bg-green-500": undefined} className='w-full'>
            {post ? "update":"Submit"}
        </Button>
        </div>
    </form>
    </>
  )
}

export default PostForm