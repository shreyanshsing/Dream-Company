import React,{useEffect,useState} from "react";
import {Button, Container,Grid,makeStyles,Typography} from "@material-ui/core";
import HeaderRec from "../../Header/HeaderRec";
import PostJob from "../Dialog/PostJob";
import Table from "material-table";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import {useDispatch,useSelector} from "react-redux";
import {fetchjob, selectorDashboard} from "./Dashboard.slice";
import {useHistory} from "react-router-dom";

const style = makeStyles(theme=>({
    root:{
        padding:'1rem'
    }
}))

const DashboardRecuiter = () => {
    const classes = style();
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const {jobs} = useSelector(selectorDashboard);
    const history = useHistory();

    const cols = [
        {title:'Job title',field:'title'},
        { 
            title:'Posted on',
            field:'createdOn',
            render : rowData => rowData.createdOn ? new Date(rowData.createdOn).getDate() +"-"+ new Date(rowData.createdOn).getMonth() +"-"+ new Date(rowData.createdOn).getFullYear() : ''
        },
        { 
            title:'Applicants',
            field:'applicants', 
            render: rowData=> rowData.applicants ? rowData.applicants : 0
        },
        {title:'Status',field:'status'}
    ]

    useEffect(()=>{
        const email = localStorage.getItem('email');
        dispatch(fetchjob(email))
    },[dispatch])

    return(
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} >
                    <HeaderRec/>
                </Grid>
                <Grid item xs={12} sm={12}></Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Post new jobs/openings
                    </Typography>
                    <Button variant="contained" color="primary" onClick={()=>setOpen(true)}>Create</Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Table
                        columns={cols}
                        data={jobs.length>0 ? jobs.map(o=>({...o})):[]}
                        title="Track Progress"
                        options={{
                            search:false,
                            actionsColumnIndex:-1,
                            detailPanelColumnAlignment:'right',
                            headerStyle:{
                                color:'whitesmoke',
                                background:'#008ae6'
                            }
                        }}
                        actions={[
                            {
                                icon : ()=><AspectRatioIcon/>,
                                tooltip : 'See Details',
                                onClick : (event,rowData) => {
                                    history.push({
                                        pathname:'/detail-board',
                                        state : rowData
                                    })
                                }
                            }
                        ]}
                        />
                </Grid>
            </Grid>
            {
                open ? <PostJob open={open} setOpen={setOpen}/> : null
            }
        </Container>
    )
}

export default DashboardRecuiter;