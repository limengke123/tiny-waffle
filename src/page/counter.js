import React from 'react'
import { MemoButton } from '../component/button'
import { Count } from '../component/count'
import styles from '../style/page/home.module.scss'
import { DateFunction } from '../util'

class Counter extends React.Component {
    state = {
        count: {
            number: 0,
            modifyInfo: {
                time: '',
                type: '',
                step: 1
            }
        }
    }

    increase = () => {
        this.setState(state => ({
            count: {
                number: state.count.number + state.count.modifyInfo.step,
                modifyInfo: {
                    ...state.count.modifyInfo,
                    time: DateFunction.currentTime,
                    type: 'Addition'
                }
            }
        }))
    }

    decrease = () => {
        this.setState(state => ({
            count: {
                number: state.count.number - state.count.modifyInfo.step,
                modifyInfo: {
                    ...state.count.modifyInfo,
                    time: DateFunction.currentTime,
                    type: 'Subtraction'
                }
            }
        }))
    }

    changeStep = () => {
        this.setState(state => {
            return {
                count: {
                    ...state.count,
                    modifyInfo: {
                        ...state.count.modifyInfo,
                        step: ~~(Math.random() * 10) + 1
                    }
                }
            }
        })
    }

    render() {
        const { count } = this.state
        console.log('count container page render')
        return (
            <div className={styles.home}>
                <Count countInfo={count} />
                <div>
                    <MemoButton onClick={this.decrease} text="-" />
                    <MemoButton onClick={this.increase} text="+" />
                </div>
                <MemoButton onClick={this.changeStep} text="修改增长步长" />
            </div>
        )
    }
}

export default Counter
