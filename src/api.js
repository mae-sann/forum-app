import axios from 'axios'

const BASE = 'http://hyeumine.com' 

export const getPosts = async (page = 1) => {
  const url = `${BASE}/forumGetPosts.php?page=${page}`
  const resp = await axios.get(url)
  return resp.data
}

export const createUser = async (username, password) => {
  const url = `${BASE}/forumCreateUser.php`
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  const resp = await axios.post(url, params)
  return resp.data
}

export const loginUser = async (username, password) => {
  const url = `${BASE}/forumLogin.php`
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  const resp = await axios.post(url, params)
  return resp.data
}

export const createPost = async (userId, postText) => {
  const url = `${BASE}/forumNewPost.php`
  const params = new URLSearchParams()
  params.append('id', userId)
  params.append('post', postText)
  const resp = await axios.post(url, params)
  return resp.data
}

export const deletePost = async (postId) => {
  const url = `${BASE}/forumDeletePost.php?id=${postId}`
  const resp = await axios.get(url)
  return resp.data
}

export const replyPost = async (userId, postId, replyText) => {
  const url = `${BASE}/forumReplyPost.php`
  const params = new URLSearchParams()
  params.append('user_id', userId)
  params.append('post_id', postId)
  params.append('reply', replyText)
  const resp = await axios.post(url, params)
  return resp.data
}

export const deleteReply = async (replyId) => {
  const url = `${BASE}/forumDeleteReply.php?id=${replyId}`
  const resp = await axios.get(url)
  return resp.data
}
