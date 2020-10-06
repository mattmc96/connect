import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { useAuth0 } from '@auth0/auth0-react'
import '../../Styles.scss'

import JSONPretty from 'react-json-pretty'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  console.log(user)
  return (
    isAuthenticated && (
      <>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <JSONPretty data={user} />
        {/* <di className="chart"></di> */}
      </>
    )
  )
}

export default Profile
