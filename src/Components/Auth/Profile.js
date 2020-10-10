import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import GithubRepoFetch from '../Data/githubRepoFetch'
import { useAuth0 } from '@auth0/auth0-react'
import '../../Styles.scss'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  console.log(user)
  return (
    isAuthenticated && (
      <>
        <>
          <h1 className="gitline">Github Api Timeline</h1>
          <img
            className="gitgraph"
            src={`https://ghchart.rshah.org/${user.nickname}`}
            alt=" Github chart api chart"
          />
          <img className="profile-image" src={user.picture} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div data={user}></div>
          <GithubRepoFetch className="repo-search" />
        </>
      </>
    )
  )
}

export default Profile
