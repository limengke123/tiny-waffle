import React from 'react'
import { Button } from '../component/button'
import { Count } from '../component/count'
import styles from '../style/page/home.module.scss'

class Home extends React.Component {
    state = {
        count: 0
    }

    increase = () => {
        this.setState(state => ({
            count: state.count + 1
        }))
    }

    decrease = () => {
        this.setState(state => ({
            count: state.count - 1
        }))
    }

    render() {
        const { count } = this.state
        console.log('home render')
        return (
            <div className={styles.home}>
                <Count count={count} />
                <div>
                    <Button onClick={this.decrease} text="-" />
                    <Button onClick={this.increase} text="+" />
                </div>
            </div>
        )
    }
}

export { Home }
