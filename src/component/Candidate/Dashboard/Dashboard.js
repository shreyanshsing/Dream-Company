import React,{useEffect} from "react";
import {Button, Container,Grid,makeStyles,Typography} from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import HeaderRec from "../../Header/HeaderRec";
import CardJob from "../../Card/CardJob";
import {useSelector,useDispatch} from "react-redux";
import { fetchActiveJobs, selectorCandidateDashboard } from "./Dashboar.slice";

const style = makeStyles(theme=>({
    root:{
        padding:'2rem'
    }
}))

const DashboardCandidate = () => {
    const classes = style();
    const dispatch = useDispatch();
    const {activeJobs} = useSelector(selectorCandidateDashboard);

    console.log(activeJobs)

    useEffect(()=>{
        console.log(localStorage.getItem('id'));
        dispatch(fetchActiveJobs());
    },[dispatch]);

    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <HeaderRec/>
                </Grid>
                <Grid item sm={12}></Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Active job opportunity
                    </Typography>
                    <Button
                        endIcon={<FilterListIcon/>}
                        variant="text"
                        color="primary"
                    >
                        Filter
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={3}>
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
        </Container>
    )
}

export default DashboardCandidate;