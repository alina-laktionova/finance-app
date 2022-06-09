import {Ticker} from '../../models/Ticker'
import {GET_TICKERS} from '../actionTypes'

export function getTickersAction(tickers: Ticker[]) {
    return {
        type: GET_TICKERS,
        payload: {
            tickers: tickers,
        },
    }
}
