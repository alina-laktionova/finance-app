import {io, Socket} from 'socket.io-client'
import {useEffect, useRef, useState} from 'react'
import TableFinance from './components/TableFinance'
import {STORAGE_KEY, tableFields} from './config/constants'
import {Ticker} from './models/Ticker'
import {Container} from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import Header from './components/Header'
import IntervalInput from './components/IntervalInput'

const socket: Socket = io('http://localhost:4000/')

function App() {
    const [rows, setRows] = useState<Ticker[]>([])
    const [favorites, setFavorites] = useState<string[]>([])
    const [delay, setDelay] = useState<number>(5000)
    const data = useRef<{new: Ticker[]; old: Ticker[]}>({new: [], old: []})

    useEffect(() => {
        socket.emit('start')
        socket.once('ticker', (quotes) => {
            setRows(quotes)
        })
        socket.on('ticker', (quotes) => {
            if (data.current.old.length > 0) {
                console.log('old')
                console.log(data.current.old[0].price)
            }
            if (data.current.new.length > 0) {
                console.log('new')
                console.log(data.current.new[0].price)
            }
            data.current.old = data.current.new
            data.current.new = quotes
        })

        const favoritesStr: string | null = localStorage.getItem(STORAGE_KEY)
        if (favoritesStr) {
            setFavorites(JSON.parse(favoritesStr))
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setRows(data.current.new)
        }, delay)

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [delay])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }, [favorites])

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
            <Header icon={<LocalAtmIcon fontSize="large" />} name={'Finance'} />
            <Container maxWidth="xl" sx={{padding: '40px'}}>
                <IntervalInput setDelay={setDelay} label={'Set update interval (in seconds)'} min={5} step={1} />
                {favorites.length > 0 && (
                    <TableFinance
                        tableFields={tableFields}
                        rows={rows}
                        header={'My Watch List'}
                        favorites={favorites}
                        removeFromFavorites={removeFromFavorites}
                    />
                )}
                <TableFinance
                    tableFields={tableFields}
                    rows={rows}
                    header={'All Tickers'}
                    addToFavorites={addToFavorites}
                />
            </Container>
        </>
    )
}

export default App
