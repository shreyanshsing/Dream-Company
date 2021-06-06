import { createSlice } from '@reduxjs/toolkit';

export const snackbar = createSlice({
    name: 'toastReducer',
    initialState: {
        severity:"",
        message:"",
        snackbarView:false
    },
    reducers: {
        setSnackBarLoading : (state) => {
            state.severity = "info";
            state.message = "Please wait we are loading data...";
            state.snackbarView = true;
        },
        setSnackBarSuccess : (state,action) => {
            state.severity = "success";
            state.message = action.payload;
            state.snackbarView = true;
        },
        setSnackBarError : (state,action) => {
            state.severity = "error";
            state.message = action.payload;
            state.snackbarView = true;
        },
        closeSnackbar : (state) => {
            state.snackbarView = false;
        }
    }
});

export const {setSnackBarLoading,setSnackBarSuccess,setSnackBarError,closeSnackbar} = snackbar.actions;
export const snackbarSelector = state => state.snackbar;
export default snackbar.reducer;