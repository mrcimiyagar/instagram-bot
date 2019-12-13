import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
    root: {
        background: "transparent"
    },
    input: {
        '&:hover': {
            borderBottom: '1px solid #1976d2',
        },
        '&:focus-within': {
            borderBottom: '1px solid #1976d2',
        },
        borderBottom: '2px solid #fff'
    }
};

function TextBox(props) {

    const {classes} = props;

    let inputProps = props.InputProps;

    if (inputProps !== undefined && inputProps !== null)
        inputProps.className = classes.input;

    return (
        <TextField
            value={props.value}
            label={props.label}
            InputLabelProps={props.InputLabelProps}
            className={classes.root}
            InputProps={inputProps}
            style={props.style}
        />
    );
}

TextBox.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextBox);