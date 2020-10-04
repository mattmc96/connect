import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Calendar from './Components/Events/Calendar'
import Profile from './Components/Auth/Profile'
import NavBar from './Components/NavBar/NavBar'
import Join from './Components/Chat/Join'
import Chat from './Components/Chat/Chat'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/join" component={Join} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </>
  )
}

export default App
