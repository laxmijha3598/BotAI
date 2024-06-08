import { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeContext";
import { Typography, Box, Stack, Button, useMediaQuery } from '@mui/material';
import icon from '../../Assets/AI.png';
import { Link } from 'react-router-dom';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CloseIcon from '@mui/icons-material/Close';
import styles from './sidebar.module.css';

export default function Sidebar({ setChat, closeMenu }) {
    const { mode, setMode } = useContext(ThemeContext);
    const isMobile = useMediaQuery('(max-width:800px)');

    const handleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    }

    return (
        <Box className={styles.sidebar}>
            {isMobile && (
                <Button
                    endIcon={<CloseIcon />}
                    className={styles.closeButton}
                    onClick={closeMenu}
                >
                    Close
                </Button>
            )}

            <Link to={'/'} className={styles.link}>
                <Stack
                    onClick={() => {
                        setChat([]);
                        closeMenu();
                    }}
                    className={styles.newChat}
                    direction={'row'}
                    spacing={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Box
                            component={'img'}
                            src={icon}
                            className={styles.icon}
                        />
                        <Typography
                            variant={'heading'}
                            className={styles.newChatText}
                        >
                            New Chat
                        </Typography>
                    </Stack>
                    <AddCommentIcon className={styles.addCommentIcon} />
                </Stack>
            </Link>

            <Box className={styles.historyBox}>
                <Link to={'/history'} className={styles.historyLink}>
                    <Button
                        variant="contained"
                        className={styles.historyButton}
                        onClick={closeMenu}
                    >
                        Past Conversations
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}
