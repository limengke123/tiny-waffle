import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import NotFound from '../notFound'

describe('notFound', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Router>
                <NotFound />
            </Router>
        )
        expect(wrapper.render()).toMatchSnapshot()
    })
})
