import React, {useState} from "react";
import {Card,CardHeader,CardContent,CardActions,Button, Typography,makeStyles} from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ApplyJob from "../Candidate/ApplyPage/ApplyPage";
import { useDispatch } from "react-redux";
import {saveJob} from "../Candidate/Dashboard/Dashboar.slice";

const style = makeStyles(theme => ({
    root:{
        background:'linear-gradient(9deg,#0077b3,#9966ff)',
        color:'whitesmoke',
        padding:'0.5rem',
        borderRadius:'10px',
        boxShadow:'3px 3px 5px lightgrey'
    },
}))

const CardJob = ({data}) => {
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const classes = style();

    const handleSave = (data) => {
        dispatch(saveJob(data))
    }

    return(
        <>
        <Card className={classes.root}>
            <CardHeader
                title={data && data.title}
                subheader="be an early applicant"/>
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    Posted on - {data && new Date(data.createdOn).getDate() +"-"+ new Date(data.createdOn).getMonth() +"-"+ new Date(data.createdOn).getFullYear()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Expexcted pay - {data && data.pay.min} to {data && data.pay.max}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    type="button" 
                    onClick={()=>setOpen(true)} 
                    variant="contained" 
                    color="secondary"
                    endIcon={<LabelImportantIcon/>}>
                    Apply
                </Button>
                <Button 
                    type="button"  
                    variant="text" 
                    color="secondary"
                    onClick={()=>handleSave(data)}
                    endIcon={<BookmarkIcon/>}>
                    Save
                </Button>
                <Button 
                    type="button"  
                    variant="text" 
                    color="secondary"
                    endIcon={<ShareIcon/>}>
                    Share
                </Button>
            </CardActions>
        </Card>
        {
            open ? <ApplyJob open={open} setOpen={setOpen} data={data}/> : null
        }
        </>
    )
}

export default CardJob;