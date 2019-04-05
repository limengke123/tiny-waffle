import React from 'react'
import PropTypes from 'prop-types'
import styles from '../style/component/count.module.scss'

class Count extends React.Component {
    static propTypes = {
        count: PropTypes.number
    }

    static defaultProps = {
        count: 0
    }

    render() {
        console.log('count number render')
        const { count } = this.props
        return <div className={styles.count}>{count}</div>
    }
}

export { Count }
