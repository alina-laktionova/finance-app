import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Typography} from '@mui/material'
import {Ticker} from '../models/Ticker'
import {TableField} from '../models/TableField'
import FinanceTableRow from './FinanceTableRow'

type Props = {
    tableFields: TableField[]
    rows: Ticker[]
    rowsPrev: Ticker[]
    header: string
    favorites?: string[]
    hidden?: string[]
    addToFavorites?: (id: string) => void
    removeFromFavorites?: (id: string) => void
    hideTicker?: (id: string) => void
}

export default function FinanceTable(props: Props) {
    const {tableFields, rows, rowsPrev, header, favorites, hidden, removeFromFavorites, addToFavorites, hideTicker} =
        props

    function getTableHead(): JSX.Element {
        return (
            <TableHead>
                <TableRow>
                    {tableFields.map((tableField: {field: string; headerName: string}) => (
                        <TableCell key={tableField.field}>{tableField.headerName}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    function getTableBody(): JSX.Element {
        return (
            <TableBody>
                {rows.reduce((res: JSX.Element[], row: Ticker) => {
                    const rowPrev: Ticker | undefined = rowsPrev.find((rowPrev) => rowPrev.ticker === row.ticker)
                    if (favorites) {
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
        <>
            <Typography textAlign="center" variant="h6" margin="20px 0 10px 0">
                {header}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    {getTableHead()}
                    {getTableBody()}
                </Table>
            </TableContainer>
        </>
    )
}
