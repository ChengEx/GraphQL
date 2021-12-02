import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './PostCardStyle.js';
import { useDispatch } from 'react-redux';



const PostCard = ({post:{ id, title, name, message, createdAt, selectedFile }}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={selectedFile} title={title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
            </div>
            {/* {(user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color:'white'}} 
                        size="small" 
                        onClick={()=>setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )} */}

            {/* <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{tags.map((tag)=>`#${tag}`)}</Typography>
            </div> */}
            
            <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button 
                    size="small" 
                    color="primary" 
                    // disabled={!user?.result}
                    // onClick={()=>dispatch(likePost(post._id))}
                    >
                    {/* <Likes /> */}
                </Button>
                {/* {(user?.result?._id === post?.creator) && (
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={()=>dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                )} */}
            </CardActions>
        </Card>
    )
}

export default PostCard;;
