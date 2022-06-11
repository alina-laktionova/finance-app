import watchListReducer from '../../store/watchList/watchListReducer'
import {
    addToWatchListAction,
    getWatchListAction,
    removeFromWatchListAction,
} from '../../store/watchList/watchListActions'

describe('watchListReducer tests', () => {
    const initState: string[] = []
    const watchedTickers: string[] = ['FB', 'TSLA']

    test('should return the initial state', () => {
        expect(watchListReducer(undefined, {type: '', payload: ''})).toEqual(initState)
    })

    test('should return new state', () => {
        expect(watchListReducer(initState, getWatchListAction(watchedTickers))).toEqual(watchedTickers)
    })

    test('should add new watched ticker to state', () => {
        expect(watchListReducer(watchedTickers, addToWatchListAction('GOOGL'))).toEqual([...watchedTickers, 'GOOGL'])
    })

    test('should remove ticker from state', () => {
        expect(watchListReducer(watchedTickers, removeFromWatchListAction('FB'))).toEqual(['TSLA'])
    })
})
