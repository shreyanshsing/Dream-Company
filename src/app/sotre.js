import {configureStore} from "@reduxjs/toolkit";
import SignupReducer from "../component/Signup/Signup.slice";
import SnackbarReducer from "../Reusables/Toast/Toast.slice";
import LoginReducer from "../component/Login/Login.slice";
import PostjobReducer from "../component/Recuiter/Dialog/PostJob.slice";
import DashboardReducer from "../component/Recuiter/Dashboard/Dashboard.slice";
import DashboardCandidate from "../component/Candidate/Dashboard/Dashboar.slice";
import ApplyJobReducer from "../component/Candidate/ApplyPage/Apply.slice";

export default configureStore({
    reducer:{
        signup: SignupReducer,
        snackbar: SnackbarReducer,
        login: LoginReducer,
        postjob : PostjobReducer,
        recuiterDashboard : DashboardReducer,
        candidateDashboard : DashboardCandidate,
        applyjob : ApplyJobReducer
    },
    middleware : getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), 
});