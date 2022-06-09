import {configureStore} from '@reduxjs/toolkit'
import tickersReducer, {TickersState} from './tickers/tickersReducer'
import watchListReducer from './watchList/watchListReducer'
import hiddenTickersReducer from './hiddenTickers/hiddenTickersReducer'

export type State = {
    tickers: TickersState
    favorites: string[]
    hidden: string[]
}

export const store = configureStore({
    reducer: {
        tickers: tickersReducer,
        favorites: watchListReducer,
        hidden: hiddenTickersReducer,
    },
})

export type AppDispatch = typeof store.dispatch
