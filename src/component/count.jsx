import React from 'react'
import PropTypes from 'prop-types'

class Count extends React.Component {
    static propTypes = {
        count: PropTypes.number
    }

    static defaultProps = {
        count: 0
    }

    render() {
        const { count } = this.props
        return <div>{count}</div>
    }
}

export { Count }
