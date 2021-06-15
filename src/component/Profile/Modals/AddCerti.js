import React,{useState} from "react";
import { Dialog,TextField,DialogContent,DialogTitle,DialogActions,Button,Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addCerti,updateCerti } from "./Modal.slice";
import { nanoid } from "@reduxjs/toolkit";

const AddCerti = ({open,setOpen,id,data}) => {
    const dispatch = useDispatch();
    const [school,setSchool] = useState(id ==="update" && data ? data.issuedBy : '');
    const [degree,setDegree] = useState(id ==="update" && data ? data.link : '');
    const [startYear,setStartYear] = useState(id ==="update" && data ? data.startYear : '');
    const [endYear,setEndYear] = useState(id ==="update" && data ? data.endYear : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const details = {
            'id':data.id ? data.id : nanoid().slice(0,6).toLowerCase(),
            'issuedBy':school,
            'link':degree,
            'startYear':startYear,
            'endYear':endYear,
            'candidate_id':localStorage.getItem('id')
        }
        if(id !== "update"){
            dispatch(addCerti(details));
            return;
        }
        dispatch(updateCerti(details));
    }

    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            maxWidth="md">
                <DialogTitle>
                    {
                        id === "update" ? "Update Certification & Licenses " : "Add Certification & Licenses "
                    }
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="Issued By"
                                margin="dense"
                                variant="outlined"
                                helperText="write full name for more outreach."
                                onChange={(e)=>setSchool(e.target.value)}
                                required
                                fullWidth
                                value={school}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="Link"
                                margin="dense"
                                variant="outlined"
                                onChange={(e)=>setDegree(e.target.value)}
                                required
                                fullWidth
                                value={degree}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                type="month"
                                label="Validity From"
                                margin="dense"
                                variant="outlined"
                                onChange={(e)=>setStartYear(e.target.value)}
                                required
                                fullWidth
                                InputLabelProps={{shrink:true}}
                                helperText="MM-YYYY"
                                value={startYear}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                type="month"
                                label="Valid Till"
                                margin="dense"
                                variant="outlined"
                                onChange={(e)=>setEndYear(e.target.value)}
                                required
                                fullWidth
                                helperText="MM-YYYY"
                                InputLabelProps={{shrink:true}}
                                value={endYear}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="reset" variant="text" color="primary">Clear</Button>
                    <Button type="submit" variant="contained" color="secondary">{ id === "update" ? "Update" : "Add"}</Button>
                </DialogActions>
                </form>
        </Dialog>
    )
}

export default AddCerti;