import React from 'react'
import { render, mount } from 'enzyme'
import { MemoButton } from '../button'

describe('Button', () => {
    it('renders correctly', () => {
        const wrapper = render(<MemoButton text="按钮文案" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should handle click event correctly', () => {
        const onClick = jest.fn()
        const wrapper = mount(<MemoButton text="测试按钮" onClick={onClick} />)
        wrapper.simulate('click')
        expect(onClick).toHaveBeenCalled()
    })
})
