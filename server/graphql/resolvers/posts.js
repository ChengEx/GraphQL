
import { AuthenticationError, UserInputError } from 'apollo-server';
import mongoose from 'mongoose';
import PostMessage from '../../newModels/postMessage.js';
import authCheck from '../../middleware/auth.js';

const postQuery = {
    Query: {
        async getPosts(){
            try {
                console.log("BYE");
                const posts = await PostMessage.find();
                //console.log("getPostDataInBackEnd", posts);
                return posts;
            } catch(err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { createMessage :{ title, message, selectedFile }}, context) {
            console.log("context", context);
            console.log("inside",message);
            const user = await authCheck(context);
            //if(!user) return res.status(404).send('unvalid header token');
            console.log("authCheck", user);
            const newPost = new PostMessage({
                title: title,
                message: message,
                name: user.name,
                creator: user.id,
                selectedFile: selectedFile,  
                createdAt: new Date().toISOString()
            })
            console.log("newPost", newPost);
            const post = await newPost.save();
            // context.pubsub.publish('NEW_POST', {
            //     newPost: post
            //   });
            return post;
        },
        async updatePost(_, { updateMessage : { id, title, message, selectedFile }}, context) {
            const user = await authCheck(context);
            console.log("authCheck2", id);
            //if(!user) return res.status(404).send('unvalid header token');
            if(!user) throw new UserInputError('Errors', {errors});
            const post = await PostMessage.findByIdAndUpdate( {_id:id} ,{title:title,message: message,selectedFile:selectedFile},{new: true});
            console.log("post ",post);
            if(!post) throw new UserInputError('Errors', {errors});
            return post;        
        },
        async deletePost(_, { id }, context) {
            const user = await authCheck(context);
            if(!user) throw new UserInputError('Errors', {errors});
            if(!mongoose.Types.ObjectId.isValid(id)) throw new UserInputError('Errors', {errors});
            const deletePost = await PostMessage.findByIdAndDelete(id);
            return deletePost;
        },
        async likePost(_, { id }, context) {
            const user = await authCheck(context);
            console.log("likePost",user);
            if(!user) throw new UserInputError('Errors', {errors});
            if(!mongoose.Types.ObjectId.isValid(id)) throw new UserInputError('Errors', {errors});
            const post = await PostMessage.findById(id);
            console.log("likePost2",post);
            if(post){
                if(post.likes.find(like => like.userId === user.id)){
                    //Post already likes, unlike it
                    post.likes = post.likes.filter(like => like.userId != user.id);
                }else{
                    //Not liked, like post                   
                    post.likes.push({
                        userId: user.id,
                        name: user.name,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save();
                return post;
            }else{
                throw new UserInputError('Post not found');
            }
            //return post;
        },
        // Subscription: {
        //     newPost: {
        //       subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        //     }
        // }
    }

};

export default postQuery;