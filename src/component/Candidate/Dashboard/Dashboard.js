import React,{useState,useEffect} from "react";
import {Button, Container,Grid,IconButton,makeStyles,Typography} from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import {Carousel} from "react-bootstrap";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const style = makeStyles(theme=>({
    root:{
        padding:'2rem'
    }
}))

const DashboardCandidate = () => {
    const classes = style();
    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid item sm={12}>
                <Grid item sm={12}>
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
                <Grid item sm={12}>
                    <Carousel
                        prevIcon={<ChevronLeftIcon/>}
                        nextIcon={<ChevronRightIcon/>}>
                        <Carousel.Item>
                            
                        </Carousel.Item>
                    </Carousel>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashboardCandidate;