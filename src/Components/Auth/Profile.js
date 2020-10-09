import React from 'react'
import Avatar from '@material-ui/core/Avatar'
// import Pie from '.././Profile/Charts/Pie'
import { useAuth0 } from '@auth0/auth0-react'
import '../../Styles.scss'

import JSONPretty from 'react-json-pretty'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  console.log(user)
  return (
    isAuthenticated && (
      <>
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {/* <Pie data={user.nickname} /> */}
          <JSONPretty data={user} />
          <img
            src={`https://ghchart.rshah.org/${user.nickname}`}
            alt="2016rshah's Github chart"
          />
        </>
      </>
    )
  )
}

export default Profile
