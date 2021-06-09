import React from "react";
import { Document, Page } from '@react-pdf/renderer';
import {pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Mydoc = ({data}) => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);

    const  onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    return(
        <div>
            <Document
                file={{
                    data:data
                }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    )
}

export default Mydoc;