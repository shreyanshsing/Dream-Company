import React,{useState} from "react";
import {Dialog,DialogTitle,Button,DialogContent, TextField, Grid, AppBar, Toolbar,IconButton, Typography,makeStyles, MenuItem} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch} from "react-redux";
import {postjob} from "./PostJob.slice";
import {nanoid} from "@reduxjs/toolkit";

const style = makeStyles(theme=>({
    toolbar:{
        flexGrow:1,
        justifyContent:'flex-start'
    },
    root:{
        margin:'10px',
        marginTop:'30px',
        padding:'1rem'
    }
}))

const PostJob = ({open,setOpen}) => {
    const classes = style();
    const dispatch = useDispatch();
    const [title,setTitle] = useState('');
    const [type,setType] = useState('');
    const [cname,setCname] = useState('');
    const [desc,setDesc] = useState('');
    const [skill,setSkill] = useState('');
    const [min,setMin] = useState('');
    const [max,setMax] = useState('');
    const [postedBy,setPostedBy] = useState('');
    const [desg,setDesg] = useState('');

    const handlePostJob = (e) => {
        e.preventDefault();
        const data = {
            title:title,
            type:type,
            company:cname,
            desc:desc,
            skills:skill,
            postedBy:postedBy,
            desg:desg,
            pay:JSON.stringify({min:min,max:max}),
            key:localStorage.getItem('email'),
            id:nanoid().slice(0,6).toLowerCase(),
        }
        dispatch(postjob(data));
    }
    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            fullWidth={true}
            fullScreen={true}
            maxWidth="sm">
            <DialogTitle>
                <AppBar elevation={3} color="primary">
                    <Toolbar className={classes.toolbar}>
                        <IconButton onClick={()=>setOpen(false)}>
                            <CloseIcon style={{fill:'white'}}/>
                        </IconButton>
                        <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Post Job</Typography>
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent className={classes.root}>
                <form onSubmit={handlePostJob}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Job Title"
                                fullWidth
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                select
                                type="text"
                                variant="outlined"
                                label="Job Type"
                                fullWidth
                                value={type}
                                onChange={e=>setType(e.target.value)}
                                required
                            >
                                <MenuItem value="internship">Internship</MenuItem>
                                <MenuItem value="temporary">Temporary Employee</MenuItem>
                                <MenuItem value="permanent">Permanent Employee</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Company Name"
                                fullWidth
                                value={cname}
                                onChange={e=>setCname(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                label="Job Description"
                                type="text"
                                multiline
                                rows={5}
                                fullWidth
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                label="Skills/Expreince Required"
                                type="text"
                                multiline
                                rows={5}
                                fullWidth
                                value={skill}
                                onChange={e=>setSkill(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <Typography compoennt="span" variant="body1" gutterBottom>Pay Range</Typography>
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Min"
                                placeholder="write currency also"
                                value={min}
                                onChange={e=>setMin(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Max"
                                placeholder="write currency also"
                                value={max}
                                onChange={e=>setMax(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Posted By"
                                placeholder="name of the person."
                                value={postedBy}
                                onChange={e=>setPostedBy(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Designation"
                                placeholder="write designation of the person posting this job."
                                value={desg}
                                onChange={e=>setDesg(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button style={{width:'100%',padding:'10px'}} type="submit" variant="contained" color="secondary">Post</Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default PostJob;