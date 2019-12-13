import {withStyles} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";

let LoginButton = withStyles(theme => ({
    root: {
        color: '#ffffff',
        background: 'linear-gradient(90deg, #0442D0 0%, #1D8CFF 100%)',
        '&:hover': {
            background: 'linear-gradient(90deg, #0442D0 0%, #1D8CFF 100%)',
        },
    },
}))(Fab);

export {LoginButton};