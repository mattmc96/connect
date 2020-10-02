import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import { SocialMediaIconsReact } from 'social-media-icons-react'
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
        variant="contained"
        size="small"
        onClick={() => loginWithRedirect()}
        color="primary"
        startIcon={
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            borderWidth="5"
            borderStyle="solid"
            icon="github"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="rgba(15,16,16,1)"
            iconSize="5"
            roundness="20%"
            // url="https://some-website.com/my-social-media-url"
            // onClick={() => loginWithRedirect()}
            size="5"
          />
        }
        className={classes.button}
      >
        LOGIN
      </Button>
    </>
  )
}

export default Login
