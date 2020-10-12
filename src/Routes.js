import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Calendar from './Components/Events/Calendar'
import Profile from './Components/Auth/Profile'
import NavBar from './Components/NavBar/NavBar'
import Join from './Components/Chat/Join'
import Chat from './Components/Chat/Chat'
import Feed from './Components/posts/Feed'

const App = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname === '/' ? null : <NavBar />}
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/join" component={Join} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/chat" component={Chat} />
        <Route path="/post" component={Feed} />
        <Route
          path="/readme"
          component={() => {
            global.window &&
              (global.window.location.href =
                'https://github.com/mattmc96/connect/blob/master/README.md')
            return null
          }}
        />
      </Switch>
    </div>
  )
})
// comment
export default App
