import { Typography, Box, Stack, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import ChatHistoryCard from '../Chathistory/chathistory';
import ChatFilter from '../ChatFilter/chatfilter';
import Navbar from '../Navbar/Navbar';
import styles from './history.module.css';

export default function History() {
    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        const localChats = localStorage.getItem('chat') || [];
        if (localChats.length > 0) {
            setChats(JSON.parse(localChats));
            setFilteredChats(JSON.parse(localChats));
        }
    }, []);

    return (
        <Box className={styles.historyContainer}>
            <Navbar />
            <Box className={styles.content}>
                <Typography variant='h2' textAlign={'center'} mb={3}>
                    Conversation History
                </Typography>

                {chats.length > 0 && <ChatFilter allChats={chats} filterChats={setFilteredChats} />}

                {chats.length === 0 && (
                    <Typography className={styles.noChatsText}>
                        No saved chats.
                    </Typography>
                )}

                {chats.length > 0 && filteredChats.length === 0 && (
                    <Typography className={styles.noChatsText}>
                        No such chats.
                    </Typography>
                )}

                {filteredChats.length > 0 && (
                    <Stack
                        spacing={4}
                        divider={<Divider className={styles.divider} />}
                    >
                        {filteredChats.map((item, index) => (
                            <ChatHistoryCard details={item} key={index} />
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
