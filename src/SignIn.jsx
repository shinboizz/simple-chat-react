import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Box, Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useApp } from './context/AppContext';

let useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    button: {
        width: "50%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
    }
}));

export default function SignIn({ children, ...rest }) {
    const app = useApp();
    const classes = useStyles();

    const signInWithGoogle = async () => {
        let cert = await signInWithPopup(app.getFirebaseAuth(), new GoogleAuthProvider()).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            console.log(errorCode, errorMessage, email);
        });
        app.setUser(cert.user);
    }

    return (
        <Box className={classes.wrapper}>
            <GoogleLoginButton className={classes.button} onClick={() => signInWithGoogle()} />
        </Box>
    )

}