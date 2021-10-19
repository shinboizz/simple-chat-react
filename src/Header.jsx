import { Avatar, Box, Chip, Grid, Hidden, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useTheme } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useApp } from './context/AppContext';
import CustomAvatar from './CustomAvatar';
import useMenuToggler from './hook/MenuToggler';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Header(props) {
    const theme = useTheme();
    const app = useApp();
    const menuToggler = useMenuToggler();

    const handleSignOut = () => {
        menuToggler.handleClose();
        app.getFirebaseAuth().signOut();
        app.setUser(null);
    }

    return (
        <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={11} sm={6} md={6} lg={8}>
                <Chip
                    label="Đồ án môn Công Nghệ Lập Trình Tiên Tiến"
                    color="primary"
                    variant="outlined"
                    clickable
                >
                </Chip>
            </Grid>
            {app.user && (
                <Fragment>
                    <Menu
                        anchorEl={menuToggler.anchorEl}
                        keepMounted
                        open={Boolean(menuToggler.anchorEl)}
                        onClose={menuToggler.handleClose}
                    >
                        <MenuItem style={{ color: theme.palette.error.main }} onClick={() => { handleSignOut() }} >
                            <ListItemIcon style={{ color: theme.palette.error.main }} >
                                <ExitToAppIcon fontSize="small"></ExitToAppIcon>
                            </ListItemIcon>
                            <ListItemText>Đăng xuất</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Grid item xs={1} sm={6} md={6} lg={4} style={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
                        <Hidden xsDown>
                            <Typography style={{ marginRight: "3%" }}>{app.user.displayName}</Typography>
                        </Hidden>
                        <IconButton size="small" onClick={menuToggler.handleClick}>
                            <CustomAvatar src={app.user.photoURL}></CustomAvatar>
                        </IconButton>
                    </Grid>
                </Fragment>
            )}
        </Grid>
    )

}