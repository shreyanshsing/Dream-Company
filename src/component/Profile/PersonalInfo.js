import Img from "../Candidate/business.png";
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import React, { useState,useEffect } from "react";
import {Grid,Avatar,Typography,IconButton, Link,Button,Divider,Chip,makeStyles,Collapse,Box} from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UpdateProfile from "./Modals/UpdateImg";
import { useSelector,useDispatch } from "react-redux";
import { deleteCerti, deleteEducation, fetchCandidate, getImg, selectorModal } from "./Modals/Modal.slice";
import UpdateBasic from "./Modals/UpdateBasic";
import AddEdu from "./Modals/AddEdu";
import DeleteIcon from '@material-ui/icons/Delete';
import AddExp from "./Modals/AddExp";
import AddCerti from "./Modals/AddCerti";
import AddPro from "./Modals/AddProject";
import AddSkill from "./Modals/AddSkill";

const styles = makeStyles(theme=>({
    root:{
        padding:'1.5rem'
    },
    profile:{
        width:theme.spacing(15),
        height:theme.spacing(15),
        position:'absolute',
        top:'-50px',
        marginLeft:'5rem',
        background:'white',
        boxShadow:'3px 3px 5px #9966ff',
        zIndex:'10',
        objectFit:'cover'
    },
    iconBtn:{
        background:theme.palette.secondary.main,
        boxShadow:'3px 3px 5px #9966ff',
        '&:hover':{
            background:theme.palette.primary.main,
            color:theme.palette.secondary.main
        }
    },
    content:{
        padding:'0px',
        boxShadow:'3px 3px 5px lightgrey',
        borderRadius:'20px',
        marginTop:'5rem',
        position:'relative'
    },
    background:{
        padding:'3rem',
        background:'linear-gradient(9deg,#0077b3,#9966ff)',
        borderRadius:'20px 20px 0px 0px',
    },
    background1:{
        padding:'1.5rem',
        background:'linear-gradient(9deg,#0077b3,#9966ff)',
        borderRadius:'0px 0px 20px 20px',
        justifyContent:'center',
        display:'flex'
    },
    info:{
        width:'100%',
        background:'white',
        padding:'1rem'
    },
    chip:{
        marginRight:'0.5rem',
        padding:'0.2rem'
    }
}))

