import React,{useState} from "react";
import {Card,CardHeader,CardContent,CardActions,Typography,Button,makeStyles} from "@material-ui/core";
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

const CardRecruiter = () => {
    const classes = styles();
    const [openLogin,setOpenLogin] = useState(false);
    const [openSignup,setOpenSignup] = useState(false);

    return(
        <>
        <Card className={classes.root} raised>
            <CardHeader
                title="Looking for a recuit"
                subheader="now it's easy to find one"/>
            <CardContent className={classes.content}>
                <Typography variant="body2" gutterBottom>
                    Get in as a recuiter and find a employee which suits your requirment.
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent:'center'}}>
                <Button type="button" variant="outlined" color="secondary" onClick={()=>setOpenLogin(true)}>Login</Button>&nbsp;/
                <Button type="button" variant="outlined" color="secondary" onClick={()=>setOpenSignup(true)}>Signup</Button>
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