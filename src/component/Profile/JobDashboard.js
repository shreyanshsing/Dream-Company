import React, { useState } from "react";
import { Container,MenuItem,TextField,List,ListItem,Typography,makeStyles,ListItemText,Button,ListItemSecondaryAction,Box } from "@material-ui/core";
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { fetchSavedJob, selectorCandidateDashboard, fetchAppliedJob } from "../Candidate/Dashboard/Dashboar.slice";
import { useDispatch, useSelector } from "react-redux";
import ApplyJob from "../Candidate/ApplyPage/ApplyPage";

const styles = makeStyles(theme=>({
    root:{
        width:'100%',
        background:'white',
        boxShadow:'3px 3px 5px lightgrey',
        borderRadius:'10px',
        padding:'0px'
    },
    list:{
       width:'100%',
       padding:'0px',
       margin:'0px'
    },
    head:{
        background:'linear-gradient(45deg,#0077b3,#009933)',
        color:'whitesmoke',
        padding:'1.5rem',
        borderRadius:'10px 10px 0px 0px',
        textAlign:'center',
        fontWeight:500,
        fontSize : '1rem',
        border:'0px'
    }
}))

const JobDashboard = () => {
    const classes = styles();
    const dispatch = useDispatch();
    const [data,setData] = useState({});
    const [open,setOpen] = useState(false);
    const {appliedJobs,savedJobs} = useSelector(selectorCandidateDashboard);
    const [type,setType] = useState('all');

    console.log(appliedJobs)
    
    const handleChange = (e) => {
        if(e.target.value === "saved"){
            dispatch(fetchSavedJob());
            setType('saved')
        }
        if(e.target.value === "applied"){
            dispatch(fetchAppliedJob());
            setType('applied')
        }
    }

    const handleClick = (item) =>{
        setData(item);
        setOpen(true);
    }
    return(
        <Container maxWidth="xl" className={classes.root}>
            <List className={classes.list}>
                <ListItem className={classes.head}>
                    <Typography variant="h5" style={{width:'100%',padding:'0px',margin:'0px',textAlign:'center'}} gutterBottom>Dashboard</Typography>
                </ListItem>
                <ListItem>
                    <TextField
                        select
                        value={type}
                        label="sort by"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        onChange={(e)=>handleChange(e)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="applied">Applied</MenuItem>
                        <MenuItem value="saved">Saved</MenuItem>
                    </TextField>
                </ListItem>
                {
                    type === "saved" && savedJobs.length>0 ? 
                    savedJobs.map(item=>
                        <ListItem divider key={item.data.id}>
                            <ListItemText primary={item.data.title} secondary={
                                <Typography variant="body2" gutterBottom color="textSecondary">
                                    Company <ChevronRightRoundedIcon color="primary" fontSize="small"/> {item.data.company}<br/>
                                    Type <ChevronRightRoundedIcon color="primary" fontSize="small"/> {item.data.type} <br/>
                                    Status <ChevronRightRoundedIcon color="primary" fontSize="small"/>  {item.status}
                                </Typography>
                            }/>
                            <ListItemSecondaryAction>
                                <Button type="button" disabled={item.applied} color="primary" variant="text" onClick={()=>handleClick(item.data)}>{item.applied ? "Applied" : "Apply"}</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                        ) : 
                    type === "applied" && appliedJobs.length>0 ? 
                    appliedJobs.map(item=>
                        <ListItem divider key={item.id}>
                            <ListItemText primary={item.title} secondary={
                                <Typography variant="body2" gutterBottom color="textSecondary">
                                    Company <ChevronRightRoundedIcon color="primary" fontSize="small"/> {item.company}<br/>
                                    Type <ChevronRightRoundedIcon color="primary" fontSize="small"/> {item.type} <br/>
                                    Status <ChevronRightRoundedIcon color="primary" fontSize="small"/>  {item.status ? item.status : 'N/A'}
                                </Typography>
                            }/>
                            <ListItemSecondaryAction>
                                <Button type="button" disabled={true} color="primary" variant="text">Applied</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                        ) : 
                        <Box style={{border:'1px dotted lightgrey',width:'100%',padding:'0.5rem'}}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>This section is empty</Typography>
                        </Box>

                }
            </List>
            {
                open ? <ApplyJob open={open} setOpen={setOpen} data={data}/> : null
            }
        </Container>
    )
}

export default JobDashboard;