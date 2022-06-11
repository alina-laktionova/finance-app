import {render, screen} from '@testing-library/react'
import Header from '../../components/Header'

describe('Header tests', () => {
    test('Header is rendered', () => {
        render(<Header name={'Header'} />)
        expect(screen.getByText(/Header/i)).toBeInTheDocument()
    })

    test('Header is rendered with icon', () => {
        render(<Header name={'Header'} icon={<div>icon</div>} />)
        expect(screen.getByText(/Header/i)).toBeInTheDocument()
        expect(screen.getByText(/icon/i)).toBeInTheDocument()
    })
})
