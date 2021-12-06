
import { AuthenticationError, UserInputError } from 'apollo-server';
import PostMessage from '../../newModels/postMessage.js';
import authCheck from '../../middleware/auth.js';

const postQuery = {
    Query: {
        async getPosts(){
            try {
                console.log("BYE");
                const posts = await PostMessage.find();
                return posts;
            } catch(err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { createMessage :{ title, message, selectedFile }}, context) {
            //console.log("context", context);
            console.log("inside",message);
            const user = await authCheck(context);
            console.log("authCheck", user);
            const newPost = new PostMessage({
                title: title,
                message: message,
                name: user.name,
                creator: user.id,
                selectedFile: selectedFile,  
                createdAt: new Date().toISOString()
            })
            
            const post = await newPost.save();
            return post;
        }
    }

};

export default postQuery;