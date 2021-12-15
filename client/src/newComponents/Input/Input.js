import React, { useEffect, useContext } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import useStyles from './styles';
import { useForm } from '../../util/hooks.js';
import { FETCH_POSTS_QUERY } from '../../util/graphql.js';
import { AuthContext } from '../../context/auth.js';

const Input = ({ currentId, setCurrentId, posts, refetch }) => {
    const { values, OnlyForUpdateForm, onChange, selectedFile, onSubmit, clear } = useForm(createOrUpdataPostCallback, {
        title:'', message:'', selectedFile:''
    });

    const { user } = useContext(AuthContext);
    console.log("InputUser", user);
    console.log("post", posts);
    console.log("currentId", currentId);
    const currentIdBind = posts?.find((p)=>p.id === currentId);
    console.log("currentIdBind", currentIdBind);

    useEffect(()=>{
        if(currentIdBind) OnlyForUpdateForm(currentIdBind);
    },[currentIdBind])

    const classes = useStyles();
    const clearInput =() => {
        setCurrentId(0);
        clear();
    }

    //title, message, tags, selectedFile
    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: {
            title: values.title,
            message: values.message,
            tags: values.tags,
            selectedFile: values.selectedFile
        },
        update(proxy, result) {
            console.log("result",result);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            //data.getPosts.push(data.result);
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                },
                variables: {
                    title: values.title,
                    message: values.message,
                    selectedFile: values.selectedFile
                }
            });
            //re-render Home page
            refetch();
            values.title = '';
            values.message = '';
            values.tags = '';
            values.selectedFile = '';
        }
      });

    const [ updatePost, { updateloading, updateError, updateData } ] = useMutation(UPDATE_POST,{
        variables: {
            id: currentId,
            title: values.title,
            message: values.message,
            tags: values.tags,
            selectedFile: values.selectedFile
        },
        update(_, result){
            console.log("updatePost ",result);
            refetch();
        },
        onError(err) {
            alert(err);
        }
        
    });


    function createOrUpdataPostCallback() {
        if(currentId === 0) {
            createPost();
        }else{
            updatePost();
        }
        
    }

    if(!user?.name){
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
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={onSubmit}>
                <Typography variant="h6">{currentId? 'Editing':'Creating'} a post</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={values.title}
                    onChange={onChange}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    multiline
                    rows={10}
                    fullWidth
                    value={values.message}
                    onChange={onChange}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={values.tags}
                    onChange={onChange}
                />
                {/* <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        mutiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div> */}

                <div className={classes.fileInput}>
                    <input type="file" name="selectedFile" onChange={selectedFile} />
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
                    onClick={clearInput}
                    fullWidth>
                        Clear
                </Button>
            </form>
            
        </Paper>
    )
}

const CREATE_POST = gql`
    mutation createPost($title: String, $message: String, $tags: String, $selectedFile: String){
        createPost(createMessage:{title: $title, message: $message, tags: $tags, selectedFile: $selectedFile}){
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
    mutation updatePost($id: ID, $title: String, $message: String, $tags: String,  $selectedFile: String) {
        updatePost(updateMessage:{id: $id, title: $title, message: $message, tags: $tags, selectedFile: $selectedFile}) {
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
