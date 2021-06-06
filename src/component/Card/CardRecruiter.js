import React,{useState} from "react";
import {Card,CardHeader,CardContent,CardActions,Typography,Button} from "@material-ui/core";
import LoginModal from "../Login/Login";
import SignupModal from "../Signup/Signup";

const CardRecruiter = () => {
    
    const [openLogin,setOpenLogin] = useState(false);
    const [openSignup,setOpenSignup] = useState(false);

    return(
        <>
        <Card raised>
            <CardHeader
                title="Looking for a employee"
                subheader="now it's easy to find one"/>
            <CardContent>
                <Typography variant="body2" style={{textAlign:'justify'}} gutterBottom>
                    Get in as a recuiter and find a employee which suits your requirment.
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent:'center'}}>
                <Button type="button" variant="text" onClick={()=>setOpenLogin(true)}>Login</Button>/
                <Button type="button" variant="text" onClick={()=>setOpenSignup(true)}>Signup</Button>
            </CardActions>
        </Card>
        {
            openLogin ? <LoginModal open={openLogin} setOpen={setOpenLogin} id="rec"/> : null
        }
        {
            openSignup ? <SignupModal open={openSignup} setOpen={setOpenSignup} id="rec"/> : null
        }
        </>
    )
}

export default CardRecruiter;