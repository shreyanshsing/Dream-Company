import React,{useState} from "react";
import {AppBar,Toolbar,Typography,makeStyles,IconButton, Hidden,Avatar,Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";

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
    const history = useHistory();
    const [openMenu,setOpenMenu] = useState(null);

    const handleOpenMenu = (e) => {
        setOpenMenu(e.currentTarget);
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return(
        <AppBar elevation={3} color="primary" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Hidden only={['lg','xl']}>
                    <IconButton>
                        <MenuIcon style={{fill:'white'}}/>
                    </IconButton>
                </Hidden>
                <Typography variant="h5" gutterBottom>DC.com</Typography>
                <IconButton onClick={handleOpenMenu}>
                    <Avatar/>
                </IconButton>
                <Menu 
                    anchorEl={openMenu}
                    open={Boolean(openMenu)}
                    onClose={()=>setOpenMenu(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}>
                    <MenuItem value="profile">
                        Manage Profile
                    </MenuItem>
                    <MenuItem value="profile" onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderRec;