import {useEffect} from 'react'
import FinanceTable from './components/FinanceTable'
import {STORAGE_KEY_FAV, STORAGE_KEY_HIDDEN, tickers} from './config/constants'
import {Container} from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import Header from './components/Header'
import SelectField from './components/SelectField'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, State} from './store/store'
import Loader from './components/Loader'
import {getWatchListAction} from './store/watchList/watchListActions'
import {getHiddenTickersAction} from './store/hiddenTickers/hiddenTickersActions'
import {getTickers} from './store/tickers/tickersThunks'

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const {currState} = useSelector((state: State) => state.tickers)
    const favorites: string[] = useSelector((state: State) => state.favorites)
    const hidden: string[] = useSelector((state: State) => state.hidden)

    useEffect(() => {
        dispatch(getTickers())

        const favoritesStr: string | null = localStorage.getItem(STORAGE_KEY_FAV)
        if (favoritesStr) {
            dispatch(getWatchListAction(JSON.parse(favoritesStr)))
        }
        const hiddenStr: string | null = localStorage.getItem(STORAGE_KEY_HIDDEN)
        if (hiddenStr) {
            dispatch(getHiddenTickersAction(JSON.parse(hiddenStr)))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_FAV, JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_HIDDEN, JSON.stringify(hidden))
    }, [hidden])

    return (
        <>
            <Header icon={<LocalAtmIcon fontSize="large" />} name="Finance" />
            {currState.length === 0 ? (
                <Loader />
            ) : (
                <Container maxWidth="xl">
                    {favorites.length > 0 && <FinanceTable header="My Watch List" watched />}

                    <SelectField options={tickers} disabled={hidden} label="Find a ticker" />

                    {hidden.length < currState.length && <FinanceTable header="All Tickers" />}
                </Container>
            )}
        </>
    )
}

export default App
