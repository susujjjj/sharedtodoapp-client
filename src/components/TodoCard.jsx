import React, { memo, useState } from 'react'
import parseDate from '../util/date'
import Avatar from './Avatar'
import EditTodoForm from './EditTodoForm'

const TodoCard = memo(
  ({
    todo,
    owner,
    onDelete,
    onUpdate,
    onTodoDoneClick,
    onUsernameClick,
    doneComplete,
  }) => {
    const { id, username, name, url, createdAt, text } = todo
    const [editing, setEditing] = useState(false)
    const onClose = () => setEditing(false)

    const todoDone = () => {
      onTodoDoneClick(id, text, true)
    }

    const todoContinue = () => {
      onTodoDoneClick(id, text, false)
    }

    return (
      <li className="todo">
        <section className="todo-container">
          <Avatar url={url} name={name} />
          <div className="todo-body">
            <span className="todo-name">{name}</span>
            <span
              className="todo-username"
              onClick={() => onUsernameClick(todo)}
            >
              @{username}
            </span>
            <span className="todo-date"> · {parseDate(createdAt)}</span>
            {todo.isCompleted === true ? (
              <p className="text-done">{text}</p>
            ) : (
              <p>{text}</p>
            )}

            {editing && (
              <EditTodoForm todo={todo} onUpdate={onUpdate} onClose={onClose} />
            )}
          </div>
        </section>
        {owner && (
          <>
            <div className="todo-action">
              <button className="todo-action-btn" onClick={() => onDelete(id)}>
                x
              </button>
              <button
                className="todo-action-btn"
                onClick={() => setEditing(true)}
              >
                ✎
              </button>
              <button
                className="todo-action-btn done"
                onClick={doneComplete === false ? todoDone : todoContinue}
              >
                {doneComplete === true ? 'continue' : 'done'}
              </button>
            </div>
          </>
        )}
      </li>
    )
  },
)
export default TodoCard
