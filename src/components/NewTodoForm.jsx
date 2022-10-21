import React, { useState } from 'react'

const NewTodoForm = ({ todoService, onError }) => {
  const [todo, setTodo] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    todoService
      .postTodo(todo)
      .then((created) => {
        setTodo('')
      })
      .catch(onError)
  }

  const onChange = (event) => {
    setTodo(event.target.value)
  }

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your todo"
        value={todo}
        required
        autoFocus
        onChange={onChange}
        className="form-input todo-input"
      />
      <button type="submit" className="form-btn">
        Post
      </button>
    </form>
  )
}

export default NewTodoForm
