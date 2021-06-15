import {createSlice} from "@reduxjs/toolkit";
import { setSnackBarError, setSnackBarLoading, setSnackBarSuccess } from "../../../Reusables/Toast/Toast.slice";
import Axios from "axios";
import {URL} from "../../../Config/URL/url";

const ApplyJobReducer = createSlice({
    name:'applyjobreducer',
    initialState : {
        applyFlag : false,
        dir:''
    },
    reducers : {
        setApplyFlag : (state,action) => {
            state.applyFlag = true;
            state.dir = action.payload;
        }
    }
});
export default ApplyJobReducer.reducer;

export const {setApplyFlag} = ApplyJobReducer.actions;

export const selectorApplyJob = state => state.applyjob;

export const applyjob = (details) => dispatch => {
    console.log(details)
    dispatch(setSnackBarLoading());
    Axios.post(URL+'apply-for-job',details)
    .then(res => {
        dispatch(setApplyFlag());
        dispatch(setSnackBarSuccess("Applied Successfully"));
    })
    .catch(err => {
        console.log(err);
        dispatch(setSnackBarError(err.response.data));
    })
}

export const uploadResume = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    const formData = new FormData();
    formData.append("file",data);
    formData.append("name",localStorage.getItem('id'))
    Axios.post(URL+'upload-resume',formData)
    .then(res=>{
        dispatch(setApplyFlag(res.data));
        dispatch(setSnackBarSuccess("Resume uploaded"))
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError(err.response.data))
    })
}