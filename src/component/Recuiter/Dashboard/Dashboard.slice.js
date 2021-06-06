import {createSlice} from "@reduxjs/toolkit";
import { closeSnackbar, setSnackBarError, setSnackBarLoading } from "../../../Reusables/Toast/Toast.slice";
import Axios from 'axios';
import {URL} from '../../../Config/URL/url';

const DashboardReducer = createSlice({
    name:'Dashboard',
    initialState:{
        jobs:[],
    },
    reducers:{
        setJobs : (state,action) => {
            state.jobs = action.payload;
        }
    }
});

export default DashboardReducer.reducer;

export const {setJobs} = DashboardReducer.actions;

export const selectorDashboard = state => state.dashboard;

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
