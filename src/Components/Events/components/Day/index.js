import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Modal from '../../../Modal'
import { getDayNumber, getRemindersByDay } from '../../../../utils'
import { useActions } from '../../../../hooks'
import { calendarActions } from '../../../../Store/redux/calendar'
import { remindersActions } from '../../../../Store/redux/reminders'

import Reminder from '../Reminder'
import RemindersList from '../RemindersList'

const Day = (props) => {
  const { day, isSelected, isToday, isCurrentMonth, isWeekend } = props
  const remindersInThisDay = useSelector(({ reminders }) =>
    getRemindersByDay(reminders, day)
  )

  const { removeAllReminders } = useActions(remindersActions)
  const { selectDay } = useActions(calendarActions)

  const [on, toggle] = useState(false)

  const onToggle = useCallback(() => toggle((value) => !value), [])

  const onClick = useCallback(() => {
    selectDay(day)
    onToggle()
  }, [day, onToggle, selectDay])

  return (
    <>
      <Modal on={on && remindersInThisDay.length !== 0} toggle={toggle}>
        <div className="notification" style={{ paddingRight: '1.5em' }}>
          {remindersInThisDay.map((reminder) => (
            <Reminder key={reminder.id} {...reminder} />
          ))}
          <button
            className="button is-warning"
            onClick={() => removeAllReminders(day)}
          >
            Remove all
          </button>
        </div>
      </Modal>
      <div
        className={`
          ${isWeekend && 'has-text-info'}
          ${isCurrentMonth ? 'has-text-black' : 'has-text-grey'}
          ${
            isToday
              ? 'has-background-info'
              : (isSelected && 'has-background-warning') ||
                (isWeekend && 'has-background-light')
          }
        `}
        style={{
          flex: 1,
          height: '6.4vw',
          borderLeft: 'solid 1px #EFEFEF',
          cursor: 'pointer',
          transition: 'all .2s',
        }}
        onClick={onClick}
      >
        <div className="columns">
          <div className="column is-2">
            <span
              className="has-text-weight-semibold"
              style={{
                fontSize: '1vw',
                padding: '8px 0 0 8px',
              }}
            >
              {getDayNumber(day)}
            </span>
          </div>
          <div className="column is-mobile">
            <RemindersList day={day} />
          </div>
        </div>
      </div>
    </>
  )
}

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  isSelected: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  isCurrentMonth: PropTypes.bool.isRequired,
  isWeekend: PropTypes.bool.isRequired,
}

export default Day
