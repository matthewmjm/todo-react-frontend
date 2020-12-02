import React from 'react'
import './App.css';
import TodoForm from './components/TodoForm'
import TodoContainer from './components/TodoContainer'
import { patchTodo, postTodo, deleteTodo } from './helpers'
const todosUrl = "http://localhost:4000/todos/"

class App extends React.Component {

  state = {
    todos: []
  }

  componentDidMount(){
    this.getTodos()
  }
  
  getTodos = () => {
    fetch(todosUrl)
      .then(response => response.json())
      .then(todos => this.setState({todos}))
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
    postTodo(newTodo)
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    this.setState( { todos })
    patchTodo(updatedTodo)
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })

    deleteTodo(id)
  }

  render(){
    return (
      <div className="App">
        <h1>🗣 Todo App 📝</h1>
        <TodoForm  submitAction={this.addTodo} />
        <TodoContainer todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
      </div>
    );
  }
}

export default App;
