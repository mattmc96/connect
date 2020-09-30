import React, { useState, useEffect } from 'react'
import User from './mockData.js/User'
import Repos from './mockData.js/Repos'
import Followers from './mockData.js/Followers'
import Axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState
  return (
    <GithubContext.Provider value={'Hello'}>{children}</GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
