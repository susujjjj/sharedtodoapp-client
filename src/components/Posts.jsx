import React, { memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Banner from './Banner'
import NewTodoForm from './NewTodoForm'
import TodoCard from './TodoCard'
import { useAuth } from '../context/AuthContext'

const Posts = memo(({ todoService, username, addable }) => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const history = useHistory()
  const { user } = useAuth()

  useEffect(() => {
    todoService
      .getPosts(username)
      .then((post) => setPosts([...post]))
      .catch(onError)

    const stopSync = todoService.onSync((todo) => onCreated(todo))
    return () => stopSync()
  }, [todoService, username, user, todoService.updateTodo])

  const onCreated = (todo) => {
    setPosts((posts) => [todo, ...posts])
  }

  const onDelete = (todoId) =>
    todoService
      .deleteTodo(todoId)
      .then(() =>
        setPosts((posts) => posts.filter((todo) => todo.id !== todoId)),
      )
      .catch((error) => setError(error.toString()))

  const onTodoDoneClick = (todoId, text, isCompleted) =>
    todoService
      .updateTodo(todoId, text, isCompleted)
      .then((updated) =>
        setPosts((posts) =>
          posts.map((item) => (item.id === updated.id ? updated : item)),
        ),
      )
      .catch((error) => error.toString())

  const onUpdate = (todoId, text, isCompleted) =>
    todoService
      .updateTodo(todoId, text, isCompleted)
      .then((updated) =>
        setPosts((posts) =>
          posts.map((item) => (item.id === updated.id ? updated : item)),
        ),
      )
      .catch((error) => error.toString())

  const onUsernameClick = (todo) => history.push(`/${todo.username}`)

  const onError = (error) => {
    setError(error.toString())
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  return (
    <>
      {addable && <NewTodoForm todoService={todoService} onError={onError} />}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {posts.length === 0 && <p className="posts-empty">No Todo Yet</p>}
      <ul className="posts">
        {posts.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            owner={todo.username === user.username}
            onDelete={onDelete}
            onUpdate={onUpdate}
            doneComplete={todo.isCompleted}
            onUsernameClick={onUsernameClick}
            onTodoDoneClick={onTodoDoneClick}
          />
        ))}
      </ul>
    </>
  )
})
export default Posts
