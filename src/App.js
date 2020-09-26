import React from 'react'
import LoginButton from './Components/Auth/LoginButton'
import LogoutButton from './Components/Auth/LogoutButton'
import Profile from './Components/Auth/Profile'
import './Styles.scss'

function App() {
  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </>
  )
}

export default App
