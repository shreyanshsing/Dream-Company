import {createSlice} from "@reduxjs/toolkit";
import { setSnackBarError, setSnackBarLoading, setSnackBarSuccess } from "../../../Reusables/Toast/Toast.slice";
import Axios from 'axios';
import {URL} from '../../../Config/URL/url';

const PostJobReducer = createSlice({
    name:'PostJob',
    initialState:{
        flag:false,
    },
    reducers:{
        setPostFlag : (state,action) => {
            state.flag = true;
        }
    }
});

export default PostJobReducer.reducer;

export const {setPostFlag} = PostJobReducer.actions;

export const selectorPostJob = state => state.postjob;

export const postjob = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    console.log(data)
    Axios.post(URL+'post-job',data)
    .then(res => {
        dispatch(setPostFlag());
        dispatch(setSnackBarSuccess("Posted job successfully!"));
    })
    .catch(err => {
        dispatch(setSnackBarError(err.response.data))
    })
}
