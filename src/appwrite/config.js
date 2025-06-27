import confg from "../conf/conf";

import { Client , ID , Databases , Query , Storage } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(confg.appwriteUrl)
        .setProject(confg.appwriteProjectId)
        this.bucket = new Storage(this.client)
        this.databases = new Databases(this.client)
    }

    async createPost({title , slug , content , featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                confg.appwriteDatabaseId,
                confg.appwriteCollectionId,
                ID.unique(),  // documentId
                {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            }
        );
        } catch (error) {
            console.log(`Error creating post : ${error}`);
        }
    }
    
    async updatePost(documentId,{title , slug , content , featuredImage, status,userId}){
        try {
            return await this.databases.updateDocument(
                confg.appwriteDatabaseId,
                confg.appwriteCollectionId,
                documentId,
                {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            }
            )
        } catch (error) {
            console.log(`Error updating post : ${error}`);
        }
    }

    async deletePost(documentId){
        try {
            await this.databases.deleteDocument(
                confg.appwriteDatabaseId,
                confg.appwriteCollectionId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log(`Error deleting post : ${error}`);
            return false;
        }
    }

    async getPost(documentId){
        try {
            return await this.databases.getDocument(
                confg.appwriteDatabaseId,
                confg.appwriteCollectionId,
                documentId,
            )
        } catch (error) {
            console.log(`Error getting post : ${error}`);
            return false;
        }
    }

    async getAllPost(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                confg.appwriteDatabaseId,
                confg.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(`Error getting post : ${error}`);
            return false;
        }
    }


    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confg.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(`Error uploading file : ${error}`);
        }
    }

    async removeFile(fileId){
        try {
            await this.bucket.deleteFile(
                confg.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log(`Error deleting file : ${error}`);
            return false;
        }
    }

    getImage(fileId){
        const url = this.bucket.getFileView(
            confg.appwriteBucketId,
            fileId,
        )
        return url;
        
    }
}

const service = new Service()
export default service;