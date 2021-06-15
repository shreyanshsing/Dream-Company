import {createSlice} from "@reduxjs/toolkit";
import { setSnackBarError, setSnackBarLoading, setSnackBarSuccess } from "../../Reusables/Toast/Toast.slice";
import Axios from 'axios';
import {URL} from '../../Config/URL/url';

const LoginReducer = createSlice({
    name:'Login',
    initialState:{
        loginFlag:false,
    },
    reducers:{
        setLoginFlag : (state,action) => {
            state.loginFlag = true;
            console.log(action.payload);
            localStorage.setItem('id',action.payload.id);
            localStorage.setItem('name',action.payload.name);
            localStorage.setItem('email',action.payload.email);
        }
    }
});

export default LoginReducer.reducer;

export const {setLoginFlag} = LoginReducer.actions;

export const selectorLogin = state => state.login;

export const LoginCandidate = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'login-candidate',data)
    .then(res => {
        console.log(res.data);
        dispatch(setLoginFlag({name:`${res.data.fname} ${res.data.lname}`,email:data.email,id:res.data.id}));
        dispatch(setSnackBarSuccess("Login Successfull! redirecting to dashboard"));
    })
    .catch(err => {
        dispatch(setSnackBarError(err.response.data))
    })
}

export const LoginRecuiter = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'login-recuiter',data)
    .then(res => {
        dispatch(setLoginFlag({name:`${res.data.fname} ${res.data.lname}`,email:data.email,id:res.data.id}));
        dispatch(setSnackBarSuccess("Login Successfull! redirecting to dashboard"));
    })
    .catch(err => {
        console.log(err)
        dispatch(setSnackBarError(err.response.data))
    })
}