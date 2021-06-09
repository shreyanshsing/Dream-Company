import React, {useState} from "react";
import {Card,CardHeader,CardContent,CardActions,Button, Typography,makeStyles} from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ApplyJob from "../Candidate/ApplyPage/ApplyPage";

const style = makeStyles(theme => ({
    root:{
        borderRadius : '15px',
        paddingTop:'0.5rem',
        paddingLeft:'0.5rem',
        paddingRight:'0.5rem'
    }
}))

const CardJob = ({data}) => {
    const [open,setOpen] = useState(false);
    const classes = style();

    return(
        <>
        <Card className={classes.root} raised>
            <CardHeader
                title={data && data.title}
                subheader="be an early applicant"/>
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    Posted on - {data && new Date(data.createdOn).getDate() +"-"+ new Date(data.createdOn).getMonth() +"-"+ new Date(data.createdOn).getFullYear()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Expexcted pay - {data && JSON.parse(data.pay).min} to {data && JSON.parse(data.pay).max}
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
                    color="primary"
                    endIcon={<BookmarkIcon/>}>
                    Save
                </Button>
                <Button 
                    type="button"  
                    variant="text" 
                    color="primary"
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