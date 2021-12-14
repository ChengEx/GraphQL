import { AUTH } from '../constants/actionTypes';


export const signin = (formData, history) => async(dispatch) => {
    console.log("1",formData);
    try {
        dispatch({ type: AUTH, formData});
        history('/');
    }catch(err){
        console.log(err);
    }
}


export const signup = (formData, history) => async(dispatch) =>{
    console.log("2")
    try {
        console.log("singup DATA",formData);

        dispatch({ type: AUTH, formData});
        history('/');
    }catch(err){
        console.log(err);
    }
}