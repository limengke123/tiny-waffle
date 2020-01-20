import React, { PureComponent } from 'react'
import classNames from 'classnames'
import styles from '../style/component/todoListItem.module.scss'

export interface TodoListItemProps {
    data: TodoItem
    handleDelete: (data: TodoListItemProps['data']) => void
    handleComplete: (data: TodoListItemProps['data']) => void
}

export interface TodoItem {
    isComplete: boolean
    id: number
    info: {
        text: string
        date: string
    }
}

export class TodoListItem extends PureComponent<TodoListItemProps> {
    static defaultProps = {
        data: {
            isComplete: false,
            info: {
                text: '',
                data: ''
            },
            id: ''
        },
        handleDelete() {},
        handleComplete() {}
    }

    onDelete = () => {
        const { handleDelete, data } = this.props
        handleDelete(data)
    }

    onComplete = () => {
        const { handleComplete, data } = this.props
        handleComplete(data)
    }

    render() {
        const { data } = this.props
        const { info, isComplete } = data
        const { date, text } = info
        const textClassName = classNames(styles.text, {
            [styles['is-complete']]: isComplete
        })
        return (
            <div>
                <div onClick={this.onComplete} className={styles.wrapper}>
                    <span className={textClassName}>{text}</span>
                    <span className={styles.date}>{date}</span>
                </div>
                <button type="button" onClick={this.onDelete}>
                    删除
                </button>
            </div>
        )
    }
}
