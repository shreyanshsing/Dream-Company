import React,{useState} from "react";
import {AppBar,Toolbar,Typography,makeStyles,IconButton, Hidden,Avatar,Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";

const style = makeStyles(theme=>({
    appbar:{
        width:'100%',
        padding:'0.5rem',
        backgroundImage:'linear-gradient(9deg,#0077b3,#9966ff)'
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

    const handleProfile = () => {
        history.push('/user-profile')
    }

    return(
        <AppBar elevation={3} className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Hidden only={['lg','xl']}>
                    <IconButton>
                        <MenuIcon style={{fill:'white'}}/>
                    </IconButton>
                </Hidden>
                <Typography variant="h5">DC.com<br/>
                <Typography variant="caption">Find the right place for yourself.</Typography></Typography>
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
                    <MenuItem value="profile" onClick={handleProfile}>
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