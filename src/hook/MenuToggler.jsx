import React, { useState } from 'react'

export default function useMenuToggler() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return {
        anchorEl,
        handleClick,
        handleClose,
    }
}