import React,{useState} from "react";
import { Dialog,DialogContent,DialogTitle,DialogActions,Button,Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addSkill } from "./Modal.slice";
import { nanoid } from "@reduxjs/toolkit";
import ChipInput from "material-ui-chip-input";

const AddSkill = ({open,setOpen,id,data}) => {

    const dispatch = useDispatch();
    const [skills,setSkills] = useState( data ? data : []);

    const handleAddChip = (chip) => {
        setSkills(prev=>[...prev,chip]);
    }

    const handleDeleteChip = (chip,index) => {
        const arr = skills.filter(item=> item !== chip);
        setSkills(arr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const details = {
            'id':data.id ? data.id : nanoid().slice(0,6).toLowerCase(),
            'skills':skills,
            'candidate_id':localStorage.getItem('id')
        }
        console.log(details)
        dispatch(addSkill(details));
    }

    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            maxWidth="md">
                <DialogTitle>
                    {
                        id === "update" ? "Update Skills" : "Add Skills "
                    }
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                        <ChipInput
                            value={skills}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                            allowDuplicates={false}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            fullWidthInput
                            helperText="Please press enter after every skill"
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

export default AddSkill;