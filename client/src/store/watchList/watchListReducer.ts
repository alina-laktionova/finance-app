import {ActionType, ADD_TO_WATCH_LIST, GET_WATCH_LIST, REMOVE_FROM_WATCH_LIST} from '../actionTypes'

const init: string[] = []

export default function watchListReducer(state: string[] = init, action: ActionType) {
    const {type, payload} = action

    switch (type) {
        case GET_WATCH_LIST:
            return payload.favoriteTickers
        case ADD_TO_WATCH_LIST:
            return [...state, payload.tickerId]
        case REMOVE_FROM_WATCH_LIST:
            return state.filter((tickerId: string) => tickerId !== payload.tickerId)
        default:
            return state
    }
}
