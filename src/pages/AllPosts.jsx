import React from 'react'
import Posts from '../components/Posts'

const AllPosts = ({ todoService }) => (
  <Posts todoService={todoService} addable={true} />
)

export default AllPosts