const PersonalInfo = () => {
    const dispatch = useDispatch();
    const {img,candidate} = useSelector(selectorModal)
    const [collapse,setCollapse] = useState(false);
    const [eduId,setEduId] = useState('');
    const [data,setData] = useState({});
    const classes = styles();
    const [openImg,setOpenImg] = useState(false);
    const [openBasic,setOpenBasic] = useState(false);
    const [openEdu,setOpenEdu] = useState(false);
    const [openExp,setOpenExp] = useState(false);
    const [openCerti,setOpenCerti] = useState(false);
    const [openPro,setOpenPro] = useState(false);
    const [openSkill,setOpenSkill] = useState(false);

    console.log(candidate)

    useEffect(()=>{
        dispatch(getImg(localStorage.getItem('email')));
        dispatch(fetchCandidate(localStorage.getItem('id')));
    },[dispatch]);

    const handleEduAdd = () => {
        setEduId('add');
        setOpenEdu(true);
    }

    const handleEduUpdate = (e) => {
        setData(e);
        setEduId('update');
        setOpenEdu(true);
    }

    const handleEduDelete = (e) => {
        dispatch(deleteEducation({id:localStorage.getItem("id"),e_id:e}))
    }

    const handleExpAdd = () => {
        setEduId('add');
        setOpenExp(true);
    }

    const handleExpUpdate = (e) => {
        setData(e);
        setEduId('update');
        setOpenExp(true);
    }

    const handleExpDelete = (e) => {
        dispatch(deleteEducation({id:localStorage.getItem("id"),e_id:e}))
    }

    const handleCertiAdd = () => {
        setEduId('add');
        setOpenCerti(true);
    }

    const handleCertiUpdate = (e) => {
        setData(e);
        setEduId('update');
        setOpenCerti(true);
    }

    const handleCertiDelete = (e) => {
        dispatch(deleteCerti({id:localStorage.getItem("id"),e_id:e}))
    }

    const handleProjectAdd = () => {
        setEduId('add');
        setOpenPro(true);
    }

    const handleProjectUpdate = (e) => {
        setData(e);
        setEduId('update');
        setOpenPro(true);
    }

    const handleProjectDelete = (e) => {
        dispatch(deleteCerti({id:localStorage.getItem("id"),e_id:e}))
    }

    const handleSkillAdd = () => {
        setEduId('add');
        setOpenSkill(true);
        setData(candidate.skills)
    }

    return(
        <div className={classes.content}>
            <Avatar className={classes.profile} src={img ? URL.createObjectURL(new Blob([img.buffer], { type: 'image/png' })) : Img} alt="?"/>
        <div className={classes.background}>
            <Typography variant="caption" component="a" onClick={()=>setOpenImg(true)} style={{color:'white',float:'right'}}><u>Edit profile photo</u></Typography>
        </div>
        <div className={classes.info}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Typography variant="h5"><b><u>{`${candidate.fname} ${candidate.lname}`}</u></b>
                    <br/><small>{candidate.occupation}</small></Typography>
                </Grid>
                <Grid item sm={4}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>{candidate.address && `${JSON.parse(candidate.address).city}, ${JSON.parse(candidate.address).state}, ${JSON.parse(candidate.address).country}(${JSON.parse(candidate.address).pin})`}</Typography>
                </Grid>
                <Grid item sm={8}></Grid>
                <Grid item sm={4}>
                    <Typography variant="body2">Mobile No<ChevronRightRoundedIcon fontSize="small" color="primary"/>+91-{candidate.mobile}</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant="body2"><MailIcon style={{color:'maroon'}}/><ChevronRightRoundedIcon fontSize="small" color="primary"/>{candidate.email}</Typography>
                </Grid>
                <Grid item sm={2}>
                    <Typography variant="body2"><LinkedInIcon style={{color:'blue'}}/><ChevronRightRoundedIcon fontSize="small" color="primary"/><Link href={candidate.linkedIn}>Visit</Link></Typography>
                </Grid>
                <Grid item sm={10}>
                    <Typography variant="h6" gutterBottom>About</Typography>
                    <Typography variant="subtitle1">
                        {candidate.about}
                    </Typography>
                </Grid>
                <Grid item sm={2} style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                    <Button type="button" variant="text" color="primary" onClick={()=>setOpenBasic(true)} endIcon={<EditIcon color="primary"/>}>Edit</Button>
                </Grid>
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={12}>
                <Collapse className={classes.info} in={collapse}>
                    <Grid container spacing={1}>
                <Grid item sm={10}>
                    <Typography variant="h6" gutterBottom>Experience</Typography>
                </Grid>
                <Grid item sm={2}>
                    <IconButton onClick={handleExpAdd}>
                        <AddIcon color="primary"/>
                    </IconButton>
                </Grid>
                {
                    candidate.experience && candidate.experience.length>0 ?
                    candidate.experience.map(item=>
                        <>
                            <Grid item sm={10}>
                                <Typography variant="subtitle1">
                                    <b>{item.company}</b><br/>
                                    {item.role} - {item.type}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {item.startYear} - {item.endYear} | {item.mode}
                                </Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <IconButton onClick={()=>handleExpUpdate(item)}>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton onClick={()=>handleExpDelete(item.id)}>
                                    <DeleteIcon color="primary"/>
                                </IconButton>
                            </Grid>
                        </>):
                        <Box style={{border:'1px dotted lightgrey',width:'100%',padding:'0.5rem'}}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>This section is empty</Typography>
                        </Box>

                }
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={10}>
                    <Typography variant="h6" gutterBottom>Education</Typography>
                </Grid>
                <Grid item sm={2}>
                    <IconButton onClick={handleEduAdd}>
                        <AddIcon color="primary"/>
                    </IconButton>
                </Grid>
                {
                    candidate.education && candidate.education.length>0 ?
                    candidate.education.map(item=>
                        <>
                        <Grid item sm={10}>
                            <Typography variant="subtitle1">
                                <b>{item && item.school}</b><br/>
                                {item && item.degree},{item && item.stream}<br/>
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {item && item.startYear} - {item && item.endYear} | Current Percentage {item && item.percentage}
                            </Typography>
                        </Grid>
                        <Grid item sm={2}>
                            <IconButton onClick={()=>handleEduUpdate(item)}>
                                <EditIcon color="primary"/>
                            </IconButton>
                            <IconButton onClick={()=>handleEduDelete(item.id)}>
                                <DeleteIcon color="primary"/>
                            </IconButton>
                        </Grid>
                        </>
                    ) : 
                    <Box style={{border:'1px dotted lightgrey',width:'100%',padding:'0.5rem'}}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>This section is empty</Typography>
                    </Box>
                }
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={10}>
                    <Typography variant="h6" gutterBottom>Licenses & certifications</Typography>
                </Grid>
                <Grid item sm={2}>
                    <IconButton onClick={handleCertiAdd}>
                        <AddIcon color="primary"/>
                    </IconButton>
                </Grid>
                {
                    candidate.certifications && candidate.certifications.length>0 ? 
                    candidate.certifications.map(item=>
                        <>
                            <Grid item sm={10}>
                                <Typography variant="subtitle1">
                                    <b><a href={item.link} rel="noreferrer" target="_blank">{item.issuedBy}</a></b>
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Validity - {item.startYear} to {item.endYear}
                                </Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <IconButton onClick={()=>handleCertiUpdate(item)}>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton onClick={()=>handleCertiDelete(item.id)}>
                                    <DeleteIcon color="primary"/>
                                </IconButton>
                            </Grid>
                        </>):
                        <Box style={{border:'1px dotted lightgrey',width:'100%',padding:'0.5rem'}}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>This section is empty</Typography>
                        </Box>
                }
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={10}>
                    <Typography variant="h6" gutterBottom>Skills</Typography>
                </Grid>
                <Grid item sm={2}>
                    <IconButton onClick={handleSkillAdd}>
                        <AddIcon color="primary"/>
                    </IconButton>
                </Grid>
                <Grid item sm={10}>
                    {
                        candidate.skills && candidate.skills.length>0 ?
                        candidate.skills.map(item=>
                            <>
                                <Chip color="secondary" className={classes.chip} label={item}/>
                            </>):
                            <Box style={{border:'1px dotted lightgrey',width:'100%',padding:'0.5rem'}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>This section is empty</Typography>
                            </Box>
                    }
                </Grid>
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={10}>
                    <Typography variant="h6" gutterBottom>Projects & Works</Typography>
                </Grid>
                <Grid item sm={2}>
                    <IconButton onClick={handleProjectAdd}>
                        <AddIcon color="primary"/>
                    </IconButton>
                </Grid>
                {
                    candidate.projects && candidate.projects.length>0 ? 
                    candidate.projects.map(item=>
                        <>
                            <Grid item sm={10}>
                                <Typography variant="subtitle1">
                                    <b><a href={item.link} rel="noreferrer" target="_blank">{item.title}</a></b>
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Period - {item.startYear} to {item.endYear}
                                </Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <IconButton onClick={()=>handleProjectUpdate(item)}>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton onClick={()=>handleProjectDelete(item.id)}>
                                    <DeleteIcon color="primary"/>
                                </IconButton>
                            </Grid>
                        </>):
                        <Box style={{border:'1px dotted lightgrey',width:'100%',padding:'0.5rem'}}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>This section is empty</Typography>
                        </Box>
                }
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
                </Grid>
                </Collapse>
                </Grid>
            </Grid>
        </div>
        <div className={classes.background1}>
            <IconButton className={classes.iconBtn} onClick={()=>setCollapse(!collapse)}>
                {
                    collapse ? <ExpandLessIcon/> : <ExpandMoreIcon />
                }
            </IconButton>
        </div>
        {
            openImg ? <UpdateProfile open={openImg} setOpen={setOpenImg} /> : null
        }
        {
            openBasic ? <UpdateBasic open={openBasic} setOpen={setOpenBasic} data={candidate}/> : null
        }
        {
            openEdu ? <AddEdu open={openEdu} setOpen={setOpenEdu} data={data} id={eduId}/> : null
        }
        {
            openExp ? <AddExp open={openExp} setOpen={setOpenExp} data={data} id={eduId}/> : null
        }
        {
            openCerti ? <AddCerti open={openCerti} setOpen={setOpenCerti} data={data} id={eduId}/> : null
        }
        {
            openPro ? <AddPro open={openPro} setOpen={setOpenPro} data={data} id={eduId}/> : null
        }
        {
            openSkill ? <AddSkill open={openSkill} setOpen={setOpenSkill} data={data} id={eduId}/> : null
        }
    </div>
    )
}

export default PersonalInfo;