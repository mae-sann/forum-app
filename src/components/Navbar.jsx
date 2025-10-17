import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('forum_user') || 'null')

  const logout = () => {
    localStorage.removeItem('forum_user')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/posts">ForumApp</Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/posts">Posts</Link>
          <Link className="btn btn-outline-success me-2" to="/new">New Post</Link>
          {!user ? (
            <>
              <Link className="btn btn-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-secondary" to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="me-2">Hi, {user.username}</span>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
