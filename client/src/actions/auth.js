import { AUTH } from '../constants/actionTypes';
import * as api from '../api';
import { gql, useQuery, useMutation } from '@apollo/client';

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