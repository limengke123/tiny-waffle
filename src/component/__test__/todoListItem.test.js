import React from 'react'
import { render, mount } from 'enzyme'
import { TodoListItem } from '../todoListItem'
import styles from '../../style/component/todoListItem.module.scss'

describe('todolistItem', () => {
    it('should render correctly', () => {
        const wrapper = render(<TodoListItem />)
        expect(wrapper).toMatchSnapshot()

        const data = {
            info: {
                text: '测试文字',
                date: '2019-2-13 12:24:42'
            },
            isComplete: true,
            id: 123
        }
        const wrapper1 = render(<TodoListItem data={data} />)
        expect(wrapper1).toMatchSnapshot()
    })

    it('should trigger delete when click button', () => {
        const handleDelete = jest.fn()
        const wrapper = mount(<TodoListItem handleDelete={handleDelete} />)
        wrapper.find('button').simulate('click')
        expect(handleDelete).toHaveBeenCalledTimes(1)
    })

    it('should trigger handleComplete when text is clicked', () => {
        const handleComplete = jest.fn()
        const wrapper = mount(<TodoListItem handleComplete={handleComplete} />)
        wrapper.find(`.${styles.wrapper}`).simulate('click')
        expect(handleComplete).toHaveBeenCalledTimes(1)
    })
})
