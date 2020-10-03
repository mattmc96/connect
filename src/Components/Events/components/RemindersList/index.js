import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { MiniReminder } from './components'
import { getRemindersByDay } from '../../../../utils'

const REMINDERS_TO_SHOW_LIMIT = 4

const RemindersList = (props) => {
  const { day } = props
  const remindersInThisDay = useSelector(({ reminders }) =>
    getRemindersByDay(reminders, day)
  )

  return (
    <div>
      {remindersInThisDay.slice(0, REMINDERS_TO_SHOW_LIMIT).map((reminder) => (
        <MiniReminder key={reminder.id} {...reminder} />
      ))}
      {remindersInThisDay.length > REMINDERS_TO_SHOW_LIMIT && <p>...</p>}
    </div>
  )
}

RemindersList.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
}

export default RemindersList
