import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../../hooks'
import { getPrettyMonthTitle, getWeekDays, getWeeks } from '../../utils'
import { calendarActions } from '../../Store/redux/calendar'
import { remindersActions } from '../../Store/redux/reminders'

import { AddReminder, Week } from './components'

const Calendar = () => {
  const date = useSelector(({ calendar }) => calendar.date)
  const { nextMonth, previousMonth } = useActions(calendarActions)
  const { addReminder } = useActions(remindersActions)

  const weekDays = useMemo(() => getWeekDays(), [])
  const weeks = useMemo(() => getWeeks(date), [date])

  return (
    <>
      <div
        className="container"
        style={{
          display: 'block',
          width: '80vw',
          border: 'solid 1px #EFEFEF',
          margin: '10px auto',
          boxShadow: '0 0 15px 0 lightgrey',
        }}
      >
        <section className="calendar is-bordered">
          <header className="header">
            <div
              className="has-background-grey has-text-white is-uppercase"
              style={{
                display: 'flex',
                fontWeight: '600',
                fontSize: '2vw',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <a
                className="has-text-white"
                style={{ fontSize: '1.3vw' }}
                onClick={() => previousMonth()}
              >
                <span
                  className="icon is-large"
                  style={{
                    cursor: 'pointer',
                    fontSize: '1vw',
                  }}
                >
                  <i className="fas fa-arrow-left" />
                </span>
                <span>Previous</span>
              </a>
              {getPrettyMonthTitle(date)}
              <a
                className="has-text-white"
                style={{ fontSize: '1.3vw' }}
                onClick={() => nextMonth()}
              >
                <span>Next</span>
                <span
                  className="icon is-large"
                  style={{
                    cursor: 'pointer',
                    fontSize: '1vw',
                  }}
                >
                  <i className="fas fa-arrow-right" />
                </span>
              </a>
            </div>
            <div
              className="has-background-info has-text-white has-text-weight-semibold"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                cursor: 'default',
                fontSize: '1vw',
                padding: '5px 0',
              }}
            >
              {weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
          </header>
          <div>
            {weeks.map((week) => (
              <Week key={week} date={date} week={week} />
            ))}
          </div>
        </section>
      </div>
      <div className="container" style={{ width: '80vw' }}>
        <AddReminder addReminder={addReminder} />
      </div>
    </>
  )
}

Calendar.propTypes = {}

export default Calendar
