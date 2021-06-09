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
    }
})

export default theme;