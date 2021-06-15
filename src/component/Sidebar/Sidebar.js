import React,{useState} from "react";
import { List,ListItem,Button,Typography,Checkbox,makeStyles,Slider,TextField,MenuItem,IconButton } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const styles = makeStyles(theme=>({
    root:{
        margin:'0.5rem',
        padding:'0.7rem',
        boxShadow:'3px 3px 5px lightgrey',
        borderRadius:'10px',
        background:'white',
        position:'absolute'
    }
}))

const marks = [
    {
        value: 0,
        label: '0K',
    },
    {
        value: 20,
        label: '20K',
    },
    {
        value: 40,
        label: '40K',
    },
    {
        value: 60,
        label: '60K',
    },
    {
        value: 80,
        label: '80K',
    },
    {
        value: 100,
        label:'100K',
    }
  ];

function valuetext(value) {
    return `${value}K`;
}

const Sidebar = () => {
    const classes = styles();
    const [checked,setChecked] = useState(true);
    const [value, setValue] = useState([0,10]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return(
        <List className={classes.root}>
            <ListItem style={{justifyContent:'center'}}>
                <Button
                    endIcon={<FilterListIcon/>}
                    variant="text"
                    color="primary"
                >
                    Filter
                </Button>
            </ListItem>
            <ListItem>
                <Typography variant="body1" gutterBottom>
                    <Checkbox
                        checked={checked}
                        onChange={()=>setChecked(!checked)}
                        name="checked"
                        color="primary"
                    />
                    Select according to your preferrence
                </Typography>
            </ListItem>
            <ListItem dense>
                <Typography variant="body1" gutterBottom>Expected minimum pay in &#8377; </Typography>
            </ListItem>
            <ListItem dense>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    step={10}
                    marks={marks}
                />
            </ListItem>
            <ListItem>
                <TextField 
                    select
                    label="Employment tpye"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                >
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="temporaray">Part-time</MenuItem>
                    <MenuItem value="permanent">Full-time</MenuItem>
                </TextField>
            </ListItem>
            <ListItem>
                <TextField 
                    label="Location"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
                <Button variant="contained" disabled>OR</Button>
            </ListItem>
            <ListItem>
                <TextField 
                    label="Company"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                        startAdornment:
                            <IconButton>
                                <SearchRoundedIcon style={{color:'rgba(0,0,0,0.6)'}}/>
                            </IconButton>
    
                    }}
                />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
                <Button type="button" variant="text" style={{color:'rgba(0,0,255,0.4)',fontWeight:700}}>Clear All</Button>
            </ListItem>
        </List>
    )
}

export default Sidebar