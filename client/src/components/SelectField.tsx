import React, {SyntheticEvent, useState} from 'react'
import {Autocomplete, AutocompleteRenderInputParams, Box, Button, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {showTickerAction} from '../store/hiddenTickers/hiddenTickersActions'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../store/store'

type Props = {
    options: string[]
    disabled: string[]
    label: string
}

export default function SelectField(props: Props) {
    const dispatch = useDispatch<AppDispatch>()

    const {options, label, disabled} = props
    const [searchValue, setSearchValue] = useState<string | null>(null)

    function showTicker(id: string) {
        dispatch(showTickerAction(id))
    }

    return (
        <Box display="flex" gap="5px" mt="40px">
            <Autocomplete
                options={options}
                getOptionDisabled={(option) => !disabled.includes(option)}
                value={searchValue}
                sx={{minWidth: '200px', width: '350px'}}
                onChange={(event: SyntheticEvent, newValue: string | null) => setSearchValue(newValue)}
                renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label={label} />}
            />
            <Button
                variant="outlined"
                disabled={!searchValue}
                onClick={() => {
                    if (searchValue) {
                        showTicker(searchValue)
                        setSearchValue(null)
                    }
                }}>
                <AddIcon />
            </Button>
        </Box>
    )
}
