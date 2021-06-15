import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette :{
        primary: {
            main : '#009688'
        },
        secondary: {
            main : '#ffc400'
        },
        text:{
            primary:'rgba(0, 0, 0, 0.7)',
            secondary:'rgba(0, 0, 0, 0.5)'
        }
    },
    typography:{
        body1:{
            fontSize:'14px',
            fontWeight:100
        },
        body2:{
            fontSize:'15px',
            fontWeight:300
        }
    }
})

export default theme;