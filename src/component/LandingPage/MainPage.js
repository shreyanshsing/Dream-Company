import React from "react";
import {Container,Grid,makeStyles,Typography} from "@material-ui/core";
import CardCandidate from "../Card/CardCandidate";
import CardRecruiter from "../Card/CardRecruiter";

const style = makeStyles(theme => ({
    root:{
        padding:'2rem',
        maxWidth:'100vw',
        overflow:'scroll',
        overflowWrap:'break-word'
    },
    info:{
        background:theme.palette.grey[200],
        padding:'1rem',
        borderRadius:'15px',
        boxShadow:'3px 3px 5px lightgrey'
    }
}))
const MainPage = () => {
    const classes = style()
    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Typography variant="h3" gutterBottom>
                        Dream-Company<small>.com</small>
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="h6" className={classes.info} gutterBottom>
                        Now finding your dream company is easy, just few steps and you are done!
                    </Typography>
                </Grid>
                <Grid item sm={6}>
                    <CardCandidate/>
                </Grid>
                <Grid item sm={6}>
                    <CardRecruiter />
                </Grid>
            </Grid>
        </Container>
    )
}

export default MainPage;