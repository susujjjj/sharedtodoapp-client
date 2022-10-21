import React, { useState } from 'react'

const EditTodoForm = ({ todo, onUpdate, onClose }) => {
  const [text, setText] = useState(todo.text)

  const onSubmit = async (event) => {
    event.preventDefault()
    onUpdate(todo.id, text)
    onClose()
  }
  const onChange = (event) => {
    setText(event.target.value)
  }

  return (
    <form className="edit-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your todo"
        value={text}
        required
        autoFocus
        onChange={onChange}
        className="form-input todo-input"
      />
      <div className="edit-todo-form-action">
        <button type="submit" className="form-btn-update">
          Update
        </button>
        <button type="button" className="form-btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditTodoForm
