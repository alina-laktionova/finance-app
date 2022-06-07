import {io, Socket} from 'socket.io-client'
import {useEffect, useRef, useState} from 'react'
import FinanceTable from './components/FinanceTable'
import {SERVER_URL, STORAGE_KEY_FAV, STORAGE_KEY_HIDDEN, tableFields, tickers} from './config/constants'
import {Ticker} from './models/Ticker'
import {Box, Button, Container, useMediaQuery} from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import Header from './components/Header'
import IntervalInput from './components/IntervalInput'
import SelectField from './components/SelectField'
import AddIcon from '@mui/icons-material/Add'

const socket: Socket = io(SERVER_URL)

function App() {
    const [rows, setRows] = useState<Ticker[]>([])
    const [rowsPrev, setRowsPrev] = useState<Ticker[]>([])
    const [favorites, setFavorites] = useState<string[]>([])
    const [hidden, setHidden] = useState<string[]>([])
    const [delay, setDelay] = useState<number>(5000)
    const [searchValue, setSearchValue] = useState<string | null>(null)
    const data = useRef<Ticker[]>([])
    const lgScreen = useMediaQuery('(min-width:700px)')

    useEffect(() => {
        socket.emit('start')
        socket.once('ticker', (quotes) => {
            setRows(quotes)
        })
        socket.on('ticker', (quotes) => {
            data.current = quotes
        })

        const favoritesStr: string | null = localStorage.getItem(STORAGE_KEY_FAV)
        if (favoritesStr) {
            setFavorites(JSON.parse(favoritesStr))
        }
        const hiddenStr: string | null = localStorage.getItem(STORAGE_KEY_HIDDEN)
        if (hiddenStr) {
            setHidden(JSON.parse(hiddenStr))
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setRowsPrev(rows)
            setRows(data.current)
        }, delay)

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [delay, rows])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_FAV, JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_HIDDEN, JSON.stringify(hidden))
    }, [hidden])

    function addTicker(id: string) {
        setHidden(hidden.filter((hiddenTicker: string) => hiddenTicker !== id))
    }

    function hideTicker(id: string) {
        if (!hidden.includes(id)) {
            setHidden([...hidden, id])
        }
    }

    function addToFavorites(id: string) {
        if (!favorites.includes(id)) {
            setFavorites([...favorites, id])
        }
    }

    function removeFromFavorites(id: string) {
        setFavorites(favorites.filter((favorite: string) => favorite !== id))
    }

    return (
        <>
            <Header icon={<LocalAtmIcon fontSize="large" />} name="Finance" />
            <Container maxWidth="xl">
                {favorites.length > 0 && (
                    <FinanceTable
                        tableFields={tableFields}
                        rows={rows}
                        rowsPrev={rowsPrev}
                        header="My Watch List"
                        favorites={favorites}
                        removeFromFavorites={removeFromFavorites}
                    />
                )}

                <Box
                    display="flex"
                    flexDirection={lgScreen ? 'row' : 'column'}
                    justifyContent="space-around"
                    alignItems="center"
                    gap="20px"
                    mt="40px">
                    <Box display="flex" gap="5px">
                        <SelectField
                            options={tickers}
                            disabled={hidden}
                            label="Find ticker"
                            value={searchValue}
                            setValue={setSearchValue}
                        />
                        <Button
                            variant="outlined"
                            disabled={!searchValue}
                            onClick={() => {
                                if (searchValue) addTicker(searchValue)
                            }}>
                            <AddIcon />
                        </Button>
                    </Box>
                    <IntervalInput setDelay={setDelay} label="Set update interval (in seconds)" min={5} step={1} />
                </Box>

                {rows.length > 0 && hidden.length < rows.length && (
                    <FinanceTable
                        tableFields={[...tableFields, {field: 'hide', headerName: ''}]}
                        rows={rows}
                        rowsPrev={rowsPrev}
                        hidden={hidden}
                        header="All Tickers"
                        addToFavorites={addToFavorites}
                        hideTicker={hideTicker}
                    />
                )}
            </Container>
        </>
    )
}

export default App
