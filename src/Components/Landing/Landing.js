import React from 'react'
import { useSpring, animated } from 'react-spring'
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
    config: { mass: 5, tension: 350, friction: 40 },
  }))
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
    </div>
  )
}

export default Landing
