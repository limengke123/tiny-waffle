import React from 'react'
import { render } from 'enzyme'
import NotFound from '../notFound'

describe('notFound', () => {
    it('should render correctly', () => {
        const wrapper = render(<NotFound />)
        expect(wrapper).toMatchSnapshot()
    })
})
