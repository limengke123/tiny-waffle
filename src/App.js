import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import { Counter } from './page/counter'
import { TodoList } from './page/todoList'
import { NotFound } from './page/notFound'
import './style/App.css'

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
                    <Route path="/todoList" component={TodoList} />
                    <Route path="/counter" component={Counter} />
                    <Route path="/404" component={NotFound} />
                    <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
            </Router>
        )
    }
}

export default App
