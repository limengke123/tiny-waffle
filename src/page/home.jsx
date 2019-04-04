import React from 'react'
import { Count } from '../component/count'

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
        return (
            <div>
                <Count count={count} />
                <button type="button" onClick={this.decrease}>
                    {' '}
                    -{' '}
                </button>
                <button type="button" onClick={this.increase}>
                    {' '}
                    +{' '}
                </button>
            </div>
        )
    }
}

export { Home }
