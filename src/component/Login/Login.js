import React, {useState} from "react";
import {Dialog,DialogContent,DialogTitle,Grid,TextField, Button} from "@material-ui/core";
import {useSelector,useDispatch} from "react-redux";
import { LoginCandidate, LoginRecuiter, selectorLogin } from "./Login.slice";
import {useHistory} from "react-router-dom";

const LoginModal = ({open,setOpen,id}) => {
    const dispatch = useDispatch();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const {loginFlag} = useSelector(selectorLogin);

    const handleLogin =(e) => {
        e.preventDefault();
        if(id === "rec"){
            dispatch(LoginRecuiter({email:email,password:password}))
            const name = localStorage.getItem('name');
            const mail = localStorage.getItem('email');
            name !== '' && mail !== '' && loginFlag && history.push('/dashboard-recuiter');
            console.log(name,mail,loginFlag)
            return;
        }
        else{
            dispatch(LoginCandidate({email:email,password:password}))
            const name = localStorage.getItem('name');
            const mail = localStorage.getItem('email');
            name !== '' && mail !== '' && loginFlag && history.push('/dashboard-candidate');
        }
    }
    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle>
                Login!
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleLogin}>
                    <Grid container spacing={3}>
                        <Grid item sm={6}>
                            <TextField
                                type="email"
                                required
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                type="password"
                                required
                                label="Password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} style={{textAlign:'center'}}>
                        <Button variant="text" type="reset">
                            Clear
                        </Button>
                        &nbsp;  / &nbsp;
                        <Button variant="contained" color="secondary" type="submit">
                            Login
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal;