import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader() {
    return (
        <Box
            data-testid="loader"
            sx={{
                display: 'flex',
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <CircularProgress />
        </Box>
    )
}
