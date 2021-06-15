import React,{useState} from "react";
import { Dialog,TextField,DialogContent,DialogTitle,DialogActions,Button,Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addEducation,updateEducation } from "./Modal.slice";
import { nanoid } from "@reduxjs/toolkit";

const AddEdu = ({open,setOpen,id,data}) => {
    console.log(data)
    const dispatch = useDispatch();
    const [school,setSchool] = useState(id ==="update" && data ?data.school : '');
    const [degree,setDegree] = useState(id ==="update" && data ?data.degree : '');
    const [stream,setStream] = useState(id ==="update" && data ?data.stream : '');
    const [startYear,setStartYear] = useState(id ==="update" && data ?data.startYear : '');
    const [endYear,setEndYear] = useState(id ==="update" && data ?data.endYear : '');
    const [percentage,setPercentage] = useState(id ==="update" && data ?data.percentage : '')

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const details = {
            'id':data.id ? data.id : nanoid().slice(0,6).toLowerCase(),
            'school':school,
            'degree':degree,
            'stream':stream,
            'startYear':startYear,
            'endYear':endYear,
            'percentage':percentage,
            'candidate_id':localStorage.getItem('id')
        }
        if(id !== "update"){
            dispatch(addEducation(details));
            return;
        }
        dispatch(updateEducation(details));
    }

    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            maxWidth="md">
                <DialogTitle>
                    {
                        id === "update" ? "Update Education" : "Add Education"
                    }
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="College/School"
                                margin="dense"
                                variant="outlined"
                                helperText="write full name for more outreach."
                                onChange={(e)=>setSchool(e.target.value)}
                                required
                                fullWidth
                                value={school}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="text"
                                label="Degree"
                                margin="dense"
                                variant="outlined"
                                onChange={(e)=>setDegree(e.target.value)}
                                required
                                fullWidth
                                value={degree}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="text"
                                label="Major Field/Stream"
                                margin="dense"
                                variant="outlined"
                                onChange={(e)=>setStream(e.target.value)}
                                required
                                fullWidth
                                value={stream}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                type="number"
                                label="SGPA/Percentage"
                                margin="dense"
                                variant="outlined"
                                onChange={(e)=>setPercentage(e.target.value)}
                                required
                                helperText="without % sign."
                                fullWidth
                                value={percentage}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                type="month"
                                label="Start Year"
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
                                label="End Year"
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

export default AddEdu;