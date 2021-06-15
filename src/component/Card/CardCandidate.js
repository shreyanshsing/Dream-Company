import React, {useState} from "react";
import {Card,CardHeader,CardContent,CardActions,Button, Typography,makeStyles} from "@material-ui/core";
import LoginModal from "../Login/Login";
import SignupModal from "../Signup/Signup";

const styles = makeStyles(theme=>({
    root:{
        background:'linear-gradient(9deg,#0077b3,#9966ff)',
        color:'whitesmoke',
        padding:'0.5rem',
        borderRadius:'20px'
    },
    content:{
        textAlign:'center'
    }
}))

const CardCandidate = () => {
    const classes = styles();
    const [openLogin,setOpenLogin] = useState(false);
    const [openSignup,setOpenSignup] = useState(false);
    return(
        <>
        <Card className={classes.root} raised>
            <CardHeader
                title="Looking for a job"
                subheader="now it's easy to find one"/>
            <CardContent className={classes.content}>
                <Typography variant="body2" gutterBottom>
                    Get in as a candidate and explore a lot of oppurtunities.
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent:'center'}}>
                <Button type="button" onClick={()=>setOpenLogin(true)} variant="outlined" color="secondary">Login</Button> &nbsp;/
                <Button type="button" color="secondary" onClick={()=>setOpenSignup(true)} variant="outlined">Signup</Button>
            </CardActions>
        </Card>
        {
            openLogin ? <LoginModal open={openLogin} setOpen={setOpenLogin}/> : null
        }
        {
            openSignup ? <SignupModal open={openSignup} setOpen={setOpenSignup}/> : null
        }
        </>
    )
}

export default CardCandidate;