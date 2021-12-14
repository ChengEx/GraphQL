import { CREATE, FETCH_ALL, LIKE, UPDATE, DELETE } from '../constants/actionTypes';
import Posts from '../newComponents/Posts/Posts';

const postReducer =(posts=[], action) => {
    switch(action.type){
        case DELETE:
            return posts.filter((post)=>post._id !== action.payload);
        case UPDATE:
            return posts.map((post)=>post._id === action.payload._id ? action.payload: post);
        case LIKE:
            return posts.map((post)=>post._id === action.payload._id ? action.payload: post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts; 
    }
    return posts;
}
export default postReducer;