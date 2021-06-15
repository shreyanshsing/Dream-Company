import React,{useState} from "react";
import { Dialog,TextField,DialogContent,DialogTitle,DialogActions,Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { uploadImg,getImg } from "./Modal.slice";

const UpdateProfile = ({open,setOpen}) => {
    const dispatch = useDispatch();
    const [img,setImg] = useState('');
    const [err,setErr] = useState(false);
    const handleImg = (e) => {
        const file = e.target.files[0];
        console.log(file.size)
        if(file.size>62000){
            alert("File size is large")
            setErr(true);
            return;
        }
        setImg(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(uploadImg(img));
        dispatch(getImg(localStorage.getItem('email')))
    }

    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}>
                <DialogTitle>
                    Update Profile Picture
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        type="file"
                        label="select from here"
                        InputLabelProps={{ shrink: true }}
                        margin="dense"
                        variant="outlined"
                        helperText="Max. 60KB size is allowed"
                        onChange={handleImg}
                        required
                        accept="image/*"
                        error={err}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="reset" variant="text" color="primary">Clear</Button>
                    <Button type="submit" variant="contained" color="secondary">Update</Button>
                </DialogActions>
                </form>
        </Dialog>
    )
}

export default UpdateProfile;