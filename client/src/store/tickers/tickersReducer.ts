import {Ticker} from '../../models/Ticker'
import {ActionType, GET_TICKERS} from '../actionTypes'

export type TickersState = {
    currState: Ticker[]
    prevState: Ticker[]
}

const init = {
    currState: [],
    prevState: [],
}

export default function tickersReducer(state: TickersState = init, action: ActionType) {
    const {type, payload} = action
    switch (type) {
        case GET_TICKERS:
            return {...state, prevState: state.currState, currState: payload.tickers}
        default:
            return state
    }
}
