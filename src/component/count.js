import React from 'react'
import PropTypes from 'prop-types'
import styles from '../style/component/count.module.scss'

class Count extends React.PureComponent {
    static propTypes = {
        countInfo: PropTypes.shape({
            number: PropTypes.number,
            modifyInfo: PropTypes.shape({
                time: PropTypes.string,
                type: PropTypes.string,
                step: PropTypes.number
            })
        })
    }

    static defaultProps = {
        countInfo: {
            number: 0,
            modifyInfo: {
                time: '',
                type: '',
                step: 1
            }
            // step: 1
        }
    }

    render() {
        console.log('count number render')
        const { countInfo } = this.props
        const { number, modifyInfo } = countInfo
        const { time, type, step } = modifyInfo
        return (
            <div>
                <div className={styles.count}>
                    number:
                    {number}
                </div>
                <div className={styles['sub-info']}>
                    time:
                    {time}
                </div>
                <div className={styles['sub-info']}>
                    type:
                    {type}
                </div>
                <div className={styles['sub-info']}>
                    step:
                    {step}
                </div>
            </div>
        )
    }
}

export { Count }
