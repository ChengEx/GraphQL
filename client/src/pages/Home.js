import React,{ useState, useEffect } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
// import { gql, useQuery } from '@apollo/client';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../newComponents/Posts/Posts.js';
import Input from '../newComponents/Input/Input.js';

const Home=()=>{
    const [ currentId, setCurrentId ] = useState(0);

    // const { data, loading, error } = useQuery(FETCH_POSTS_QUERY, { ssr: false});
    // if(data) {
    //     console.log(data);
    //     const { getPosts: posts } = data;
    // } 
    // if(error) {
    //     console.log(error);
    //     return "error"; // blocks rendering
    // }
    // console.log(data);
    return (
        <Grow in>
        <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    {/* <Form currentId={currentId} setCurrentId={setCurrentId}/> */}
                    <Input currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
}

// const FETCH_POSTS_QUERY = gql`
//     query GetPosts {
//         getPosts {
//             id
//             title
//             message
//             name
//             creator
//             selectedFile
//             likes {
//             id
//             name
//             }
//             createdAt
//         }
//     }
// `
export default Home;