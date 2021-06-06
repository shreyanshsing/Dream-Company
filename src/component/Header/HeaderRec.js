import React from "react";
import {AppBar,Toolbar,Typography,makeStyles,IconButton, Hidden,Avatar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const style = makeStyles(theme=>({
    appbar:{
        width:'100%',
    },
    toolbar:{
        flexGrow:1,
        justifyContent:'space-between',
        alignItems:'center'
    }
}))

const HeaderRec = () => {
    const classes = style();
    return(
        <AppBar elevation={3} color="secondary" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Hidden only={['lg','xl']}>
                    <IconButton>
                        <MenuIcon style={{fill:'white'}}/>
                    </IconButton>
                </Hidden>
                <Typography variant="h5" gutterBottom>DC.com</Typography>
                <IconButton>
                    <Avatar/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderRec;