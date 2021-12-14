import React, { useState, useEffect, useReducer } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPosts, updatePost } from '../../actions/posts.js';
import { getPosts } from '../../actions/posts.js'
import { useNavigate } from 'react-router-dom';

const Input = ({ currentId, setCurrentId, setUpdateData }) => {

    const [ postData, setPostData] = useState({
        title:'', message:'', tags:'', selectedFile:''
    });
    const post = useSelector((state)=> currentId? state.posts.getPosts.find((p)=>p.id===currentId): null);

    console.log("getPostQQ",post);
    console.log("currentId",currentId);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();



    useEffect(()=>{
        if(post) setPostData(post);
    },[post])
    

    const clear =() => {
        setCurrentId(0);
        setPostData({
            title:'', message:'', tags:'', selectedFile:''
        });
    }

    //title, message, tags, selectedFile
    const [ createPost, { loading, error, data } ] = useMutation(CREATE_POST,{
        update(_, result){
            console.log("createPost ",result);
            
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

    const [ updatePost, { updateloading, updateError, updateData } ] = useMutation(UPDATE_POST,{
        update(_, result){
            console.log("updatePost ",result);
         
            //dispatch(updatePost(result));
        },
        onError(err) {
            alert(err);
        },
        variables: {
            id: currentId,
            title: postData.title,
            message: postData.message,
            //tags: postData.tags,
            selectedFile: postData.selectedFile
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("postData",postData);
        if(currentId === 0) {
            createPost();

            //try to re-render
            dispatch(getPosts());
            setUpdateData(postData);
            clear();
        }
        else {
            updatePost();
            clear();
        }
        
        
    }
    const userByLogin = user?.login?.name;
    const userByRegister = user?.register?.name;
    if(!userByLogin && !userByRegister){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your post!
                </Typography>
            </Paper>
        )
    }
    

    return (
        
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing':'Creating'} a post</Typography>
                
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    multiline
                    rows={10}
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        mutiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth>
                        Submit
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear}
                    fullWidth>
                        Clear
                </Button>
            </form>
        </Paper>
    )
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

const UPDATE_POST = gql`
    mutation updatePost($id: ID, $title: String, $message: String, $selectedFile: String) {
        updatePost(updateMessage:{id: $id, title: $title, message: $message, selectedFile: $selectedFile}) {
            id
            title        
            message
            creator
            name
            createdAt
        }
    }
`

export default Input
