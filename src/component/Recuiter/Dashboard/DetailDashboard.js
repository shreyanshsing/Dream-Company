import React,{useState,useEffect} from "react";
import { Container,Grid,IconButton,List,ListItem,ListItemIcon,ListItemText,makeStyles,Tooltip,Typography} from "@material-ui/core";
import HeaderRec from "../../Header/HeaderRec";
import {useDispatch,useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import GetAppIcon from '@material-ui/icons/GetApp';
import {fetchResumeByJobId, selectorDashboard,downloadService} from "./Dashboard.slice";
import Pdf from "../../Pdf/Pdf";

const style = makeStyles(theme=>({
    root:{
        padding:'1rem'
    }
}))

const DetailDashboard = () => {
    const classes = style();
    const dispatch = useDispatch();
    const location = useLocation();
    const [open,setOpen] =useState(false);
    const {applicants} = useSelector(selectorDashboard);

    useEffect(()=>{
        dispatch(fetchResumeByJobId(location.state.id));
    },[dispatch,location.state.id])

    const downloadResume = (path) => {
        dispatch(downloadService(path));
        setOpen(true);
    }

    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} >
                    <HeaderRec/>
                </Grid>
                <Grid item xs={12} sm={12}></Grid>
                <Grid item xs={12} sm={12}>
                    <Typography component="b" variant="h6" gutterBottom><b>Summary</b></Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Typography variant="body1" gutterBottom>
                       Job Title - {location.state ? location.state.title : 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Typography variant="body1" gutterBottom>
                       Posted on - {location.state ? new Date(location.state.createdOn).getDate() +"-"+ new Date(location.state.createdOn).getMonth() +"-"+ new Date(location.state.createdOn).getFullYear() : 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Typography variant="body1" gutterBottom>
                       Status - {location.state ? location.state.status : 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Typography variant="body1" gutterBottom>
                       Applicants - {location.state && location.state.applicants ? location.state.applicants : '0'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                       <u>Description</u> <br/> {location.state ? location.state.description : 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        <u>Skills required</u> <br/> {location.state ? location.state.skills : 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                       <u>List of Applicants </u>
                    </Typography>
                    <List>
                        {
                            applicants.map(item =>
                                <ListItem divider>
                                    <ListItemIcon>
                                        <Tooltip title="Download Resume">
                                            <IconButton onClick={e=>downloadResume(item.resume)}>
                                                <GetAppIcon color="secondary"/>
                                            </IconButton>
                                        </Tooltip>
                                        <ListItemText primary={item.name}/>
                                    </ListItemIcon>
                                </ListItem>
                        )
                        }
                    </List>
                </Grid>
            </Grid>
            {
                open ? <Pdf open={open} setOpen={setOpen}/> : null
            }
        </Container>
    )
}

export default DetailDashboard;