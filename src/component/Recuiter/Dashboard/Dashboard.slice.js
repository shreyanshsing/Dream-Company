import {createSlice} from "@reduxjs/toolkit";
import { closeSnackbar, setSnackBarError, setSnackBarLoading } from "../../../Reusables/Toast/Toast.slice";
import Axios from 'axios';
import {URL} from '../../../Config/URL/url';

const DashboardReducer = createSlice({
    name:'Dashboard',
    initialState:{
        jobs : [],
        applicants : [],
        pdf : ""
    },
    reducers:{
        setJobs : (state,action) => {
            state.jobs = action.payload;
        },
        setApplicants : (state,action) => {
            state.applicants = action.payload;
        },
        setPdf : (state,action) => {
            state.pdf = action.payload;
        }
    }
});

export default DashboardReducer.reducer;

export const {setJobs,setApplicants,setPdf} = DashboardReducer.actions;

export const selectorDashboard = state => state.recuiterDashboard;

export const fetchjob = (email) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.get(URL+'fetch-jobs/'+email)
    .then(res => {
        console.log(res)
        dispatch(setJobs(res.data));
        dispatch(closeSnackbar());
    })
    .catch(err => {
        dispatch(setSnackBarError(err.response.data))
    })
}

export const fetchResumeByJobId = (id) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.get(URL+'fetch-resume-job/'+id)
    .then(res=>{
        dispatch(closeSnackbar());
        dispatch(setApplicants(res.data));
    })
    .catch(err => {
        console.log(err)
        dispatch(setSnackBarError(err.response.data))
    })
}

export const downloadService = (path) => dispatch => {
    Axios.get(URL+'download-resume/'+path,{responseType:'blob'})
    .then(res=>{
        var blob = new Blob([res.data],{type:'application/pdf'});
        var reader = new FileReader();
        reader.onload = function () {
        var b64 = reader.result.replace(/^data:.+;base64,/, '');
        var binary_string = window.atob(b64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        dispatch(setPdf(bytes));
        };
        reader.readAsDataURL(blob);
        //dispatch(setPdf(res.data))
    })
    .catch(err=>console.log(err))
}