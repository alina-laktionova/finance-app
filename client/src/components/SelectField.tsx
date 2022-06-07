import React, {SyntheticEvent} from 'react'
import {Autocomplete, AutocompleteRenderInputParams, TextField} from '@mui/material'

type Props = {
    options: string[]
    disabled: string[]
    label: string
    value: string | null
    setValue: (value: string | null) => void
}

export default function SelectField(props: Props) {
    const {options, label, value, setValue, disabled} = props

    return (
        <Autocomplete
            options={options}
            getOptionDisabled={(option) => !disabled.includes(option)}
            value={value}
            sx={{width: '250px'}}
            onChange={(event: SyntheticEvent, newValue: string | null) => setValue(newValue)}
            renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label={label} />}
        />
    )
}
