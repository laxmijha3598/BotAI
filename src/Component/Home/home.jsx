import { Box, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import InitialChat from '../../Component/FirstChat/FirstChat';
import ChatInput from '../ChatInput/chatInput';
import ChattingCard from '../ChatCard/chatCard';
import FeedbackModal from '../Feedback/feedback';
import { useOutletContext } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { ThemeContext } from '../Theme/ThemeContext';
import { useContext } from 'react';
import data from '../../Data/sampleData.json';
import styles from './home.module.css';

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const listRef = useRef(null);
    const [chatId, setChatId] = useState(1);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [scrollToBottom, setScrollToBottom] = useState(false);
    const { chat, setChat } = useOutletContext();
    const { mode } = useContext(ThemeContext);

    // GENERATING AI RESPONSE
    const generateResponse = (input) => {
        const response = data.find(item => input.toLowerCase() == item.question.toLowerCase());
        let answer = "Sorry, Did not understand your query!";
        if (response != undefined) {
            answer = response.response;
        }
        setChat(prev => ([
            ...prev,
            { type: 'Human', text: input, time: new Date(), id: chatId },
            { type: 'AI', text: answer, time: new Date(), id: chatId + 1 }
        ]));
        setChatId(prev => prev + 2);
    }

    //AUTOSCROLL TO LAST ELEMENT
    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView();
    }, [scrollToBottom]);

    return (
        <Stack height={'100vh'} justifyContent={'space-between'} className={styles.homeContainer}>
            <Navbar />
            {chat.length === 0 && <InitialChat generateResponse={generateResponse} />}
            {chat.length > 0 && (
                <Stack height={1} flexGrow={0} p={{ xs: 2, md: 3 }} spacing={{ xs: 2, md: 3 }} className={styles.chatContainer} ref={listRef}>
                    {chat.map((item, index) => (
                        <ChattingCard
                            details={item}
                            key={index}
                            updateChat={setChat}
                            setSelectedChatId={setSelectedChatId}
                            showFeedbackModal={() => setShowModal(true)}
                        />
                    ))}
                </Stack>
            )}
            <ChatInput generateResponse={generateResponse} setScroll={setScrollToBottom} chat={chat} clearChat={() => setChat([])} />
            <FeedbackModal open={showModal} updateChat={setChat} chatId={selectedChatId} handleClose={() => setShowModal(false)} />
        </Stack>
    )
}
