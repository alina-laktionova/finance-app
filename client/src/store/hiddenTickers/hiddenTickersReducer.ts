import {ActionType, GET_HIDDEN_TICKERS, HIDE_TICKER, SHOW_TICKER} from '../actionTypes'

const init: string[] = []

export default function hiddenTickersReducer(state: string[] = init, action: ActionType) {
    const {type, payload} = action

    switch (type) {
        case GET_HIDDEN_TICKERS:
            return payload.hiddenTickers
        case HIDE_TICKER:
            return [...state, payload.tickerId]
        case SHOW_TICKER:
            return state.filter((tickerId: string) => tickerId !== payload.tickerId)
        default:
            return state
    }
}
