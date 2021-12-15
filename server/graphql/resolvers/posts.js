
import { AuthenticationError, UserInputError } from 'apollo-server';
import mongoose from 'mongoose';
import PostMessage from '../../newModels/postMessage.js';
import authCheck from '../../middleware/auth.js';

const postQuery = {
    Query: {
        async getPosts(){
            try {
                const posts = await PostMessage.find();
                //console.log("getPostDataInBackEnd", posts);
                return posts;
            } catch(err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { createMessage :{ title, message, tags, selectedFile }}, context) {
            console.log("inside",tags);
            const user = await authCheck(context);
            if(!user) throw new UserInputError('Errors', {errors});
            const tagsArray = tags.split(',')
            const newPost = new PostMessage({
                title: title,
                message: message,
                name: user.name,
                creator: user.id,
                tags: tagsArray,
                selectedFile: selectedFile,  
                createdAt: new Date().toISOString()
            })
            //console.log("newPost", newPost);
            const post = await newPost.save();

            return post;
        },
        async updatePost(_, { updateMessage : { id, title, message, tags, selectedFile }}, context) {
            const user = await authCheck(context);
            console.log("authCheck2", id);
            console.log("tags", title);
            console.log("tags", message);
            console.log("tags", tags);
            const tagsArray = tags.split(',');
            console.log("tagsArray", tagsArray);
            if(!user) throw new UserInputError('Errors', {errors});
            const post = await PostMessage.findByIdAndUpdate( { _id:id } ,{ title:title, message: message, tags: tagsArray, selectedFile:selectedFile },{new: true});
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
        }

    }

};

export default postQuery;