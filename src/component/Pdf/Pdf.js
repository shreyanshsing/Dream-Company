import React from "react";
import {Dialog,DialogTitle,DialogContent, AppBar, Toolbar,IconButton, Typography,makeStyles, DialogActions, Button} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Document, Page } from 'react-pdf';
import { useSelector } from "react-redux";
import GetAppIcon from '@material-ui/icons/GetApp';
import { selectorDashboard } from "../Recuiter/Dashboard/Dashboard.slice";
import {pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const style = makeStyles(theme=>({
    toolbar:{
        flexGrow:1,
        justifyContent:'flex-start'
    },
    root:{
        width:'100%',
        margin:'10px',
        marginTop:'30px',
        padding:'1rem'
    }
}))

const Pdf = ({open,setOpen}) => {
    const classes = style();
    const {pdf} = useSelector(selectorDashboard);
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);

    const  onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handleDownload = () => {
        const blob = new Blob([pdf],{type : 'application/pdf'});
        let link = document.createElement('a');
        link.download = "Resume.pdf";
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }

    return(
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            fullWidth={true}
            fullScreen={true}
            maxWidth="sm">
            <DialogTitle>
                <AppBar elevation={3} color="primary">
                    <Toolbar className={classes.toolbar}>
                        <IconButton onClick={()=>setOpen(false)}>
                            <CloseIcon style={{fill:'white'}}/>
                        </IconButton>
                        <Typography variant="h6" style={{marginLeft:'10px'}} gutterBottom>Resume</Typography>
                        
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent className={classes.root}>
                <div>
                    <Document
                        file={{
                            data:pdf
                        }}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                </div>
            </DialogContent>
            <DialogActions>
                <Typography variant="body1" gutterBottom>Page {pageNumber} of {numPages}</Typography>
                <Button type="link" variant="contained" color="secondary" onClick={handleDownload} endIcon={<GetAppIcon/>}>Download</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Pdf;