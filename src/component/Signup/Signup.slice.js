import {createSlice} from "@reduxjs/toolkit";
import { setSnackBarError, setSnackBarLoading, setSnackBarSuccess } from "../../Reusables/Toast/Toast.slice";
import Axois from 'axios';
import {URL} from '../../Config/URL/url';

const SignupReducer = createSlice({
    name:'Signup',
    initialState:{
        signupFlag:false,
    },
    reducers:{
        setSignupFlag : (state) => {
            state.signupFlag = true;
        }
    }
});

export default SignupReducer.reducer;

export const {setSignupFlag} = SignupReducer.actions;

export const selectorSignup = state => state.signup;

export const SignupCandidate = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axois.post(URL+'create-candidate',data)
    .then(res => {
        dispatch(setSignupFlag());
        dispatch(setSnackBarSuccess("Registration Successfull!"))
    })
    .catch(err => {
        console.log(err.response.data)
        dispatch(setSnackBarError(err.response.data))
    })
}
export const SignupRecuiter = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axois.post(URL+'create-recuiter',data)
    .then(res => {
        dispatch(setSignupFlag());
        dispatch(setSnackBarSuccess("Registration Successfull!"))
    })
    .catch(err => {
        console.log(err.response.data)
        dispatch(setSnackBarError(err.response.data))
    })
}