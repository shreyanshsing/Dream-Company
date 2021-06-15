import React,{useState} from "react";
import { Dialog,TextField,DialogContent,DialogTitle,DialogActions,Button,Grid,IconButton,Typography,AppBar,Toolbar,Hidden } from "@material-ui/core";
import { useDispatch } from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import {updateBasicDetails} from "./Modal.slice";

const UpdateBasic = ({open,setOpen,data}) => {
    const dispatch = useDispatch();
    const [fname,setFname] = useState(data.fname);
    const [lname,setLname] = useState(data.lname);
    const [email,setEmail] = useState(data.email);
    const [num,setNum] = useState(data.mobile);
    const [linkedIn,setLinkedIn] = useState(data.linkedIn);
    const [city,setCity] = useState(data.address && JSON.parse(data.address).city);
    const [state,setState] = useState(data.address && JSON.parse(data.address).state);
    const [country,setCountry] = useState(data.address && JSON.parse(data.address).country);
    const [code,setCode] = useState(data.address && JSON.parse(data.address).pin);
    const [about,setAbout] = useState(data.about);
    const [occu,setOccu] = useState(data.occupation);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const details = {
            fname:fname,
            lname:lname,
            email:email,
            mobile:num,
            linkedIn:linkedIn,
            address:{
                'city':city,
                'state':state,
                'country':country,
                'pin':code
            },
            about:about,
            occupation:occu,
            id:data.id
        }
        dispatch(updateBasicDetails(details));
    }

    return(
        <Dialog
            open={open}
            maxWidth="md"
            onClose={()=>setOpen(false)}>
                <DialogTitle>
                    <Hidden only={['md','xl','lg']}>
                        <AppBar elevation={0} color="transparent">
                            <Toolbar>
                                <IconButton onClick={()=>setOpen(false)}>
                                    <CloseIcon color="primary"/>
                                </IconButton>
                                <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Update Basic Details</Typography>
                            </Toolbar>
                        </AppBar>
                    </Hidden>
                    <Hidden only={['xs','sm']}>
                        <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Update Basic Detials</Typography>
                    </Hidden>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={4}>
                            <TextField
                                type="text"
                                label="First Name"
                                margin="dense"
                                variant="outlined"
                                required
                                value={fname}
                                onChange={e=>setFname(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="text"
                                label="Last Name"
                                margin="dense"
                                variant="outlined"
                                required
                                fullWidth
                                value={lname}
                                onChange={e=>setLname(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="number"
                                label="Mobile Number"
                                margin="dense"
                                variant="outlined"
                                required
                                fullWidth
                                value={num}
                                onChange={e=>setNum(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="email"
                                label="Email"
                                margin="dense"
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="text"
                                label="LinkedIn"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                value={linkedIn}
                                onChange={e=>setLinkedIn(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="text"
                                label="Occupation"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                value={occu}
                                onChange={e=>setOccu(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                type="text"
                                label="City"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                value={city}
                                onChange={e=>setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                type="text"
                                label="State"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                value={state}
                                onChange={e=>setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                type="text"
                                label="Country"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                value={country}
                                onChange={e=>setCountry(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                type="number"
                                label="Pin/Zip Code"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                value={code}
                                onChange={e=>setCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                multiline
                                rows={5}
                                type="text"
                                label="About"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                value={about}
                                onChange={e=>setAbout(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="reset" variant="text" color="primary">Clear</Button>
                    <Button type="submit" variant="contained" color="secondary">Update</Button>
                </DialogActions>
                </form>
        </Dialog>
    )
}

export default UpdateBasic;