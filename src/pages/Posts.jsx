import React, { useEffect, useState } from 'react'
import { getPosts, deletePost } from '../api'
import { Link } from 'react-router-dom'

export default function Posts() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('forum_user') || 'null')

  const load = async (p = page) => {
    setLoading(true)
    try {
      const data = await getPosts(p)
      setPosts(Array.isArray(data) ? data : (data.posts || []))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load(page) }, [page])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return
    try {
      const res = await deletePost(id)
      if (res && res.success) {
        load()
      } else {
        alert('Delete failed')
      }
    } catch (err) {
      console.error(err)
      alert('Delete error')
    }
  }

  return (
    <div>
      <h3>Posts</h3>
      {loading ? <div>Loading...</div> : (
        <>
          {posts.length === 0 && <div>No posts yet</div>}
          {posts.map(p => (
            <div className="card mb-3" key={p.id}>
              <div className="card-body">
                <h5 className="card-title">{p.username || p.user || 'User'}</h5>
                <p className="card-text">{p.post}</p>
                <Link to={`/posts/${p.id}`} className="btn btn-sm btn-outline-primary me-2">View</Link>
                {user && Number(user.id) === Number(p.user_id || p.id_user || p.userId) && (
                  <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(p.id)}>Delete</button>
                )}
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={()=>setPage(p=>Math.max(1, p-1))}>Prev</button>
            <div>Page {page}</div>
            <button className="btn btn-secondary" onClick={()=>setPage(p=>p+1)}>Next</button>
          </div>
        </>
      )}
    </div>
  )
}
