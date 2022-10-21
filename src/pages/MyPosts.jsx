import React from 'react'
import { useParams } from 'react-router-dom'
import Posts from '../components/Posts'

const MyPosts = ({ todoService }) => {
  const { username } = useParams()
  return <Posts todoService={todoService} username={username} addable={false} />
}

export default MyPosts
