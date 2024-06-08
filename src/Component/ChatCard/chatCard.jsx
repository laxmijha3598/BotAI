import { Box, Stack, Typography, IconButton, Rating } from '@mui/material';
import ai from "../../Assets/AI.png";
import human from '../../Assets/person.png';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import styles from './chatcard.module.css';

export default function ChattingCard({ details, showFeedbackModal, updateChat, setSelectedChatId, readOnly = false }) {
    const [isRating, setIsRating] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (isRating) {
            updateChat(prev => (
                prev.map(item => {
                    if (item.id === details.id) {
                        return { ...item, rating: rating || 0 };
                    } else {
                        return { ...item };
                    }
                })
            ));
        }
    }, [rating]);

    return (
        <Stack
            className={styles.chatCard}
            p={{ xs: 1, md: 2 }}
            direction={'row'}
            spacing={{ xs: 1, md: 3 }}
            bgcolor={readOnly ? 'primary.main' : 'primary.light'}
        >
            <Box
                component={'img'}
                src={details.type === "AI" ? ai : human}
                className={styles.chatAvatar}
                flexShrink={0}
            />
            <Box>
                <Typography variant='heading' className={styles.chatHeading}>
                    {details.type === "AI" ? 'Soul AI' : 'You'}
                </Typography>
                <Typography className={styles.chatText}>
                    {details.text}
                </Typography>
                <Stack direction={'row'} gap={2} alignItems={'center'} mt={1}>
                    <Typography className={styles.chatTime}>
                        {format(details.time, 'hh:mm a')}
                    </Typography>

                    {(details.type === "AI" && !readOnly) && (
                        <Stack direction={'row'} className={styles.feedbackBtns}>
                            <IconButton size='small' onClick={() => setIsRating(prev => !prev)}>
                                {!isRating && <ThumbUpOffAltIcon fontSize='inherit' />}
                                {isRating && <ThumbUpAltIcon fontSize='inherit' />}
                            </IconButton>
                            <IconButton size='small' onClick={() => {
                                setSelectedChatId(details.id);
                                showFeedbackModal();
                            }}>
                                <ThumbDownOffAltIcon fontSize='inherit' />
                            </IconButton>
                        </Stack>
                    )}
                </Stack>

                {((isRating || details.rating > 0) && details.type === "AI") && (
                    <Box pt={{ xs: 1, md: 2 }}>
                        <Typography component={'legend'} className={styles.ratingLegend}>
                            {readOnly ? 'Rating:' : 'Rate this response:'}
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={details.rating > 0 ? details.rating : rating}
                            onChange={(event, newValue) => setRating(newValue)}
                            readOnly={readOnly}
                        />
                    </Box>
                )}

                {details.feedback && (
                    <Typography className={styles.feedbackText}>
                        <Box component={'span'} fontWeight={600}>
                            Feedback:
                        </Box>
                        <Box component={'span'}>
                            {` ${details.feedback}`}
                        </Box>
                    </Typography>
                )}
            </Box>
        </Stack>
    );
}
