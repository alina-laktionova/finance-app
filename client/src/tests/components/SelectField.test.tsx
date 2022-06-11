import {fireEvent, render, screen, within} from '@testing-library/react'
import SelectField from '../../components/SelectField'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

describe('SelectField tests', () => {
    const mockStore = configureStore()
    const store = mockStore()

    test('SelectField is rendered', () => {
        render(
            <Provider store={store}>
                <SelectField options={['option1', 'option2']} disabled={[]} label="Select" />
            </Provider>
        )
        expect(screen.getByTestId('select')).toBeInTheDocument()
        expect(screen.queryByText('option1')).not.toBeInTheDocument()
    })
})
