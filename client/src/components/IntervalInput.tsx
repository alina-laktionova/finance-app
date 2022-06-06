import {Box, Button, TextField} from '@mui/material'
import {ChangeEvent, useState} from 'react'

type Props = {
    setDelay: (delay: number) => void
    label: string
    min: number
    step: number
}

export default function IntervalInput(props: Props) {
    const {setDelay, label, min, step} = props

    const [seconds, setSeconds] = useState<number>(min)

    function handleChangeSeconds(event: ChangeEvent<HTMLInputElement>) {
        if (+event.target.value >= min) setSeconds(+event.target.value)
    }

    return (
        <Box display="flex" gap="5px">
            <TextField
                label={label}
                variant="outlined"
                type="number"
                value={seconds}
                sx={{width: '300px'}}
                inputProps={{min: min, step: step}}
                onChange={handleChangeSeconds}
            />
            <Button
                variant="outlined"
                sx={{
                    height: '56px',
                }}
                onClick={() => {
                    setDelay(seconds * 1000)
                }}>
                Ok
            </Button>
        </Box>
    )
}
