import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Button, Grid, IconButton, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import Header from './Header';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import classNames from 'classnames';
import SignIn from './SignIn';
import { useApp } from './context/AppContext';
import { useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';

let useStyles = makeStyles(theme => ({
    app: {
        height: "100%",
        [theme.breakpoints.up('sm')]: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
        },
    },
    wrapper: {
        height: "100%",
    },
    h100: {
        height: "100%",
    },
    paper: {
        height: "100%",
    },
    sectionWrapper: {
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        padding: "4%",
    },
    chatBox: {
        flex: "1 1 auto",
        overflowY: "auto",
        paddingLeft: "4%",
        paddingRight: "4%",
    },
    chatInput: {
        padding: "4%",
    }
}));

function App() {
    const classes = useStyles();
    const app = useApp();

    useEffect(() => {
        let removeAuthStateListener = onAuthStateChanged(app.getFirebaseAuth(), user => {
            app.setUser(user);
        })
        return () => {
            removeAuthStateListener();
        }
    }, [app.user])

    return (
        <div className={classNames("app", classes.app)}>
            <Grid container className={classNames(classes.app)}>
                <Grid item xs={12} sm={10} md={6} lg={6} className={classNames(classes.h100)}>
                    <Box className={classes.wrapper}>
                        <Paper className={classes.paper} elevation={3}>
                            <Box className={classes.sectionWrapper}>
                                <Box className={classes.header}>
                                    <Header></Header>
                                </Box>
                                <Box className={classes.chatBox}>
                                    {app.user ? <ChatBox></ChatBox> : <SignIn></SignIn>}
                                </Box>
                                <Box className={classes.chatInput}>
                                    <ChatInput></ChatInput>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
