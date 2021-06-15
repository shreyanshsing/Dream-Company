import React ,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IconButton } from "@material-ui/core";

const styles = makeStyles(theme=>({
    toTop:{
        zIndex : 2,
        position:'fixed',
        bottom:'2vh',
        backgroundColor:theme.palette.secondary.main,
        "&:hover, &.Mui-focusVisible" : {
            transition : '0.3s'
        },
        right:'2%'
    }
}))

const Scroll = ({showBelow}) => {
    const classes = styles();
    const [show,setShow] = useState(showBelow ? false : true);

    const handleScroll = () => {
        if(window.pageXOffset > showBelow){
            if(!show) setShow(true);
        }
        else{
            if(show) setShow(false);
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({top:0,behavior:'smooth'});
    }

    useEffect(()=>{
        if(showBelow){
            window.addEventListener('scroll',handleScroll)
            return () => window.removeEventListener('scroll',handleScroll)
        }
    })

    return(
        <div aria-label="scrollbar">
            <IconButton onClick={handleClick} className={classes.toTop}>
                <ExpandLessIcon color="primary"/>
            </IconButton>

        </div>
    )
}

export default Scroll;
