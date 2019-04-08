import React from 'react'
import { mount, render } from 'enzyme'
import { TodoInput } from '../todoInput'

describe('todoInput', () => {
    it('should render correctly value', () => {
        const wrapper = render(<TodoInput />)
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('input').text()).toBe('')

        const wrapper1 = render(<TodoInput value="input测试文字" />)
        expect(wrapper1).toMatchSnapshot()
        // expect(wrapper1.find('input').text()).toBe('input测试文字')
    })
})
