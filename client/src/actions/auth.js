import {AUTH} from '../Constants/actionTypes.js';
import * as api from "../api";


export const signUp= (formData,navigate) => async (dispatch) => {
    try {
        // sign up user
        const {data} =  await api.signUp(formData);
        

        dispatch({type:AUTH, payload:data})

        navigate('/');
        
    } catch (error) {
        console.log(error);
    }

}

export const signIn= (formData,navigate) => async (dispatch) => {
    try {
        // sign in user
        const {data} =  await api.signIn(formData);

        dispatch({type:AUTH, payload:data})

        navigate('/');
        
    } catch (error) {
        console.log(error);
    }
    
}