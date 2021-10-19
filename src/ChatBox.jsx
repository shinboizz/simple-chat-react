import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react'
import { useApp } from './context/AppContext';
import CustomAvatar from './CustomAvatar';
import MessageMe from './MessageMe';
import MessageOther from './MessageOther';
import { collection, query, where, getDocs, orderBy, limit, onSnapshot, doc } from "firebase/firestore";

let useStyles = makeStyles(theme => ({
    wrapper: {
    },
}));

export default function ChatBox(props) {
    const classes = useStyles();
    const theme = useTheme();
    const app = useApp();
    const dummy = useRef();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messagesCollection = collection(app.getStore(), "messages");
        const q = query(messagesCollection, orderBy("create_time"), limit(25));
        const removeSnapshotListener = onSnapshot(q, (querySnapshot) => {
            let items = querySnapshot.docs.map(doc => doc.data());
            setMessages(items)
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        })
        return () => {
            removeSnapshotListener();
        }
    }, [])

    return (
        <Box className={classes.wrapper}>
            {messages.map(message => {
                return (
                    message.uid === app.user.uid ? <MessageMe message={message}></MessageMe>
                        : <MessageOther message={message}></MessageOther>
                )
            })}
            <span ref={dummy}></span>
        </Box>
    )

}