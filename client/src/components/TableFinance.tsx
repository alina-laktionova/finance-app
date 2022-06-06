import {
    IconButton,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    Typography,
    Tooltip,
    Box,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {Ticker} from '../models/Ticker'
import {TableField} from '../models/TableField'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

type Props = {
    tableFields: TableField[]
    rows: Ticker[]
    header: string
    favorites?: string[]
    addToFavorites?: (id: string) => void
    removeFromFavorites?: (id: string) => void
}

export default function TableFinance(props: Props) {
    const {tableFields, rows, header, favorites, removeFromFavorites, addToFavorites} = props

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

    function getTableRow(row: Ticker): JSX.Element {
        return (
            <TableRow key={row.ticker}>
                <TableCell>{row.ticker}</TableCell>
                <TableCell>{row.exchange}</TableCell>
                <TableCell>
                    <Box
                        bgcolor="#fa7474"
                        color="white"
                        height="30px"
                        display="flex"
                        justifyContent="center"
                        gap="5px"
                        alignItems="center"
                        borderRadius="5px">
                        {row.price} <ArrowDownwardIcon fontSize="small" />
                    </Box>
                </TableCell>
                <TableCell>{row.change}</TableCell>
                <TableCell>{row.change_percent}</TableCell>
                <TableCell>{row.dividend}</TableCell>
                <TableCell>{row.yield}</TableCell>
                <TableCell>{new Date(row.last_trade_time).toLocaleString()}</TableCell>
                <TableCell>
                    {addToFavorites && (
                        <Tooltip title="Add to Watch List">
                            <IconButton onClick={() => addToFavorites(row.ticker)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {removeFromFavorites && (
                        <Tooltip title="Remove from Watch List">
                            <IconButton onClick={() => removeFromFavorites(row.ticker)}>
                                <RemoveIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </TableCell>
            </TableRow>
        )
    }

    function getTableBody(rows: Ticker[], favorites?: string[]): JSX.Element {
        return (
            <TableBody>
                {rows.reduce((res: JSX.Element[], row: Ticker) => {
                    if (favorites) {
                        if (favorites.includes(row.ticker)) {
                            res.push(getTableRow(row))
                        }
                    } else {
                        res.push(getTableRow(row))
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
                    {getTableBody(rows, favorites)}
                </Table>
            </TableContainer>
        </>
    )
}
