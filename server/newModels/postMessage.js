import  pkg  from 'mongoose';
const { model, Schema } = pkg;

const postSchema = new Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: [
        {
            userId: String,
            name: String,
            createdAt: String
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostSchema = model('PostMessage',postSchema);
export default PostSchema;