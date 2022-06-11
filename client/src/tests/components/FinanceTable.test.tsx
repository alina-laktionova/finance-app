import configureStore from 'redux-mock-store'
import {render, screen} from '@testing-library/react'
import FinanceTable from '../../components/FinanceTable'
import {Provider} from 'react-redux'
import {Ticker} from '../../models/Ticker'
import {State} from '../../store/store'

describe('FinanceTable tests', () => {
    const mockStore = configureStore()
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
    const state: State = {
        tickers: {
            currState: [updatedTicker],
            prevState: [ticker],
        },
        favorites: [],
        hidden: [],
    }

    test('table is rendered with filled state', () => {
        const store = mockStore(state)
        render(
            <Provider store={store}>
                <FinanceTable header={'Table'} />
            </Provider>
        )
        expect(screen.getByTestId('finance-table')).toBeInTheDocument()
    })
})
