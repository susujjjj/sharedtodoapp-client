import { Switch, Route, useHistory } from 'react-router-dom'
import Header from './components/Header'
import AllPosts from './pages/AllPosts'
import MyPosts from './pages/MyPosts'
import { useAuth } from './context/AuthContext'

function App({ todoService }) {
  const history = useHistory()
  const { user, logout } = useAuth()

  const onAllPosts = () => {
    history.push('/')
  }

  const onMyPosts = () => {
    history.push(`/${user.username}`)
  }

  const onLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout()
      history.push('/')
    }
  }

  return (
    <div className="app">
      <Header
        username={user.username}
        onLogout={onLogout}
        onAllPosts={onAllPosts}
        onMyPosts={onMyPosts}
      />
      <Switch>
        (
        <>
          <Route exact path="/">
            <AllPosts todoService={todoService} />
          </Route>
          <Route exact path="/:username">
            <MyPosts todoService={todoService} />
          </Route>
        </>
        )
      </Switch>
    </div>
  )
}

export default App
