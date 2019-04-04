import React from 'react'
import { Count } from '../component/count'

class Home extends React.Component {
  state = {
    count: 0
  }

  increase = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrease = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    return (
      <div>
        <Count count={this.state.count} />
        <button onClick={this.decrease}> - </button>
        <button onClick={this.increase}> + </button>
      </div>
    )
  }
}

export { Home }
