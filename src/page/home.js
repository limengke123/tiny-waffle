import React from 'react'
import { Count } from "../component/count";

class Home extends React.Component {

    render () {
        return (
            <div>
                <Count count={123}/>
            </div>
        )
    }
}

export {
    Home
};
