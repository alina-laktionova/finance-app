import {ADD_TO_WATCH_LIST, GET_WATCH_LIST, REMOVE_FROM_WATCH_LIST} from '../actionTypes'

export function getWatchListAction(favoriteTickers: string[]) {
    return {
        type: GET_WATCH_LIST,
        payload: {
            favoriteTickers: favoriteTickers,
        },
    }
}

export function addToWatchListAction(tickerId: string) {
    return {
        type: ADD_TO_WATCH_LIST,
        payload: {
            tickerId: tickerId,
        },
    }
}

export function removeFromWatchListAction(tickerId: string) {
    return {
        type: REMOVE_FROM_WATCH_LIST,
        payload: {
            tickerId: tickerId,
        },
    }
}
