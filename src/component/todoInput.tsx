import React, { PureComponent } from 'react'
import styles from '../style/component/todoInput.module.scss'

export interface TodoInputProps {
    value: string
    onComplete: () => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

export class TodoInput extends PureComponent<TodoInputProps, {}, {}> {
    static defaultProps = {
        value: '',
        onComplete() {},
        onChange() {},
        placeholder: ''
    }

    handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            const { onComplete } = this.props
            onComplete()
        }
    }

    render() {
        const { value, onChange, placeholder } = this.props
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
