import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = function() {
    return (
        <div>
            we are lost there and find nothing, click
            <Link to="/counter"> here </Link>
            back to home page !
        </div>
    )
}

export { NotFound }
