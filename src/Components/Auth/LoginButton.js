import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const Login = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }))
  const classes = useStyles()
  const { loginWithRedirect } = useAuth0()

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        size="small"
        onClick={() => loginWithRedirect()}
        color="primary"
        startIcon={<VpnKeyIcon />}
        className={classes.button}
      >
        Log In
      </Button>
    </>
  )
}

export default Login
