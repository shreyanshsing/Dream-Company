import React,{useState} from "react";
import {Dialog,DialogContent,DialogTitle,Grid,TextField, Button,makeStyles,useTheme,useMediaQuery,AppBar,Toolbar,IconButton,Typography,Hidden} from "@material-ui/core";
import {useDispatch} from "react-redux";
import { SignupCandidate, SignupRecuiter } from "./Signup.slice";
import { nanoid } from "@reduxjs/toolkit";
import CloseIcon from '@material-ui/icons/Close';

const styles = makeStyles(theme=>({
    root:{
        padding:'1rem',
        background:'linear-gradient(9deg,#0077b3,#9966ff)',
        color:'white'
    },
    content:{
        background:'rgba(255,255,255,0.4)',
        margin:'1rem',
        marginTop:'0.5rem',
        borderRadius:'10px',
        overflow:'hidden',
        padding:'1rem'
    }
}))

const SignupModal = ({open,setOpen,id}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = styles();
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
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="sm"
            classes={{
                paper:classes.root
            }}
        >
            <DialogTitle>
                <Hidden only={['md','xl','lg']}>
                    <AppBar elevation={0} color="transparent">
                        <Toolbar className={classes.toolbar}>
                            <IconButton onClick={()=>setOpen(false)}>
                                <CloseIcon style={{fill:'white'}}/>
                            </IconButton>
                            <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Signup</Typography>
                        </Toolbar>
                    </AppBar>
                </Hidden>
                <Hidden only={['xs','sm']}>
                    <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Signup</Typography>
                </Hidden>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}></Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Button variant="text" type="reset" color="secondary" onClick={clear}>
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