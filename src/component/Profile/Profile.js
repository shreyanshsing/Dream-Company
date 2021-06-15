import React from "react";
import {Container,Grid,makeStyles,IconButton} from "@material-ui/core";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import PersonalInfo from "./PersonalInfo";
import JobDashboard from "./JobDashboard";
import { useHistory } from "react-router-dom";

const styles = makeStyles(theme=>({
    root:{
        padding:'1.5rem'
    }
}))

const Profile = () => {
    const classes = styles();
    const history = useHistory();

    return(
        <Container className={classes.root} maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item sm={1} style={{alignItems:'center'}}>
                    <IconButton onClick={()=>history.goBack()}>
                        <ArrowBackRoundedIcon color="primary" fontSize="large"/>
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <PersonalInfo/>
                </Grid>
                <Grid item xs={12} sm={4} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                    <JobDashboard/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile;