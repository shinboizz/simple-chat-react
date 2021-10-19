import { Avatar, makeStyles, useTheme } from '@material-ui/core'
import classNames from 'classnames';
import React from 'react'

let useStyles = makeStyles(theme => ({
    wrapper: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    }
}));

export default function CustomAvatar({ children, src, className, url, ...rest }) {
    const classes = useStyles();

    return (
        <Avatar src={src} className={classNames(classes.wrapper, className)}>{!src && "A"}</Avatar>
    )
}