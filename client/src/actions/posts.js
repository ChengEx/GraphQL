import * as api from '../api';
// import { gql } from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import { gql, useQuery ,useMutation } from '@apollo/client';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
//import { gql, useQuery } from '@apollo/client';




export const getPosts = () => async(dispatch) => {
    try{
        const { data, loading, error } = useQuery(FETCH_POSTS_QUERY, { ssr: false});
        if(loading){
            
        }
        if(data) {
            console.log("getPosts",data);
            dispatch({ type:FETCH_ALL, payload: data });
        } 
        if(error) {
            console.log(error);
            return "error"; // blocks rendering
        }
        console.log("Test", data);
        
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
                userId
                name
                createdAt
            }
            createdAt
        }
    }
`

export const createPosts = (postData) => async(dispatch) => {
    try{    
        //const { data } = await api.createPost(post);
        const { loading, error, data }  = useMutation(CREATE_POST,{
            update(_, result){
                console.log("createPost ",result);
                dispatch({ type:CREATE, payload: result });
                //dispatch(createPosts(result));
            },
            onError(err) {
                alert(err);
            },
            variables: {
                title: postData.title,
                message: postData.message,
                //tags: postData.tags,
                selectedFile: postData.selectedFile
            }
        });
        
    }catch(err){
        console.log(err);
    }
}
const CREATE_POST = gql`
    mutation createPost($title: String, $message: String, $selectedFile: String){
        createPost(createMessage:{title: $title, message: $message, selectedFile: $selectedFile}){
            id
            title        
            message
            creator
            name
            createdAt
        }
    }
`

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