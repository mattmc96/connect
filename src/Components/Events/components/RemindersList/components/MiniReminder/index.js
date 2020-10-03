import React from 'react'
import PropTypes from 'prop-types'

const MiniReminder = (props) => {
  const { text, city, color } = props

  const title = `${text} - ${city}`

  return (
    <div
      data-testid="mini-reminder"
      style={{
        backgroundColor: color,
        borderRadius: '5px',
        margin: '.1vw .1vw',
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: '.8vw',
          padding: '0 5px',
        }}
      >
        {title.length > 16 ? `${title.substring(0, 16)}...` : title}
      </span>
    </div>
  )
}

MiniReminder.propTypes = {
  text: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default MiniReminder
