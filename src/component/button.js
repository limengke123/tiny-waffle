import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// class Button extends React.PureComponent {
//     static propTypes = {
//         text: PropTypes.string,
//         onClick: PropTypes.func
//     }
//
//     static defaultProps = {
//         text: '',
//         onClick() {}
//     }
//
//     render() {
//         console.log('count button render')
//         const { text, onClick: onClickProps } = this.props
//         return (
//             <button type="button" onClick={onClickProps}>
//                 {text}
//             </button>
//         )
//     }
// }

function Button({ text, onClick }) {
    console.log('count button render')
    return (
        <button type="button" onClick={onClick}>
            {text}
        </button>
    )
}

const MemoButton = React.memo(Button)

export { MemoButton, Button }
