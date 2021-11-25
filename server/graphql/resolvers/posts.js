
import { AuthenticationError, UserInputError } from 'apollo-server';
//import PostSchema from '../../newModels/postMessage.js';
import PostMessage from '../../newModels/postMessage.js';

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
        async createPost(_, { title, message }, context) {
            const newPost = new PostMessage({
                title: title,
                message: message,
                name: "test01",
                creator: "token dmsapdmasfpmkasfm",
                selectedFile: "test",  
            })
            
            const post = await newPost.save();
            return post;
        }
    }

};

export default postQuery;