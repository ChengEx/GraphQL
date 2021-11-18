import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async(dispatch) => {
    console.log("1")
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data});
        history('/');
    }catch(err){
        console.log(err);
    }
}

export const signup = (formData, history) => async(dispatch) =>{
    console.log("2")
    try {
        console.log("hi",formData);
        const { data } = await api.signUp(formData);
        console.log("hi2",data);
        dispatch({ type: AUTH, data});
        history('/');
    }catch(err){
        console.log(err);
    }
}