import {createSlice} from "@reduxjs/toolkit";
import Axios from 'axios';
import {setSnackBarLoading,setSnackBarError, closeSnackbar, setSnackBarSuccess} from "../../../Reusables/Toast/Toast.slice";
import {URL} from "../../../Config/URL/url";

const DashboardCandidateReducer = createSlice({
    name:'DashboardCandidateRaducer',
    initialState:{
        activeJobs:[],
        closedJobs:[],
        savedJobs:[],
        appliedJobs:[]
    },
    reducers:{
        setActiveJobs : (state,action) => {
            state.activeJobs = action.payload;
        },
        setCloseJobs : (state,action) => {
            state.closedJobs = action.payload;
        },
        setSavedJobs : (state,action) => {
            state.savedJobs = action.payload;
        },
        setAppliedJobs : (state,action) => {
            state.appliedJobs = action.payload;
        },
    }
});

export default DashboardCandidateReducer.reducer;

export const {setActiveJobs,setCloseJobs,setSavedJobs,setAppliedJobs} = DashboardCandidateReducer.actions;

export const selectorCandidateDashboard = state => state.candidateDashboard;

export const fetchActiveJobs = () => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.get(URL+'fetch-activejobs')
    .then(res => {
        dispatch(setActiveJobs(res.data))
        dispatch(closeSnackbar());
    })
    .catch(err => {
        dispatch(setSnackBarError(err.response.data.message));
    })
}

export const saveJob = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    const details = {
        candidate_id : localStorage.getItem('id'),
        status : 'N/A',
        data : data
    }
    Axios.post(URL+'save-job/'+data.id,details)
    .then(res=>{
        dispatch(setSnackBarSuccess("Job saved successfully"));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError(err.response.data));
    })
}

export const fetchSavedJob = () => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.get(URL+'fetch-saved-jobs/'+localStorage.getItem('id'))
    .then(res=>{
        dispatch(setSavedJobs(res.data));
        dispatch(closeSnackbar());
    })
    .catch(err => {
        console.log(err);
        dispatch(setSnackBarError('Failed to load data, retry'))
    })
}

export const fetchAppliedJob = () => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.get(URL+'fetch-applied-jobs/'+localStorage.getItem('id'))
    .then(res=>{
        dispatch(setAppliedJobs(res.data));
        dispatch(closeSnackbar());
    })
    .catch(err => {
        console.log(err);
        dispatch(setSnackBarError('Failed to load data, retry'))
    })
}