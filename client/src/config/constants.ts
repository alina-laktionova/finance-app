import {TableField} from '../models/TableField'

//finance table header fields
export const tableFields: TableField[] = [
    {field: 'ticker', headerName: 'Ticker'},
    {field: 'exchange', headerName: 'Exchange'},
    {field: 'price', headerName: 'Price'},
    {field: 'change', headerName: 'Change'},
    {field: 'change_percent', headerName: 'Change percent'},
    {field: 'dividend', headerName: 'Dividend'},
    {field: 'yield', headerName: 'Yield'},
    {field: 'last_trade_time', headerName: 'Last trade time'},
    {field: '', headerName: ''},
]

//localStorage Favorite Tickers key
export const STORAGE_KEY = 'Favorite_Tickers'
