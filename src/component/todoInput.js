import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../style/component/todoInput.module.scss'

class TodoInput extends Component {
    static propTypes = {
        value: PropTypes.string,
        onComplete: PropTypes.func,
        onChange: PropTypes.func
    }

    static defaultProps = {
        value: '',
        onComplete() {},
        onChange() {}
    }

    handleKeyUp = e => {
        if (e.keyCode === 13) {
            const { onComplete } = this.props
            onComplete()
        }
    }

    render() {
        const { value, onChange } = this.props
        return (
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyUp={this.handleKeyUp}
                    className={styles['todo-input']}
                />
            </div>
        )
    }
}

export { TodoInput }
