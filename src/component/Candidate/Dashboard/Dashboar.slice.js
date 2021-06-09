import {createSlice} from "@reduxjs/toolkit";
import Axios from 'axios';
import {setSnackBarLoading,setSnackBarError, closeSnackbar} from "../../../Reusables/Toast/Toast.slice";
import {URL} from "../../../Config/URL/url";

const DashboardCandidateReducer = createSlice({
    name:'DashboardCandidateRaducer',
    initialState:{
        activeJobs:[],
        closedJobs:[],
    },
    reducers:{
        setActiveJobs : (state,action) => {
            state.activeJobs = action.payload;
        },
        setCloseJobs : (state,action) => {
            state.closedJobs = action.payload;
        }
    }
});

export default DashboardCandidateReducer.reducer;

export const {setActiveJobs,setCloseJobs} = DashboardCandidateReducer.actions;

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
