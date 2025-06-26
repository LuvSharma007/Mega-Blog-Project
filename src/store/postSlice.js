import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:
    {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        addPost:(state , action)=>{
            state.posts.unshift(action.payload);
        },
        deletePost:(state , action)=>{
            state.posts = state.posts.filter((post)=> post.$id !== action.payload)
        },
        updatePost:(state , action)=>{
            state.posts = state.posts.map((post)=> post.$id === action.payload ? action.payload : post)
        },
        clearPost:(state)=>{
            state.posts = [];
        },
        setLoading:(state , action)=>{
            state.loading = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        },
        clearError:(state)=>{
            state.error = null;
        }
    }
})

export const {setPosts , addPost , deletePost , updatePost , clearposts , setLoading , setError , clearError} = postSlice.actions;

export default postSlice.reducer;