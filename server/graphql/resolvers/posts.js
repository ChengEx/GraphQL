
import { AuthenticationError, UserInputError } from 'apollo-server';
import PostMessage from '../../newModels/postMessage.js';
import authCheck from '../../middleware/auth.js';

const postQuery = {
    Query: {
        async getPosts(){
            try {
                const posts = await PostMessage.find();
                return posts;
            } catch(err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { createMessage :{ title, message, tags, selectedFile }}, context) {
            //console.log("context", context);
            const user = await authCheck(context);
            const newPost = new PostMessage({
                title: title,
                message: message,
                name: user.name,
                creator: user.id,
                selectedFile: selectedFile,  
                tags: tags,
                createdAt: new Date().toISOString()
            })
            
            const post = await newPost.save();
            return post;
        }
    }

};

export default postQuery;