import React, { Component } from 'react'
import { TodoListItem } from '../component/todoListItem'
import { TodoInput } from '../component/todoInput'
import { BaseFunction } from '../util'

class TodoList extends Component {
    static index = 0

    state = {
        todos: [],
        inputValue: ''
    }

    addTodoListItem = () => {
        const { inputValue } = this.state
        if (inputValue) {
            this.setState(state => {
                state.todos.push({
                    text: state.inputValue,
                    isComplete: false,
                    id: TodoList.index++
                })
                return {
                    inputValue: '',
                    todos: state.todos
                }
            })
        }
    }

    deleteTodoListItem = ({ id }) => {
        this.setState(state => {
            const index = BaseFunction.getIndexFromListById(state.todos, id)
            BaseFunction.removeItemFromListByIndex(state.todos, index)
            return {
                todos: state.todos
            }
        })
    }

    handleInputValueChange = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        const { todos, inputValue } = this.state
        return (
            <div>
                <TodoInput
                    value={inputValue}
                    onChange={this.handleInputValueChange}
                    onComplete={this.addTodoListItem}
                />
                {!todos.length && <span>暂无数据</span>}
                {todos.map(todo => (
                    <TodoListItem
                        handleDelete={this.deleteTodoListItem}
                        data={todo}
                        key={todo.id}
                    />
                ))}
            </div>
        )
    }
}

export { TodoList }
