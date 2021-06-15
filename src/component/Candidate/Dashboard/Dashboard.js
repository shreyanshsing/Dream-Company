import React,{useEffect} from "react";
import { Container,Grid,makeStyles,Typography,Box,Avatar,Hidden} from "@material-ui/core";
import HeaderRec from "../../Header/HeaderRec";
import CardJob from "../../Card/CardJob";
import {useSelector,useDispatch} from "react-redux";
import { fetchActiveJobs, selectorCandidateDashboard } from "./Dashboar.slice";
import Img from "../business.png";
import Sidebar from  "../../Sidebar/Sidebar"

const style = makeStyles(theme=>({
    root:{
        padding:'2rem'
    },
    large:{
        width:theme.spacing(20),
        height:theme.spacing(20)
    },
    content:{
        marginTop:'1.2rem',
        padding:'1.5rem',
        overflowY:'scroll',
        scrollbarWidth:'1px',
    },
    absolute:{
        position:'absolute',
        width:'inherit',
        overflowY:'scroll',
        height:'80vh',
        overflowX:'hidden',
        background:'white',
        borderRadius:'10px',
        boxShadow:'3px 3px 5px lightgrey',
        paddingLeft:'0.5rem',
    }
}))

const DashboardCandidate = () => {
    const classes = style();
    const dispatch = useDispatch();
    const {activeJobs} = useSelector(selectorCandidateDashboard);

    useEffect(()=>{
        dispatch(fetchActiveJobs());
    },[dispatch]);

    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <HeaderRec/>
                </Grid>
                <Grid item xs={12} sm={12}></Grid>
                <Hidden only={['xs','sm']}>
                    <Grid item xs={12} sm={3}>
                        <Sidebar/>
                    </Grid>
                </Hidden>
                <Grid item sm={9} className={classes.content}>
                    <Grid container spacing={2} className={classes.absolute}>
                        <Hidden only={['xs','sm']}>
                            <Grid item sm={3}>
                                <Box>
                                    <Avatar className={classes.large} src={Img} alt="man"/>
                                </Box>
                            </Grid>
                        </Hidden>
                        <Grid item xs={4} sm={3} style={{display:'flex',alignItems:'center'}}>
                            <Typography variant="h5" gutterBottom>
                                <b><u>+3,000</u></b><br/>
                                <small>Companies</small>
                            </Typography>
                            <Hidden only={['xs','sm']}>
                                <img alt="pic" src="https://img.icons8.com/bubbles/100/000000/company.png"/>
                            </Hidden>
                        </Grid>
                        <Grid item xs={4} sm={3} style={{display:'flex',alignItems:'center'}}>
                            <Typography variant="h5" gutterBottom>
                                <b><u>+4,000</u></b><br/>
                                <small>Opportunities</small>
                            </Typography>
                            <Hidden only={['xs','sm']}>
                                <img alt="pic" src="https://img.icons8.com/fluent/96/000000/find-matching-job.png"/>
                            </Hidden>
                        </Grid>
                        <Grid item xs={4} sm={3} style={{display:'flex',alignItems:'center'}}>
                            <Typography variant="h5" gutterBottom>
                                <b><u>+1,000</u></b><br/>
                                <small>Got jobs</small>
                            </Typography>
                            <Hidden only={['xs','sm']}>
                                <img alt="pic" src="https://img.icons8.com/emoji/96/000000/fire.png"/>
                            </Hidden>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>
                                {
                                    activeJobs.length > 0 ? 
                                    activeJobs.slice(0,10).map(e =>
                                        <Grid key={e.id} item xs={12} sm={6} md={3}>
                                            <CardJob data={e}/>
                                        </Grid>
                                        ) : <Typography variant="h4" color="error" gutterBottom>No active jobs found!</Typography>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashboardCandidate;