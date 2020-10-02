import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { useAuth0 } from '@auth0/auth0-react'

import JSONPretty from 'react-json-pretty'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  console.log(user)
  return (
    isAuthenticated && (
      <>
        <Avatar src={user.picutre} alt="Remy Sharp" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <JSONPretty data={user} />
      </>
    )
  )
}

export default Profile
