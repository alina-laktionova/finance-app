import tickersReducer, {TickersState} from '../../store/tickers/tickersReducer'
import {getTickersAction} from '../../store/tickers/tickersActions'
import {Ticker} from '../../models/Ticker'

describe('tickersReducer tests', () => {
    const initState: TickersState = {
        currState: [],
        prevState: [],
    }
    const ticker: Ticker = {
        ticker: 'AAPL',
        exchange: 'NASDAQ',
        price: 279.29,
        change: 64.52,
        change_percent: 0.84,
        dividend: 0.56,
        yield: 1.34,
        last_trade_time: '2021-04-30T11:53:21.000Z',
    }
    const updatedTicker: Ticker = {
        ticker: 'AAPL',
        exchange: 'NASDAQ',
        price: 300,
        change: 70,
        change_percent: 0.5,
        dividend: 0.4,
        yield: 1.2,
        last_trade_time: '2021-04-30T11:53:21.000Z',
    }

    test('should return the initial state', () => {
        expect(tickersReducer(undefined, {type: '', payload: ''})).toEqual(initState)
    })

    test('should return state with new ticker', () => {
        expect(tickersReducer(initState, getTickersAction([ticker]))).toEqual({
            currState: [ticker],
            prevState: [],
        })
    })

    test('should return state with previous ticker and current ticker', () => {
        expect(tickersReducer({currState: [ticker], prevState: []}, getTickersAction([updatedTicker]))).toEqual({
            currState: [updatedTicker],
            prevState: [ticker],
        })
    })
})
