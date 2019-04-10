import React from 'react'
import { mount, render } from 'enzyme'
import { TodoInput } from '../todoInput'

describe('todoInput', () => {
    it('should render correctly', () => {
        const wrapper = render(<TodoInput />)
        expect(wrapper).toMatchSnapshot()
    })

    it('should render correctly value', () => {
        const wrapper = mount(<TodoInput value="input测试文字" />)
        expect(wrapper.find('input').instance().value).toBe('input测试文字')
    })

    it('should trigger onChange when value is changed in input', () => {
        const onChange = jest.fn()
        const wrapper = mount(<TodoInput onChange={onChange} value="" />)

        const first = 'first value change'
        wrapper.find('input').simulate('change', {
            target: {
                value: first
            }
        })
        expect(onChange.mock.calls[0][0].target.value).toBe(first)
        expect(onChange).toHaveBeenCalledTimes(1)

        const second = 'second value change'
        wrapper.find('input').simulate('change', {
            target: {
                value: second
            }
        })
        expect(onChange.mock.calls[1][0].target.value).toBe(second)
        expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('should trigger onComplete when press Enter', () => {
        const onComplete = jest.fn()
        const wrapper = mount(<TodoInput onComplete={onComplete} value="" />)
        wrapper.find('input').simulate('keyup', {
            key: 'Enter',
            keyCode: 13
        })
        expect(onComplete).toHaveBeenCalledTimes(1)
    })

    it('should not trigger onComplete when press the key which is not Enter', () => {
        const onComplete = jest.fn()
        const wrapper = mount(<TodoInput onComplete={onComplete} value="" />)
        wrapper.find('input').simulate('keyup', {
            keyCode: 14
        })
        expect(onComplete).toHaveBeenCalledTimes(0)
    })
})
