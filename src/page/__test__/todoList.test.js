import React from 'react'
import { shallow, render } from 'enzyme'
import TodoList from '../todoList'

describe('todoList', () => {
    beforeEach(() => {
        TodoList.index = 0
    })

    it('should render correctly', () => {
        const wrapper = render(<TodoList />)
        expect(wrapper).toMatchSnapshot()
    })

    describe('addTodoListItem', () => {
        const wrapper = shallow(<TodoList />)
        const instance = wrapper.instance()

        afterEach(() => {
            instance.state = {
                todos: [],
                inputValue: ''
            }
            TodoList.index = 0
        })

        it('should add item after trigger addTodoListItem', () => {
            instance.state = {
                todos: [],
                inputValue: '测试文字'
            }
            expect(TodoList.index).toBe(0)
            instance.addTodoListItem()
            expect(instance.state).toMatchObject({
                inputValue: '',
                todos: [
                    {
                        isComplete: false,
                        id: 0,
                        info: {
                            text: '测试文字'
                        }
                    }
                ]
            })
            expect(TodoList.index).toBe(1)
            instance.state.inputValue = '测试加的第二项'
            instance.addTodoListItem()
            expect(instance.state).toMatchObject({
                inputValue: '',
                todos: [
                    {
                        isComplete: false,
                        id: 0,
                        info: {
                            text: '测试文字'
                        }
                    },
                    {
                        isComplete: false,
                        id: 1,
                        info: {
                            text: '测试加的第二项'
                        }
                    }
                ]
            })
            expect(TodoList.index).toBe(2)
        })

        it('should do not add item if inputValue is empty', () => {
            instance.addTodoListItem()
            expect(instance.state.todos).toHaveLength(0)
            expect(TodoList.index).toBe(0)
        })
    })

    it('should delete item after trigger deleteTodoListItem', () => {
        const wrapper = shallow(<TodoList />)
        const instance = wrapper.instance()
        instance.state.todos = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
        instance.deleteTodoListItem({ id: 2 })
        expect(instance.state.todos).toHaveLength(3)
        instance.deleteTodoListItem({ id: 1 })
        expect(instance.state.todos).toHaveLength(2)
    })

    it('should toggle complete when trigger handleComplete', () => {
        const wrapper = shallow(<TodoList />)
        const instance = wrapper.instance()
        instance.state.todos = [{ id: 0, isComplete: false }]

        instance.handleComplete({ id: 0 })
        expect(instance.state.todos[0].isComplete).toBeTruthy()

        instance.handleComplete({ id: 0 })
        expect(instance.state.todos[0].isComplete).toBeFalsy()
    })

    it('should update inputValue when trigger handleInputValueChange', () => {
        const wrapper = shallow(<TodoList />)
        const instance = wrapper.instance()
        const mockEvent = {
            target: {
                value: 'test value'
            }
        }
        expect(instance.state.inputValue).toBe('')
        instance.handleInputValueChange(mockEvent)
        expect(instance.state.inputValue).toBe('test value')
    })
})
