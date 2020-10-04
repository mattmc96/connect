import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

const Login = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      primary: {
        main: green[500],
      },
      margin: theme.spacing(1),
    },
  }))
  const primary = green.A400

  const classes = useStyles()
  const { loginWithRedirect } = useAuth0()

  return (
    <>
      <Button
        type="submit"
        variant="outlined"
        size="small"
        onClick={() => loginWithRedirect()}
        color="primary"
        startIcon={<GitHubIcon />}
        className={classes.button}
      >
        LOGIN
      </Button>
    </>
  )
}

export default Login
