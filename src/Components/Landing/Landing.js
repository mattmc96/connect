import React from 'react'
import {
  createMuiTheme,
  // withStyles,
  useStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useAuth0 } from '@auth0/auth0-react'
import { green, purple } from '@material-ui/core/colors'
import { useSpring, animated } from 'react-spring'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Slides from './Animations/Slides'
import images from './img/images'
import './Styles.scss'
import '../../Styles.scss'

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function Landing() {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 8, tension: 350, friction: 30 },
  }))

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  })
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }))

  const { loginWithRedirect } = useAuth0()

  const classes = useStyles()
  return (
    <div className="body">
      <animated.div
        class="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      />
      <React.Fragment className="slides-box">
        <Slides />
      </React.Fragment>
      <div className="jumbo">
        <Jumbotron className="jumbo">
          <h1>Welcome!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                size="large"
                type="submit"
                // TODO MAKE THIS A LGOIN BUTTON OR REDIRECT OF SOME SORT
                onClick={() => loginWithRedirect()}
              >
                Get Started
              </Button>
            </ThemeProvider>
          </p>
        </Jumbotron>
      </div>
    </div>
  )
}

export default Landing
