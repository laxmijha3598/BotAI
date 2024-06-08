import { Box, Typography, Stack, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import styles from "./card.module.css";

export default function Card({ heading, subtext, handleClick }) {
    return (
        <Stack
            className={styles.card}
            p={{ xs: 1.2, md: 3 }}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            onClick={() => handleClick(heading)}
        >
            <Box>
                <Typography
                    variant='heading'
                    fontWeight={700}
                    fontSize={{xs:14,md:20}}
                >
                    {heading}
                </Typography>
                <Typography
                    color={'text.secondary'}
                    fontSize={{xs:10, md:16}}
                >
                    {subtext}
                </Typography>
            </Box>
            <IconButton size='small' className={styles.iconButton}>
                <ArrowUpwardIcon fontSize='inherit' />
            </IconButton>
        </Stack>
    );
}
