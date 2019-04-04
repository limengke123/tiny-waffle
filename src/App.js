import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import { Home } from './page/home'
import { TodoList } from './page/todoList'
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
                <Route path="/todoList" component={TodoList} />
                <Route path="/counter" component={Home} />
            </Router>
        )
    }
}

export default App
