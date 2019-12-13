import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import clsx from "clsx";
import {Grade, Visibility, VisibilityOff} from "@material-ui/icons";
import {blue, lightBlue, green, red, yellow, purple, grey} from "@material-ui/core/colors";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {AnimatedRotation, AnimatedPosition} from 'react-declare-animate';
import PhoneIcon from '@material-ui/icons/Phone';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import EmailIcon from '@material-ui/icons/Email';
import Animate from "react-smooth";
import GraphicsHandler from './handlers/GraphicsHandler';
import Redirect from "react-router-dom/Redirect";
import Center from 'react-center';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextBox from "./controls/TextBox";
import posed from 'react-pose';
import {Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Row} from "reactstrap";
import {getMode} from "../routes";
import FilePicker from "../components/FilePicker";
import Link from "react-router-dom/Link";
import {LoginButton} from "./controls/Buttons";

let classes = {};

let useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
    }
}));

const inClasses = {
    rootInput: {
        background: 'transparent'
    },
};

function StylePreparer(props) {

    classes = useStyles();

    return (<Box/>);
}

const LoginBox = posed.div({
    mobileVisible: {
        top: '62.5%',
        transition: { type: 'spring', duration: 750 },
    },
    pcVisible: {
        top: '50%',
        transition: { type: 'spring', duration: 750 },
    },
    hidden: {
        top: '150%',
        transition: { type: 'spring', duration: 750 },
    },
});

class AuthPage extends Component {

    mobileWidth = 700;

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            loading: 0,
            signupForCardAngles: false,
            signupForFormItems: false,
            forecasts: [],
            resizeTrigger: false,
            showPassword: false,
            goHome: false
        };
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'hidden';
        GraphicsHandler.instance = new GraphicsHandler();
        this.loadingViewRef = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        setTimeout(() => {
            this.setState({
                loading: 1
            });
        }, 1000);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        GraphicsHandler.instance.width = window.innerWidth / GraphicsHandler.instance.density;
        GraphicsHandler.instance.height = window.innerHeight / GraphicsHandler.instance.density;
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    measureAuthCardHeight() {
        return this.state.width < 700 ?
            this.state.signupForFormItems ?
                800:
                500:
            this.state.signupForFormItems ?
                400 :
                350
    }

    measureAuthCardWidth() {
        return this.state.width < 700 ?
            '80%' :
            300;
    }

    render() {

        if (this.state.goHome) {
            return <Redirect to='/Admin'/>
        }

        return (
            <div style={{
                width: '100',
                height: '100vh'
            }}>
                <LoginBox style={{
                    width:  this.measureAuthCardWidth(),
                    height: this.measureAuthCardHeight(),
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                pose={this.state.loading === 1 ? this.state.width < 700 ? 'mobileVisible' : 'pcVisible' : 'hidden'}>
                    <div style={{
                        width: '100%',
                        height: 'calc(100% - ' + (window.devicePixelRatio * 72) + 'px)',
                        borderRadius: 16,
                        backgroundColor: '#27293d',
                        boxShadow: '0 1px 20px 0px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Row>
                            <Col md="12">
                                <Form style={{
                                    margin: 16
                                }}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <div
                                                    style={{
                                                        border: '1px #1D8CFF solid',
                                                        borderRadius: 8,
                                                        marginTop: 32
                                                    }}>
                                                    <input placeholder={'Username'} type={'text'} style={{
                                                        background: 'transparent',
                                                        width: '100%',
                                                        border: 'none',
                                                        padding: 12,
                                                        outline: 'none',
                                                        color: '#fff',
                                                        textAlign: 'center'
                                                    }}/>
                                                </div>
                                                <div
                                                    style={{
                                                        border: '1px #1D8CFF solid',
                                                        borderRadius: 8,
                                                        marginTop: 32
                                                    }}>
                                                    <input placeholder={'password'} type={'password'} style={{
                                                        background: 'transparent',
                                                        width: '100%',
                                                        border: 'none',
                                                        padding: 12,
                                                        outline: 'none',
                                                        color: '#fff',
                                                        textAlign: 'center'
                                                    }}/>
                                                </div>
                                                <FormControlLabel
                                                    style={{
                                                        marginTop: 16,
                                                        userSelect: false
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            color={"primary"}
                                                        />
                                                    }
                                                    label="Stay signed in"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    <Center>
                        <LoginButton
                            onClick={
                                (e) => {
                                    this.setState({loading: 0});
                                    setTimeout(() => {
                                        this.props.history.push(`/rtl/dashboard`);
                                    }, 750);
                                }
                            }
                            style={{
                                fontWeight: 'bold',
                                textAlign: "center",
                                verticalAlign: "middle",
                                justifyContent: 'center',
                                borderRadius: 24,
                                lineHeight: 3.5,
                                outline: 'none',
                                position: 'relative',
                                top: -24,
                                width: 100,
                                height: 48,
                                zIndex: '3',
                            }}>
                            {this.state.signupForFormItems ? 'Sign Up' : 'Sign In'}
                        </LoginButton>
                    </Center>
                </LoginBox>
            </div>
        );
    }
}

AuthPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(inClasses)(AuthPage);

