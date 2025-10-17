import React, { useState } from 'react'
import { createPost } from '../api'
import { useNavigate } from 'react-router-dom'

export default function NewPost() {
  const [text, setText] = useState('')
  const user = JSON.parse(localStorage.getItem('forum_user') || 'null')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!user) { alert('Please login first'); navigate('/login'); return }
    try {
      const res = await createPost(user.id, text)
      if (res && (res.success || res.id)) {
        setText('')
        navigate('/posts')
      } else {
        alert('Post failed')
      }
    } catch (err) {
      console.error(err)
      alert('Error posting')
    }
  }

  return (
    <div className="card p-4">
      <h3>New Post</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={e=>setText(e.target.value)} required />
        </div>
        <button className="btn btn-success">Post</button>
      </form>
    </div>
  )
}
