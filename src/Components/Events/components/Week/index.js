import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { isSameDay, isSameMonth, isWeekend } from 'date-fns'

import { getDays, now } from '../../../../utils'

import Day from '../Day'

const Week = (props) => {
  const { date, week } = props

  const selectedDay = useSelector(({ calendar }) => calendar.selectedDay)

  const days = useMemo(() => getDays(week), [week])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderTop: 'solid 1px #EFEFEF',
      }}
    >
      {days.map((day) => (
        <Day
          key={day}
          day={day}
          date={date}
          isWeekend={isWeekend(day)}
          isSelected={isSameDay(day, selectedDay)}
          isToday={isSameDay(day, now)}
          isCurrentMonth={isSameMonth(day, date)}
        />
      ))}
    </div>
  )
}

Week.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  week: PropTypes.instanceOf(Date).isRequired,
}

export default Week
