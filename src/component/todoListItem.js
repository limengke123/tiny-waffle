import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../style/component/todoListItem.module.scss'

class TodoListItem extends Component {
    static propTypes = {
        data: PropTypes.shape({
            text: PropTypes.string,
            isComplete: PropTypes.bool,
            id: PropTypes.number
        }),
        handleDelete: PropTypes.func
    }

    static defaultProps = {
        data: {
            text: '',
            isComplete: false
        },
        handleDelete() {}
    }

    onDelete = () => {
        const { handleDelete, data } = this.props
        handleDelete(data)
    }

    render() {
        const { data } = this.props
        const { text, isComplete } = data
        const className = [
            styles['todo-list-item'],
            isComplete ? styles['is-complete'] : null
        ]
        return (
            <div className={className}>
                {text}
                <button type="button" onClick={this.onDelete}>
                    删除
                </button>
            </div>
        )
    }
}

export { TodoListItem }
