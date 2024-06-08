import { Box, Stack, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import styles from './feedback.module.css';

export default function FeedbackModal({ open, handleClose, chatId, updateChat }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        updateChat(prev => (
            prev.map(item => {
                if (item.id === chatId) {
                    return { ...item, feedback: input };
                } else {
                    return { ...item };
                }
            })
        ));

        setInput('');
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalBox}>
                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={{ xs: 0.5, md: 2 }} alignItems={'center'}>
                        <FeedbackIcon />
                        <Typography variant={'heading'} className={styles.modalHeading}>
                            Provide Additional Feedback
                        </Typography>
                    </Stack>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Box
                    component='form'
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        multiline
                        rows={6}
                        className={styles.textField}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        required
                    />
                    <Button variant='contained' type='submit'>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
