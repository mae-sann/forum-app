import React, { useState } from 'react'
import { createUser } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await createUser(username, password)
      if (data) {
        localStorage.setItem('forum_user', JSON.stringify(data))
        navigate('/posts')
      } else {
        setMessage('Registration failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Error registering')
    }
  }

  return (
    <div className="card p-4">
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Register</button>
        {message && <div className="mt-2 text-danger">{message}</div>}
      </form>
    </div>
  )
}
