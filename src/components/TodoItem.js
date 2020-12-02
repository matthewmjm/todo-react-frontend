import React, {useState} from 'react'
import TodoForm from './TodoForm'

function TodoItem ({id, title, content, urgent, done, deleteTodo, updateTodo}) {
    const todo = {id, title, content, urgent, done}
    const [isToggled, setIsToggled] = useState(false)
    const handleClick = (event) => deleteTodo(id)
    const handleToggle = (event) => setIsToggled(!isToggled)
    const todoCard = () => (
        <li className="todo-item">
            <h2>{title}</h2>
            <h3>{content}</h3>
            <button className="delete-button" onClick={handleClick}>Delete</button>
            <button className="edit-button" onClick={handleToggle}>Edit</button>
        </li>
    )
    return (
        isToggled 
            ? <TodoForm 
                todo={todo} 
                submitAction={updateTodo} 
                handleToggle={handleToggle}/> 
            : todoCard()
    )
}
export default TodoItem