import {AppBar, Container, Toolbar, Typography} from '@mui/material'

type Props = {
    icon?: JSX.Element
    name: string
}

export default function Header(props: Props) {
    const {icon, name} = props

    return (
        <AppBar data-testid="header" position="static" sx={{backgroundColor: '#4f9fc4'}}>
            <Container maxWidth="xl">
                <Toolbar>
                    {icon}
                    <Typography variant="h5" ml="15px">
                        {name}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
