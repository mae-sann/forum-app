import React, { useState } from 'react'
import { loginUser } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(username, password)
      if (data && data !== 'false' && data !== false) {
        // backend probably returns user data or false
        localStorage.setItem('forum_user', JSON.stringify(data))
        navigate('/posts')
      } else {
        setMsg('Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      setMsg('Login error')
    }
  }

  return (
    <div className="card p-4">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Login</button>
        {msg && <div className="mt-2 text-danger">{msg}</div>}
      </form>
    </div>
  )
}
