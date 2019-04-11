import React from 'react'
import PropTypes from 'prop-types'

function Button({ text, onClick }) {
    return (
        <button type="button" onClick={onClick}>
            {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    text: '',
    onClick() {}
}

const MemoButton = React.memo(Button)

export { MemoButton, Button }
