import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import PostCard from './PostCard.js';
import useStyles from './PostsStyles.js';

    
const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state)=> state.posts);
    const classes = useStyles();

    console.log("PostsData",posts.getPosts);

    return (
        !posts.getPosts ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.getPosts.map((post)=>(
                    <Grid key={post.id} item xs={12} sm={6}>
                        <PostCard post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
    // return (
    //     <Grid className={classes.container} container alignItems="stretch" spacing={3}>      
            
    //             {
    //                 loading?(
    //                     <h1>loading posts..</h1>
    //                 ):(
    //                     data.getPosts.map((post)=>(
    //                         <Grid key={post.id} item xs={12} sm={6}>
    //                             <PostCard post={post} setCurrentId={setCurrentId}/>
    //                         </Grid>
    //                     ))
    //                 )
    //             }
            
    //     </Grid>
        
    // )
}


export default Posts;