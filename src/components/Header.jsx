import React, { memo } from 'react'

const Header = memo(({ username, onLogout, onMyPosts, onAllPosts }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1 className="logo-name">WeTodo</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {username && (
        <nav className="menu">
          <button onClick={onAllPosts}>All Posts</button>
          <button onClick={onMyPosts}>My Posts</button>
          <button className="menu-item-logout" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  )
})

export default Header
