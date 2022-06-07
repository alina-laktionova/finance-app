import {Box, IconButton, TableCell, TableRow, Tooltip} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {Ticker} from '../models/Ticker'

type Props = {
    row: Ticker
    rowPrev?: Ticker
    addToFavorites?: (id: string) => void
    removeFromFavorites?: (id: string) => void
    hideTicker?: (id: string) => void
}

export default function FinanceTableRow(props: Props) {
    const {row, rowPrev, addToFavorites, removeFromFavorites, hideTicker} = props

    const increase: boolean = rowPrev ? row.price >= rowPrev.price : true

    return (
        <TableRow key={row.ticker}>
            <TableCell>{row.ticker}</TableCell>
            <TableCell>{row.exchange}</TableCell>
            <TableCell>
                <Box
                    bgcolor={increase ? '#e6f4ea' : '#fce8e6'}
                    color={increase ? '#137333' : '#a50e0e'}
                    height="30px"
                    display="flex"
                    justifyContent="center"
                    gap="5px"
                    alignItems="center"
                    borderRadius="5px">
                    {row.price}
                    {increase ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
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
            {hideTicker && (
                <TableCell>
                    <Tooltip title="Hide ticker">
                        <IconButton onClick={() => hideTicker(row.ticker)}>
                            <VisibilityOffIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            )}
        </TableRow>
    )
}
