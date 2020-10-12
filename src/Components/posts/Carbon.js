import React from 'react'
import { Link } from 'react-router-dom'
import Carbon from '../../assets/carbon.jpg'
import './post.scss'

const Posts = () => {
  return (
    <>
      <a
        href="https://carbon.now.sh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Carbon} alt="nothing" className="carbonimg" />
      </a>
    </>
  )
}
export default Posts
