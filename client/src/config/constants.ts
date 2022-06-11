import {TableField} from '../models/TableField'
import {io, Socket} from 'socket.io-client'

export const SERVER_URL = 'http://localhost:4000/'
export const socket: Socket = io(SERVER_URL)

// Ticker names
export const tickers = [
    'AAPL', // Apple
    'GOOGL', // Alphabet
    'MSFT', // Microsoft
    'AMZN', // Amazon
    'FB', // Facebook
    'TSLA', // Tesla
]

// Finance Table fields
export const tableFields: TableField[] = [
    {field: 'ticker', headerName: 'Ticker'},
    {field: 'exchange', headerName: 'Exchange'},
    {field: 'price', headerName: 'Price'},
    {field: 'change', headerName: 'Change'},
    {field: 'change_percent', headerName: 'Change percent'},
    {field: 'dividend', headerName: 'Dividend'},
    {field: 'yield', headerName: 'Yield'},
    {field: 'last_trade_time', headerName: 'Last trade time'},
]

// localStorage key for My Watch List and Hidden Tickers
export const STORAGE_KEY_FAV = 'Favorite_Tickers'
export const STORAGE_KEY_HIDDEN = 'Hidden_Tickers'
