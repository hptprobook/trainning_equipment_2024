import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Avatar, Box, Typography } from '@mui/material';

export default function AnswerLoading() {
    return (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}

            {/* For other variants, adjust the size with `width` and `height` */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    alt="FPT Chat"
                    src={'https://mui.com/static/images/avatar/1.jpg'}
                    sx={{ width: 24, height: 24 }}
                />
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        marginLeft: 1,
                    }}
                >
                    FPT Chat
                </Typography>
            </Box>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

        </Stack>
    );
}