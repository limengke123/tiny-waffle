import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Button extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = {
        text: '',
        onClick() {}
    }

    render() {
        console.log('button render')
        const { text, onClick: onClickProps } = this.props
        return (
            <button type="button" onClick={onClickProps}>
                {text}
            </button>
        )
    }
}

export { Button }
