import React,  { useCallback }  from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import useStyles from './PostCardStyle.js';
import { useDispatch } from 'react-redux';



const PostCard = ({post:{ id, title, message, name, creator, createdAt, selectedFile, tags, likes }, setCurrentId}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    var newCreatedAt = new Date(parseInt(createdAt));
    console.log("userPost", user);
    console.log("creatorPost", creator);

    const setCurrent = (id) => {
        setCurrentId(id)
    }

    const [ deletePost, { deleteLoading, deleteError, deleteData } ] = useMutation(DELETE_POST,{
        update(_, result){
            console.log("deletePost ",result);
            //dispatch(createPosts(result));
        },
        onError(err) {
            alert(err);
        },
        variables: {
            id: id
        }
    });

    const [ likePost, { likeLoading, likeError, likeData } ] = useMutation(LIKE_POST,{
        update(_, result){
            console.log("likePost ",result);
            //dispatch(createPosts(result));
        },
        onError(err) {
            alert(err);
        },
        variables: {
            id: id
        }
    });
        

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === (user?.login?.id))
              ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
              ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
              );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
    

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={selectedFile} title={title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2">{moment(newCreatedAt).fromNow()}</Typography>
            </div>
            {(user?.login?.id === creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color:'white'}} 
                        size="small" 
                        onClick={() => setCurrent(id) }
                        >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}  

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary"></Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button 
                    size="small" 
                    color="primary" 
                    disabled={!user?.login}
                    onClick={()=>likePost()}
                    >
                    <Likes />
                </Button>
                {(user?.login?.id === creator) && (              
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={()=>deletePost()}
                        >
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>        
                 )}  

            </CardActions>
        </Card>
    )
}


const DELETE_POST = gql`
    mutation deletePost($id: ID){
        deletePost(id: $id){
            id
            title        
            message
            creator
            name
            createdAt
        }
    }
`
const LIKE_POST = gql`
    mutation likePost($id: ID){
        likePost(id: $id){
            id
            title        
            message
            creator
            name
            createdAt
        }
    }
`

export default PostCard;;
