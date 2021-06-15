import React from "react";
import {Container,Grid,makeStyles,Typography,Hidden, Box} from "@material-ui/core";
import CardCandidate from "../Card/CardCandidate";
import CardRecruiter from "../Card/CardRecruiter";
import img from "./having-job.png";
import {ReactComponent as Svg1} from "./icon1.svg";
import {ReactComponent as Svg2} from "./icon2.svg";
import {ReactComponent as Svg3} from "./icon3.svg";
import {ReactComponent as Svg4} from "./icon4.svg";
import {ReactComponent as Svg5} from "./icon5.svg";
import {ReactComponent as Svg6} from "./icon6.svg";
import {ReactComponent as Svg7} from "./icon7.svg";
import {ReactComponent as Svg8} from "./icon8.svg";
import {ReactComponent as Svg9} from "./icon9.svg";

const style = makeStyles(theme => ({
    root:{
        padding:'2rem',
        maxWidth:'100vw',
        overflowWrap:'break-word'
    },
    info:{
        background:'linear-gradient(45deg,#0077b3,#009933)',
        color:'whitesmoke',
        padding:'1.5rem',
        borderRadius:'0px 0px 15px 15px',
        textAlign:'center',
        fontWeight:500,
        fontSize : '1rem'
    },
    name:{
        color:'#0077b3',
        fontWeight:1000,
        borderBottom:'2px solid grey'
    },
    img:{
        width:'100%',
        height:'auto'
    }
}))
const MainPage = () => {
    const classes = style()
    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h4" className={classes.name} gutterBottom>
                        Dream&#9889;<Hidden only={['md','lg','xl']}><br/></Hidden>Company<small>.com</small>
                    </Typography>
                </Grid>
                
                <Hidden only={['xs','sm','md']}>
                    <Grid item sm={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Svg4/>
                        <Svg5/>
                        <Svg6/>
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={4}>
                    <Box className={classes.img}>
                        <img className={classes.img} src={img} alt="pro"/>
                    </Box>
                    <Typography variant="body2" className={classes.info} gutterBottom>
                        Now finding your dream company is easy, just few steps and you are done!
                    </Typography>
                </Grid>
                <Hidden only={['xs','sm','md']}>
                    <Grid item sm={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Svg7/>
                        <Svg8/>
                        <Svg9/>
                    </Grid>
                </Hidden>

                <Hidden only={['xs','sm']}>
                    <Grid item sm={1}></Grid>
                </Hidden>
                <Grid item xs={12} sm={3}>
                    <CardCandidate/>
                </Grid>
                <Hidden only={['xs','sm']}>
                    <Grid item sm={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Svg1/>
                        <Svg2/>
                        <Svg3/>
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={3}>
                    <CardRecruiter />
                </Grid>
                <Hidden only={['xs','sm']}>
                    <Grid item sm={1}></Grid>
                </Hidden>
            </Grid>
        </Container>
    )
}

export default MainPage;