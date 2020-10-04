import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Calendar from './Components/Events/Calendar'
import Profile from './Components/Auth/Profile'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Chat/Main'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/chat" component={Main} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </Router>
    </>
  )
}

export default App
