export type ActionType = {
    type: string
    payload?: any
}

//tickers
export const GET_TICKERS = 'GET_TICKERS'

//hidden tickers
export const GET_HIDDEN_TICKERS = 'GET_HIDDEN_TICKERS'
export const HIDE_TICKER = 'HIDE_TICKER'
export const SHOW_TICKER = 'SHOW_TICKER'

//watch list
export const GET_WATCH_LIST = 'GET_WATCH_LIST'
export const ADD_TO_WATCH_LIST = 'ADD_TO_WATCH_LIST'
export const REMOVE_FROM_WATCH_LIST = 'REMOVE_FROM_WATCH_LIST'
