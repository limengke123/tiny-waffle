import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../style/component/todoInput.module.scss'

class TodoInput extends Component {
    static propTypes = {
        value: PropTypes.string,
        onComplete: PropTypes.func,
        onChange: PropTypes.func,
        placeholder: PropTypes.string
    }

    static defaultProps = {
        value: '',
        onComplete() {},
        onChange() {},
        placeholder: ''
    }

    shouldComponentUpdate(nextProps) {
        const { value } = this.props
        return nextProps.value !== value
    }

    handleKeyUp = e => {
        if (e.keyCode === 13) {
            const { onComplete } = this.props
            onComplete()
        }
    }

    render() {
        const { value, onChange, placeholder } = this.props
        console.log('input is render')
        return (
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyUp={this.handleKeyUp}
                    className={styles['todo-input']}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}

export { TodoInput }
