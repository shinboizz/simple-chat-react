import { Box, makeStyles, Typography, useTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react'
import CustomAvatar from './CustomAvatar';

let useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        marginTop: "3%"
    },
    message: {
        marginLeft: "2%",
        // flex: "1 1 auto",
        maxWidth: "70%",
        [theme.breakpoints.up('sm')]: {
            maxWidth: "50%",
        },
    },
    avatar: {
        marginTop: "1%",
        [theme.breakpoints.up('sm')]: {
            marginTop: "0.5%",
        },
    },
    messageContent: {
        maxWidth: "100%",
        width: "max-content",
        backgroundColor: grey[100],
        borderRadius: "5px",
        padding: "6px",
        [theme.breakpoints.up('sm')]: {
            padding: "6px",
        },
    }
}));

export default function MessageOther({ message }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box className={classes.wrapper}>
            <CustomAvatar src={message.photo_url} className={classes.avatar}></CustomAvatar>
            <Box className={classes.message}>
                <Typography style={{ fontSize: "12px" }} color="textSecondary">{message.full_name}</Typography>
                <Box className={classes.messageContent} component={Typography} color="textPrimary">
                    {message.text}
                </Box>
            </Box>
        </Box>
    )
}