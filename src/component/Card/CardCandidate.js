import React, {useState} from "react";
import {Card,CardHeader,CardContent,CardActions,Button, Typography} from "@material-ui/core";
import LoginModal from "../Login/Login";
import SignupModal from "../Signup/Signup";

const CardCandidate = () => {
    const [openLogin,setOpenLogin] = useState(false);
    const [openSignup,setOpenSignup] = useState(false);
    return(
        <>
        <Card raised>
            <CardHeader
                title="Looking for a job"
                subheader="now it's easy to find one"/>
            <CardContent>
                <Typography variant="body2" style={{textAlign:'justify'}} gutterBottom>
                    Get in as a candidate and explore a lot of oppurtunities.
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent:'center'}}>
                <Button type="button" onClick={()=>setOpenLogin(true)} variant="text">Login</Button>/
                <Button type="button" onClick={()=>setOpenSignup(true)} variant="text">Signup</Button>
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