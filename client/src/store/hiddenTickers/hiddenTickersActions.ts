import {GET_HIDDEN_TICKERS, HIDE_TICKER, SHOW_TICKER} from '../actionTypes'

export function getHiddenTickersAction(hiddenTickers: string[]) {
    return {
        type: GET_HIDDEN_TICKERS,
        payload: {
            hiddenTickers: hiddenTickers,
        },
    }
}

export function hideTickerAction(tickerId: string) {
    return {
        type: HIDE_TICKER,
        payload: {
            tickerId: tickerId,
        },
    }
}

export function showTickerAction(tickerId: string) {
    return {
        type: SHOW_TICKER,
        payload: {
            tickerId: tickerId,
        },
    }
}
