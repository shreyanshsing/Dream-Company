import React,{useState} from "react";
import {Dialog,DialogTitle,Button,DialogContent,Grid, AppBar, Toolbar,IconButton, Typography,makeStyles, Step,Stepper,StepLabel,StepContent, TextField, MenuItem} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch,useSelector} from "react-redux";
import {applyjob,selectorApplyJob,uploadResume
} from "./Apply.slice";

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

const ApplyJob = ({open,setOpen,data}) => {
    const classes = style();

    const handleResume = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setResume(event.target.files[0]);    
    };

    const handleResumeUpload = (e) => {
        e.preventDefault();
        if(!resume){
            alert("No file is selected please select a pdf.");
            return;
        }
        dispatch(uploadResume(resume));
    }

    function getSteps() {
        return ['Information', 'Apply'];
    }
      
    function getStepContent(step) {
        switch (step) {
            case 0:
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            Job Title - {data && data.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            Employment type - {data && data.type}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            About company - {data && data.company}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            Job Description - {data && data.desg}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            Expected Pay Range - {data && JSON.parse(data.pay).min} to {data && JSON.parse(data.pay).max}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            Skill's & Experince - {data && data.skills}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="caption" gutterBottom>
                            This job post has been posted by {data && data.postedBy}({data && data.desg}).
                        </Typography>
                    </Grid>
                </Grid>
            );
            case 1:
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={8}>
                        <form onSubmit={handleResumeUpload}>
                            <Typography variant="body1" gutterBottom>Upload Resume</Typography>
                            <TextField type="file" name="resume" variant="outlined" margin="dense" onChange={handleResume}/>
                            <Button type="submit" variant="contained" color="secondary">Upload</Button> 
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Typography variant="body1" component="b" gutterBottom>Why should we hire you?</Typography>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            type="text"
                            multiline
                            rows={6}
                            value={hire}
                            onChange={e=>setHire(e.target.value)}
                            placeholder="write your answer here. Minimum words should be 50."
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography variant="body1" component="b" gutterBottom>Peferred mode of work?</Typography>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            select
                            placeholder="Select"
                            value={mode}
                            onChange={e=>setMode(e.target.value)}
                        >
                            <MenuItem value="OFC">Office</MenuItem>
                            <MenuItem value="WFH">Work from Home</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Typography variant="body1" component="b" gutterBottom>About yourself</Typography>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            type="text"
                            multiline
                            rows={6}
                            value={about}
                            onChange={e=>setAbout(e.target.value)}
                            placeholder="write your answer here. Minimum words should be 50."
                        />
                    </Grid>
                </Grid>
            )
            default:
            return 'Unknown step';
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const [hire,setHire] = useState('');
    const [about,setAbout] = useState('');
    const [resume,setResume] = useState('');
    const [mode,setMode] = useState('');
    const steps = getSteps();
    const dispatch = useDispatch();
    const {dir} = useSelector(selectorApplyJob);

    const handleNext = () => {
        activeStep === steps.length - 1 ? handleApply() : setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleApply = () => {
        if(resume.length === 0){
            alert('Resume is not uploaded!');
            return;
        }
        if(hire === null || hire === "" || about=== null || about === "" || mode=== null || mode === ""){
            alert("Each section is manadatory");
            return;
        }
        const details = {
            hire : hire,
            about : about,
            candidateId : localStorage.getItem('id'),
            jobId : data.id,
            resume : dir,
            mode : mode,
            name : localStorage.getItem('name')
        }

        dispatch(applyjob(details));
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
                        <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Apply to {data && data.company}</Typography>
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                        <Typography>{getStepContent(index)}</Typography>
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                style={{margin:'10px'}}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                style={{margin:'10px'}}
                            >
                                {activeStep === steps.length - 1 ? 'Apply' : 'Next'}
                            </Button>
                            </div>
                        </div>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
            </DialogContent>
        </Dialog>
    );
}

export default ApplyJob;