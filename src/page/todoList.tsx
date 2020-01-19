import React, { Component } from 'react'
import { TodoListItem, TodoListItemProps } from '../component/todoListItem'
import { TodoInput, TodoInputProps } from '../component/todoInput'
import { BaseFunction, DateFunction } from '../util'

export interface TodoItem {
    isComplete: boolean
    id: number
    info: {
        text: string
        date: string
    }
}

export interface TodoListState {
    todos: TodoItem[]
    inputValue: string
}

class TodoList extends Component<any, TodoListState, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            todos: [],
            inputValue: ''
        }
    }

    addTodoListItem = () => {
        const { inputValue } = this.state
        if (inputValue) {
            this.setState(state => {
                state.todos.push({
                    isComplete: false,
                    id: TodoList.index++,
                    info: {
                        text: inputValue,
                        date: DateFunction.currentTime
                    }
                })
                return {
                    inputValue: '',
                    todos: state.todos
                }
            })
        }
    }

    deleteTodoListItem = ({ id }: TodoListItemProps['data']) => {
        this.setState(state => {
            const index = BaseFunction.getIndexFromListById(state.todos, id)
            BaseFunction.removeItemFromListByIndex(state.todos, index)
            return {
                todos: state.todos
            }
        })
    }

    handleComplete = ({ id }: TodoListItemProps['data']) => {
        this.setState(state => {
            const index = BaseFunction.getIndexFromListById(state.todos, id)
            const todo = state.todos[index]
            state.todos[index] = {
                ...todo,
                isComplete: !todo.isComplete
            }
            return {
                todos: state.todos
            }
        })
    }

    handleInputValueChange: TodoInputProps['onChange'] = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    static index = 0

    render() {
        const { todos, inputValue } = this.state
        return (
            <div>
                <TodoInput
                    value={inputValue}
                    onChange={this.handleInputValueChange}
                    onComplete={this.addTodoListItem}
                    placeholder="请输入待办项"
                />
                {!todos.length && <span>暂无数据</span>}
                {todos.map(todo => (
                    <TodoListItem
                        handleDelete={this.deleteTodoListItem}
                        handleComplete={this.handleComplete}
                        data={todo}
                        key={todo.id}
                    />
                ))}
            </div>
        )
    }
}

export default TodoList
