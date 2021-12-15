import React,{ useState, useEffect, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
//import { gql, useQuery } from '@apollo/client';
import PostCard from '../newComponents/Posts/PostCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts.js'
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../newComponents/Posts/Posts.js';
import Input from '../newComponents/Input/Input.js';
import { FETCH_POSTS_QUERY } from '../util/graphql.js';
import { AuthContext } from '../context/auth.js';
import useStyles from '../newComponents/Posts/PostsStyles.js';

const  Home=()=>{
    const [ currentId, setCurrentId ] = useState(0);
    // const [ updateData, setUpdateData ] = useState({});
    // const dispatch = useDispatch();
    // console.log("updateData1", updateData);
    // console.log("currentId1", currentId);
    // dispatch(getPosts());
    const classes = useStyles();

    const { user } = useContext(AuthContext);
    const {loading, error, data: { getPosts: posts } = {}, refetch } = useQuery(FETCH_POSTS_QUERY);
    if(error) {
        console.log('error',error);
        return "error"; // blocks rendering
    }

    // const client = useApolloClient();
    // const { data2 } = client.readQuery({query:FETCH_POSTS_QUERY});
    // console.log("data2",data2);
    
    // if(data) {
    //     console.log('Home data', data);
    //     const { getPosts: posts } = data;
    //   }
    //   if(error) {
    //     console.log(error);
    //     return "error"; // blocks rendering
    // }
    
    console.log('Home data', posts);
    //const { getPosts: posts } = data;
    // const { data2 } = client.readQuery({
    //     query: READFETCH_POSTS_QUERY_TODO,
        
    // });
    //const { getPosts: posts } = {...data}
    //console.log('Home data2', posts);
    
    
   

    return (
        <Grow in>
        <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                {loading ?(
                    <h1>Loading posts..</h1>
                ) : (
                    <Grid item xs={12} sm={7}>
                        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                            {posts?.map((post)=>(
                                <Grid key={post.id} item xs={12} sm={6}>
                                    <PostCard post={post} setCurrentId={setCurrentId} refetch={refetch}/>
                                </Grid>
                            ))}
                        </Grid>
                        {/* <Posts setCurrentId={setCurrentId} data={data}/> */}
                    </Grid>
                )}
                <Grid item xs={12} sm={4}>
                    {/* <Form currentId={currentId} setCurrentId={setCurrentId}/> */}
                    <Input currentId={currentId} setCurrentId={setCurrentId} posts={posts} refetch={refetch}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
}
// const FETCH_POSTS_QUERY = gql`
//         query GetPosts {
//             getPosts {
//                 id
//                 title
//                 message
//                 name
//                 creator
//                 selectedFile
//                 likes {
//                 id
//                 name
//                 }
//                 createdAt
//             }
//         }
//     `
export default Home;