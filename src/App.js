import React, { Component } from 'react'
import {
    BrowserRouter as Router,
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

class App extends Component {
    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/counter">计数器</Link>
                        </li>
                        <li>
                            <Link to="/todoList">待办事项</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/todoList" component={AsyncTodoList} />
                    <Route path="/counter" component={AsyncCounter} />
                    <Route path="/404" component={AsyncNotFound} />
                    <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
            </Router>
        )
    }
}

export default App
