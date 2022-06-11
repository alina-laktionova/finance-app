import {render, screen} from '@testing-library/react'
import App from '../App'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {Ticker} from '../models/Ticker'
import {State} from '../store/store'

describe('App tests', () => {
    const mockStore = configureStore([thunk])
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
    const init: State = {
        tickers: {
            currState: [],
            prevState: [],
        },
        favorites: [],
        hidden: [],
    }
    const state: State = {
        tickers: {
            currState: [updatedTicker],
            prevState: [ticker],
        },
        favorites: [],
        hidden: [],
    }

    test('renders with empty state, shows header and loader', () => {
        const store = mockStore(init)
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('loader')).toBeInTheDocument()
        expect(screen.queryByTestId('finance-table')).not.toBeInTheDocument()
    })

    test('renders with filled tickers state', () => {
        const store = mockStore(state)
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('select')).toBeInTheDocument()
        expect(screen.queryByText(/My Watch List/i)).not.toBeInTheDocument()
        expect(screen.getByText(/All Tickers/i)).toBeInTheDocument()
        expect(screen.getByText('AAPL')).toBeInTheDocument()
    })

    test('renders with watched tickers', () => {
        const store = mockStore({...state, favorites: ['AAPL']})
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('select')).toBeInTheDocument()
        expect(screen.getByText(/My Watch List/i)).toBeInTheDocument()
        expect(screen.getByText(/All Tickers/i)).toBeInTheDocument()
    })

    test('renders with watched and hidden tickers', () => {
        const store = mockStore({...state, favorites: ['AAPL'], hidden: ['AAPL']})
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('select')).toBeInTheDocument()
        expect(screen.getByText(/My Watch List/i)).toBeInTheDocument()
        expect(screen.queryByText(/All Tickers/i)).not.toBeInTheDocument()
    })
})
