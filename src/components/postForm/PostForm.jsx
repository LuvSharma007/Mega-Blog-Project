import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select } from "../index"
import appwriteService from "../../appwrite/config"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RTE from '../RTE'
import { addPost, updatePost } from '../../store/postSlice'

const PostForm = ({post}) => {

    const {register ,handleSubmit , watch, setValue , control , getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug:post?.slug || "",
            content:post?.content || "",
            status:post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const submit = async(data)=>{
        try {
            if(post){
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                if(file){
                    await appwriteService.removeFile(post?.featuredImage)
                }
                const dbPost = await appwriteService.updatePost(post.$id,{...data,featuredImage: file ? file.$id : undefined })

                if(dbPost){
                    dispatch(updatePost(dbPost));
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
                        dispatch(addPost(newPost));
                        navigate(`/post/${newPost.$id}`)
                    }                    
                } 
            }
        } catch (error) {
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
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
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
        {post && post.featuredImage && (
            <div className='w-full mb-4'>
                <img src={appwriteService.getImage(post.featuredImage)} alt={post.title} className='rounded-lg' />
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