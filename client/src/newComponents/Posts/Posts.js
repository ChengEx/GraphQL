import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import PostCard from './PostCard.js';
import useStyles from './PostsStyles.js';
import { gql, useQuery } from '@apollo/client';

    
const Posts = () => {
    const classes = useStyles();
    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY, { ssr: false});
    if(data) {
        console.log(data);
    } 
    if(error) {
        console.log(error);
        return "error"; // blocks rendering
    }
    // const posts = useSelector((state)=> state.posts);

    //console.log(posts);
    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>      
            
                {
                    loading?(
                        <h1>loading posts..</h1>
                    ):(
                        data.getPosts.map((post)=>(
                            <Grid key={post.id} item xs={12} sm={6}>
                                <PostCard post={post}/>
                            </Grid>
                        ))
                    )
                }
            
        </Grid>
        
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

export default Posts;