import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { useActions } from '../../../../hooks'
import { remindersActions } from '../../../../Store/redux/reminders'

const Reminder = (props) => {
  const { id, text, group, date, hour, color } = props
  const { removeReminder } = useActions(remindersActions)

  const title = `${text} - ${group}`

  return (
    <div
      className="notification"
      style={{
        backgroundColor: color,
      }}
    >
      <button className="delete" onClick={() => removeReminder(id)} />
      <p
        style={{
          color: 'white',
          padding: '0 5px',
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: 'white',
          padding: '0 5px',
        }}
      >
        {format(date, 'PPPP')}
      </p>
      <p
        style={{
          color: 'white',
          padding: '0 5px',
        }}
      >
        {format(hour, 'pp')}
      </p>
    </div>
  )
}

Reminder.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hour: PropTypes.instanceOf(Date).isRequired,
  color: PropTypes.string.isRequired,
}

export default Reminder
