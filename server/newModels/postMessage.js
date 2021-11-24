import  pkg  from 'mongoose';
const { model, Schema } = pkg;

const postSchema = new Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostSchema = model('PostMessage',postSchema);
export default PostSchema;