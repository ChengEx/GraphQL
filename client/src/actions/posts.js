import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import { gql, useQuery } from '@apollo/client';



export const getPosts = () => async(dispatch) => {
    try{
        const { data, loading, error } = useQuery(FETCH_POSTS_QUERY, { ssr: false});
        if(data) {
            console.log("getPosts",data);
        } 
        if(error) {
            console.log(error);
            return "error"; // blocks rendering
        }
        console.log("Test", data);
        dispatch({ type:FETCH_ALL, payload: data });
    }catch(err){
        console.log(err.message)
    }
}
const FETCH_POSTS_QUERY = gql`
    query GetPosts {
        getPosts {
            id
            title
            message
            name
            creator
            selectedFile
            likes {
            id
            name
            }
            createdAt
        }
    }
`

export const createPost = (post) => async(dispatch) => {
    try{    
        const { data } = await api.createPost(post);
        dispatch({ type:CREATE, payload: data });
    }catch(err){
        console.log(err);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try{    
        const { data } = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data});
    }catch(err){
        console.log(err);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    }catch(err) {
        console.log(err);
    }
}

export const likePost = (id) => async(dispatch) => {
    try{    
        const { data } = await api.likePost(id);
        dispatch({type: UPDATE, payload: data});
    }catch(err){
        console.log(err);
    }
}