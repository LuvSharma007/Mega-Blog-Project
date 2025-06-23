import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select } from "../index"
import appwriteServies from "../../appwrite/config"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RTE from '../RTE'

const PostFrom = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = await data.image[0] ? appwriteServies.uploadFile(data.image[0]) : null
            if (file) {
                appwriteServies.removeFile(post.featuredImage)
            }
            const dbPost = await appwriteServies.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : null })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await data.image[0] ? appwriteServies.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId;
                const newPost = await appwriteServies.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (newPost) {
                    navigate(`/post/${newPost.$id}`)
                }
            }
        }
    }

    // slug Transform 

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim('')
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '') // removes unwanted characters
                .replace(/\s/g, '-')          // replaces all whitespace with "-"
        }
        return '';
    },[])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title,
                    { shouldValidate: true }
                ))
            }
        })

        return () => {
            subscription.unsubscribe();
        }

    }, [watch, slugTransform, setValue])

    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <Input
                        label='Title:'
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", {
                            required: true
                        })}
                    />
                    <Input
                        label='Slug:'
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", {
                            required: true
                        })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), {
                                shouldValidate: true
                            });
                        }}
                    />
                    <RTE label='content :' name="content"
                        control={control} defaultValues={getValues("content")}
                    />
                </div>
                <div className='w-1/3 px-2'>
                    <Input
                        label='Featured Image:'
                        type='file'
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg , image/gif"
                        {...register("image", {
                            required: !post
                        })}
                    />
                    {post && (
                        <div className='w-full mb-4'>
                            <img src={appwriteServies.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-lg' />
                        </div>
                    )}
                    <Select
                        options={['active', "Incative"]}
                        label="status"
                        className="mb-4"
                        {...register("status", {
                            required: true
                        })}
                    />
                    <Button type='submit' bgColor={post ? "bg-green-500" : undefined} className='w-full'>
                        {post ? "update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PostFrom