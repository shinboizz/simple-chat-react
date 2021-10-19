import { Box, makeStyles, Typography, useTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react'
import CustomAvatar from './CustomAvatar';

let useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "3%"
    },
    message: {
        maxWidth: "70%",
        backgroundColor: grey[100],
        borderRadius: "5px",
        padding: "6px",
        [theme.breakpoints.up('sm')]: {
            maxWidth: "50%",
            padding: "6px",
        },
    },
    avatar: {
        marginTop: "1%",
        [theme.breakpoints.up('sm')]: {
            marginTop: "0.5%",
        },
    },
    messageContent: {
    }
}));

export default function MessageMe({ message }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.message}>
                <Box component={Typography} color="textPrimary">
                    {message.text}
                </Box>
            </Box>
        </Box>
    )
}