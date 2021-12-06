import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null}, action) =>{
    console.log("QQ1",state);
    console.log("QQ2",action.formData);
    switch(action.type){
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.formData.data }));
            console.log("HIHI");
            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state; 
    }
}

export default authReducer;
    
