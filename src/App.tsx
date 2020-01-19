import React, { Component } from 'react'
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import Loadable from 'react-loadable'
import Skeleton from 'antd/lib/skeleton'
import './style/App.css'

const AsyncCounter = Loadable({
    loader: () => import('./page/counter'),
    loading() {
        return <Skeleton active />
    }
})

const AsyncTodoList = Loadable({
    loader: () => import('./page/todoList'),
    loading() {
        return <Skeleton active />
    }
})

const AsyncNotFound = Loadable({
    loader: () => import('./page/notFound'),
    loading() {
        return <Skeleton active />
    }
})

const AsyncMarkDown = Loadable({
    loader: () => import('./page/markdown'),
    loading() {
        return <Skeleton active />
    }
})

const AsyncSg2Ts = Loadable({
    loader: () => import('./page/sg2ts'),
    loading: () => {
        return <Skeleton active />
    }
})

const wrapperNav: (
    BaseComponent: React.ComponentType<any>
) => React.ComponentType<any> = BaseComponent => props => {
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
