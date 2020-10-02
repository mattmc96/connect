import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const LogoutButton = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }))
  const classes = useStyles()
  const { logout } = useAuth0()

  return (
    <>
      <Button
        type="submit"
        size="small"
        variant="contained"
        onClick={() => logout()}
        color="secondary"
        startIcon={<ExitToAppIcon />}
        className={classes.button}
      >
        SIGNOUT
      </Button>
    </>
  )
}

export default LogoutButton
