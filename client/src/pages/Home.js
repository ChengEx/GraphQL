import React,{ useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Container, Grow, Grid } from '@material-ui/core';

const Home=()=>{
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    console.log(loading);
    return (
        // <Grid columns={3}>
        //     <Grid.Row className="page-title">
        //         <h1>Recent Posts</h1>
        //     </Grid.Row>
        //     <Grid.Row>
        //         {loading?(
        //             <h1>loading posts..</h1>
        //         ):(
        //             data.getPosts && data.getPosts.map(post =>(
        //                 <Grid.Column key={post.id} style={{marginBottom: 20}}>
        //                     {/* 將資料傳入 */}
        //                     <PostCard post={post}/>
        //                 </Grid.Column>  
        //             ))
        //         )}           
        //     </Grid.Row>
        // </Grid>

        <Grow in>
        <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <h1>this is home's postcard</h1>
                    {/* <Posts setCurrentId={setCurrentId}/> */}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h1>this is home's input field</h1>
                    {/* <Form currentId={currentId} setCurrentId={setCurrentId}/> */}
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
}`
export default Home;