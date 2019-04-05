import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from '../style/component/todoListItem.module.scss'

class TodoListItem extends PureComponent {
    static propTypes = {
        data: PropTypes.shape({
            info: PropTypes.shape({
                text: PropTypes.string,
                date: PropTypes.string
            }),
            isComplete: PropTypes.bool,
            id: PropTypes.number
        }),
        handleDelete: PropTypes.func,
        handleComplete: PropTypes.func
    }

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
        console.log('listItem is render')
        const { data } = this.props
        const { info, isComplete } = data
        const { date, text } = info
        const textClassName = classNames(styles.text, {
            [styles['is-complete']]: isComplete
        })
        return (
            <div>
                <div onClick={this.onComplete}>
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

export { TodoListItem }
