import React,{ useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PostCard from '../newComponents/Posts/PostCard.js';
import { Container, Grow, Grid } from '@material-ui/core';
import Input from '../newComponents/Input/Input.js';
import { FETCH_POSTS_QUERY } from '../util/graphql.js';
import { AuthContext } from '../context/auth.js';
import useStyles from '../newComponents/Posts/PostsStyles.js';

const  Home=()=>{
    const [ currentId, setCurrentId ] = useState(0);
    const classes = useStyles();
    const { user } = useContext(AuthContext);

    const {loading, error, data: { getPosts: posts } = {}, refetch } = useQuery(FETCH_POSTS_QUERY);
    if(error) {
        console.log('error',error);
        return "error"; // blocks rendering
    }
    
    console.log('Home data', posts);

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
                    </Grid>
                )}
                <Grid item xs={12} sm={4}>
                    <Input currentId={currentId} setCurrentId={setCurrentId} posts={posts} refetch={refetch}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
}
export default Home;