import React from 'react'

function TodoItem ({title, content}) {
    return (
        <li className="todo-item">
            <h2>{title}</h2>
            <h3>{content}</h3>
        </li>
    )
}
export default TodoItem