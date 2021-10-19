import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useApp } from './context/AppContext';
import { serverTimestamp } from "firebase/firestore";
import { collection, doc, addDoc } from "firebase/firestore";

let useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        alignItems: "center"
    },
}));

export default function ChatInput(props) {
    const classes = useStyles();
    const app = useApp();

    const [form, setForm] = useState({
        text: "",
    });

    const handleFormChange = (prop) => (event) => {
        setForm(state => ({ ...state, [prop]: event.target.value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let uid = app.user.uid;
        let full_name = app.user.displayName;
        let create_time = serverTimestamp();
        let photo_url = app.user.photoURL;
        const messageCollection = collection(app.getStore(), "messages");
        addDoc(messageCollection, {
            uid,
            full_name,
            photo_url,
            create_time,
            text: form.text,
        })
        setForm(state => ({ ...state, text: "" }))
    }

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={2} className={classes.wrapper}>
                <Grid item xs={8} md={10}>
                    <TextField
                        onChange={handleFormChange("text")}
                        fullWidth value={form.text}
                        variant="outlined" size="small"
                        label="Nhập nội dung tin nhắn..." />
                </Grid>
                <Grid item xs={4} md={2}>
                    <Button type="submit" disabled={!form.text} fullWidth variant="contained" color="primary">
                        Gửi
                    </Button>
                </Grid>
            </Grid>
        </form>
    )

}