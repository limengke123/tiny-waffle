import React, { Component } from 'react'
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import Loadable from 'react-loadable'
import './style/App.css'

const AsyncCounter = Loadable({
    loader: () => import('./page/counter'),
    loading() {
        return <div>Loading...</div>
    }
})

const AsyncTodoList = Loadable({
    loader: () => import('./page/todoList'),
    loading() {
        return <div>Loading...</div>
    }
})

const AsyncNotFound = Loadable({
    loader: () => import('./page/notFound'),
    loading() {
        return <div>Loading...</div>
    }
})

const AsyncMarkDown = Loadable({
    loader: () => import('./page/markdown'),
    loading() {
        return <div>Loading</div>
    }
})

const AsyncSg2Ts = Loadable({
    loader: () => import('./page/sg2ts'),
    loading: () => {
        return <div>Loading</div>
    }
})

const wrapperNav = BaseComponent => props => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/counter">计数器</Link>
                    </li>
                    <li>
                        <Link to="/todoList">待办事项</Link>
                    </li>
                    <li>
                        <Link to="/markdown">markdown</Link>
                    </li>
                    <li>
                        <Link to="/sg2ts">sg2ts</Link>
                    </li>
                </ul>
            </nav>
            <BaseComponent {...props} />
        </div>
    )
}

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/todoList"
                        component={wrapperNav(AsyncTodoList)}
                    />
                    <Route
                        path="/counter"
                        component={wrapperNav(AsyncCounter)}
                    />
                    <Route
                        path="/markdown"
                        component={wrapperNav(AsyncMarkDown)}
                    />
                    <Route path="/404" component={wrapperNav(AsyncNotFound)} />
                    <Route path="/sg2ts" component={AsyncSg2Ts} />
                    <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
            </Router>
        )
    }
}

export default App
