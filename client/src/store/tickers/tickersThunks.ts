import {socket} from '../../config/constants'
import {getTickersAction} from './tickersActions'
import {AppDispatch} from '../store'

export const getTickers = () => (dispatch: AppDispatch) => {
    socket.emit('start')
    socket.on('ticker', (quotes) => {
        dispatch(getTickersAction(quotes))
    })
}
