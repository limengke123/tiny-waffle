import React from 'react'
import { sg2ts } from 'sg2ts'

export default class Sg2ts extends React.Component {
    state = {
        value: ''
    }

    handleChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { value } = this.state
        const target = sg2ts(value, {
            space: 4
        })
        return (
            <div>
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    value={value}
                    onChange={this.handleChange}
                />
                <div style={{ whiteSpace: 'pre-wrap' }}>{target}</div>
            </div>
        )
    }
}
