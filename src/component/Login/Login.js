import React, {useState} from "react";
import {Dialog,DialogContent,DialogTitle,Grid,TextField, Button,makeStyles,Hidden,AppBar,Toolbar,Typography,IconButton,useTheme,useMediaQuery} from "@material-ui/core";
import {useSelector,useDispatch} from "react-redux";
import { LoginCandidate, LoginRecuiter, selectorLogin } from "./Login.slice";
import {useHistory} from "react-router-dom";
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

const LoginModal = ({open,setOpen,id}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const {loginFlag} = useSelector(selectorLogin);
    const classes = styles();

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
            fullScreen={fullScreen}
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
                            <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Login</Typography>
                        </Toolbar>
                    </AppBar>
                </Hidden>
                <Hidden only={['xs','sm']}>
                    <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Login</Typography>
                </Hidden>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <form onSubmit={handleLogin}>
                    <Grid container spacing={3}>
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
                        <Grid item xs={12} sm={12} style={{textAlign:'center'}}>
                        <Button variant="text" type="reset" color="secondary">
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