import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import {Snackbar} from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';
import {CircularProgress} from "@material-ui/core";
import {useDispatch,useSelector} from "react-redux";
import { closeSnackbar, snackbarSelector } from './Toast.slice';

function Alert(props) {
  return <MuiAlert elevation={12} variant="filled" {...props} />;
}

const Toast=()=>{
  const snack = useSelector(snackbarSelector);
  console.log(snack)
  const dispatch = useDispatch();

  return(<Snackbar open={snack.snackbarView} autoHideDuration={10000} onClose={()=>dispatch(closeSnackbar())} anchorOrigin={{vertical:'bottom',horizontal:'left'}}>
          <Alert iconMapping={{ info : <CircularProgress style={{color:'whitesmoke'}}/> }} onClose={()=>dispatch(closeSnackbar())} severity={snack.severity}>
            <AlertTitle>{snack.severity === "success" ? "Success" : snack.severity==="error" ? "Error" : "Loading"}</AlertTitle>
            {snack.message}
          </Alert>
        </Snackbar>)
}

export default Toast;