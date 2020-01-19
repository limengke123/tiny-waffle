import React from 'react'
import styles from '../style/component/count.module.scss'
import { CounterState } from '../page/counter'

export interface CountProps {
    countInfo: CounterState['count']
}

export class Count extends React.PureComponent<CountProps> {
    render() {
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
