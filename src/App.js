import React from 'react'
import './App.css';
import TodoForm from './components/TodoForm'
import TodoContainer from './components/TodoContainer'
import SignUpForm from './components/SignUpForm'
import { patchTodo, postTodo, deleteTodo } from './helpers'
const todosUrl = "http://localhost:4000/todos/"
const usersUrl = "http://localhost:4000/users/"

class App extends React.Component {

  state = {
    todos: [],
    user: {},
    alerts: []
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

  signUp = (user) => {
    fetch(usersUrl, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        localStorage.setItem('token', response.token)
        this.setState({
          user: response.user,
          alerts: ["User successfully created!"]
        })
      }
    })
  }

  render(){
    return (
      <div className="App">
        <h1>🗣 Todo App 📝</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts} />
        <TodoForm  submitAction={this.addTodo} />
        <TodoContainer todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
      </div>
    );
  }
}

export default App;
