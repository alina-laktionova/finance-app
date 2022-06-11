import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Typography, Box} from '@mui/material'
import {Ticker} from '../models/Ticker'
import {TableField} from '../models/TableField'
import FinanceTableRow from './FinanceTableRow'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, State} from '../store/store'
import {tableFields} from '../config/constants'
import {hideTickerAction} from '../store/hiddenTickers/hiddenTickersActions'
import {addToWatchListAction, removeFromWatchListAction} from '../store/watchList/watchListActions'

type Props = {
    header: string
    watched?: boolean
}

export default function FinanceTable(props: Props) {
    const dispatch = useDispatch<AppDispatch>()
    const {currState, prevState} = useSelector((state: State) => state.tickers)
    const favorites: string[] = useSelector((state: State) => state.favorites)
    const hidden: string[] = useSelector((state: State) => state.hidden)

    const {header, watched} = props

    const fields: TableField[] = watched
        ? [...tableFields, {field: 'remove', headerName: ''}]
        : [...tableFields, {field: 'add', headerName: ''}, {field: 'hide', headerName: ''}]

    function hideTicker(id: string) {
        if (!hidden.includes(id)) {
            dispatch(hideTickerAction(id))
        }
    }

    function addToFavorites(id: string) {
        if (!favorites.includes(id)) {
            dispatch(addToWatchListAction(id))
        }
    }

    function removeFromFavorites(id: string) {
        dispatch(removeFromWatchListAction(id))
    }

    function getTableHead(): JSX.Element {
        return (
            <TableHead>
                <TableRow>
                    {fields.map((field: {field: string; headerName: string}) => (
                        <TableCell key={field.field}>{field.headerName}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    function getTableBody(): JSX.Element {
        return (
            <TableBody>
                {currState.reduce((res: JSX.Element[], row: Ticker) => {
                    const rowPrev: Ticker | undefined = prevState.find(
                        (rowPrev: Ticker) => rowPrev.ticker === row.ticker
                    )
                    if (watched) {
                        if (favorites.includes(row.ticker)) {
                            res.push(
                                <FinanceTableRow
                                    key={row.ticker}
                                    row={row}
                                    rowPrev={rowPrev}
                                    removeFromFavorites={removeFromFavorites}
                                />
                            )
                        }
                    } else if (!hidden?.includes(row.ticker)) {
                        res.push(
                            <FinanceTableRow
                                key={row.ticker}
                                row={row}
                                rowPrev={rowPrev}
                                addToFavorites={addToFavorites}
                                hideTicker={hideTicker}
                            />
                        )
                    }
                    return res
                }, [])}
            </TableBody>
        )
    }

    return (
        <Box data-testid="finance-table">
            <Typography textAlign="center" variant="h6" margin="20px 0 10px 0">
                {header}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    {getTableHead()}
                    {getTableBody()}
                </Table>
            </TableContainer>
        </Box>
    )
}
