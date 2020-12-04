import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function SignUpForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            username,
            password
        }
        props.login(user)
            .then(() => props.history.push('/'))
    }

    const handleChange = ({target}) => {
        return target.name === "username"
        ? setUsername(target.value)
        : setPassword(target.value)
    }

    const showAlerts = () => props.alerts.map(alert => <p key={alert}>{alert}</p>)

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange} />
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange} />
            <input type="submit" />
            {props.alerts ? showAlerts() : null }
            <Link to="/signup">Sign Up</Link>
        </form>
    )
}