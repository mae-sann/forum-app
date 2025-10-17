import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPosts, replyPost, deleteReply } from '../api'

// Because the API didn't provide a "get single post" endpoint, we'll load a page of posts and find the post by id.
// If you have a dedicated endpoint, replace accordingly.
export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [replies, setReplies] = useState([])
  const [replyText, setReplyText] = useState('')
  const user = JSON.parse(localStorage.getItem('forum_user') || 'null')

  const load = async () => {
    try {
      const data = await getPosts(1) // load first page; change logic if needed
      const all = Array.isArray(data) ? data : (data.posts || [])
      const found = all.find(p => String(p.id) === String(id))
      if (found) {
        setPost(found)
        // some APIs embed replies in post object like found.replies — if not, you might need separate endpoint
        setReplies(found.replies || [])
      } else {
        setPost({ id, post: 'Post not found' })
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{ load() }, [id])

  const submitReply = async (e) => {
    e.preventDefault()
    if (!user) { alert('Please login to reply'); return }
    try {
      const res = await replyPost(user.id, id, replyText)
      if (res && res.success) {
        setReplyText('')
        load()
      } else alert('Reply failed')
    } catch (err) {
      console.error(err)
      alert('Error replying')
    }
  }

  const removeReply = async (replyId) => {
    if (!window.confirm('Delete this reply?')) return
    try {
      const res = await deleteReply(replyId)
      if (res && res.success) load()
      else alert('Delete reply failed')
    } catch (err) {
      console.error(err)
    }
  }

  if (!post) return <div>Loading post...</div>

  return (
    <div>
      <h3>Post</h3>
      <div className="card mb-3">
        <div className="card-body">
          <h5>{post.username || post.user || 'User'}</h5>
          <p>{post.post}</p>
        </div>
      </div>

      <h5>Replies</h5>
      {replies.length === 0 && <div>No replies yet</div>}
      {replies.map(r => (
        <div key={r.id} className="border p-2 mb-2">
          <strong>{r.username || r.user}</strong>
          <p>{r.reply || r.text}</p>
          {user && Number(user.id) === Number(r.user_id) && (
            <button className="btn btn-sm btn-danger" onClick={()=>removeReply(r.id)}>Delete</button>
          )}
        </div>
      ))}

      <div className="card mt-3 p-3">
        <form onSubmit={submitReply}>
          <div className="mb-2">
            <textarea className="form-control" value={replyText} onChange={e=>setReplyText(e.target.value)} required />
          </div>
          <button className="btn btn-primary">Reply</button>
        </form>
      </div>
    </div>
  )
}
