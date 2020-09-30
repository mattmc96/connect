import React from 'react'
import LoginButton from './Components/Auth/LoginButton'
import LogoutButton from './Components/Auth/LogoutButton'
import Profile from './Components/Auth/Profile'
import GithubRepoFetch from './Components/Data/githubRepoFetch'
import Main from './Components/Chat/Main'
import './Styles.scss'

function App() {
  return (
    // <>
    //   const api_call = await fetch(`https://api.github.com/users/${user}
    // ?client_id=${client_id}&client_secret=${client_secret}`); const data =
    //     await api_call.json() return {data}
    // </>
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <GithubRepoFetch />
      <Main />
    </>
  )
}

export default App
