import React,{useState} from "react";
import {Dialog,DialogContent,DialogTitle,Grid,TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import { SignupCandidate, SignupRecuiter } from "./Signup.slice";
import { nanoid } from "@reduxjs/toolkit";

const SignupModal = ({open,setOpen,id}) => {
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cnfrmPass,setCnfrmPass] = useState('');
    const [err,setErr] = useState(false);
    const [helper,setHelper] = useState('');
    const dispatch = useDispatch();

    const handlePasswordMatch = () => {
        if(cnfrmPass !== password){
            setHelper("Password does not match");
            setErr(true);
            return;
        }
        else{
            setErr(false);
            setHelper('');
        }
    }

    const clear = () => {
        setFname('');
        setLname('');
        setEmail('');
        setPassword('');
        setCnfrmPass('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.length<6){
            alert("Week password, length should be at least 6.");
            return;
        }
        const data = {
            fname:fname,
            lname:lname,
            email:email,
            password:password,
            id : nanoid().slice(0,6).toLowerCase()
        }
        if(id === "rec"){
            dispatch(SignupRecuiter(data));
            return;
        }
        else{
            dispatch(SignupCandidate(data));
            return;
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
                Signup!
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item sm={6}>
                            <TextField
                                type="text"
                                required
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={fname}
                                onChange={e=>setFname(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                type="text"
                                required
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={lname}
                                onChange={e=>setLname(e.target.value)}
                            />
                        </Grid>
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
                        <Grid item sm={6}>
                            <TextField
                                type="password"
                                required
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                value={cnfrmPass}
                                onChange={e=>setCnfrmPass(e.target.value)}
                                onKeyUp={handlePasswordMatch}
                                error={err}
                                helperText = {helper}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} style={{textAlign:'center'}}>
                        <Button variant="text" type="reset" onClick={clear}>
                            Clear
                        </Button>
                        &nbsp;  / &nbsp;
                        <Button variant="contained" color="secondary" type="submit">
                            Signup
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SignupModal;