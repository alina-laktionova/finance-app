import hiddenTickersReducer from '../../store/hiddenTickers/hiddenTickersReducer'
import {
    getHiddenTickersAction,
    hideTickerAction,
    showTickerAction,
} from '../../store/hiddenTickers/hiddenTickersActions'

describe('hiddenTickerReducer tests', () => {
    const initState: string[] = []
    const hiddenTickers: string[] = ['FB', 'TSLA']

    test('should return the initial state', () => {
        expect(hiddenTickersReducer(undefined, {type: '', payload: ''})).toEqual(initState)
    })

    test('should return new state', () => {
        expect(hiddenTickersReducer(initState, getHiddenTickersAction(hiddenTickers))).toEqual(hiddenTickers)
    })

    test('should add new hidden ticker to state', () => {
        expect(hiddenTickersReducer(hiddenTickers, hideTickerAction('GOOGL'))).toEqual([...hiddenTickers, 'GOOGL'])
    })

    test('should remove ticker from state', () => {
        expect(hiddenTickersReducer(hiddenTickers, showTickerAction('FB'))).toEqual(['TSLA'])
    })
})
