import React,{ useState, useEffect } from 'react';
import { gql } from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
//import { gql, useQuery } from '@apollo/client';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts.js'
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../newComponents/Posts/Posts.js';
import Input from '../newComponents/Input/Input.js';

const Home=()=>{
    const [ currentId, setCurrentId ] = useState(0);
    const [ updateData, setUpdateData ] = useState({});
    const dispatch = useDispatch();
    console.log("updateData1", updateData);
    console.log("currentId1", currentId);
    dispatch(getPosts());
    
    
   

    return (
        <Grow in>
        <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} updateData={updateData}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    {/* <Form currentId={currentId} setCurrentId={setCurrentId}/> */}
                    <Input currentId={currentId} setCurrentId={setCurrentId} setUpdateData={setUpdateData}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
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
export default Home;