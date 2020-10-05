import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { format, getDay, getMonth, getYear, parseISO } from 'date-fns'

import Modal from '../../../Modal'
import { useFormInput, useTimeInput } from '../../../../hooks'

const defaultHour = '12:00'
const defaultHourArray = defaultHour.split(':')

const AddReminder = (props) => {
  const { addReminder } = props
  const selectedDay = useSelector(({ calendar }) => calendar.selectedDay)
  const [on, toggle] = useState(false)
  const onToggle = useCallback(() => toggle((value) => !value), [])

  const initialDate = useMemo(
    () => format(selectedDay, 'yyyy-MM-dd').toString(),
    [selectedDay]
  )

  const text = useFormInput('Reminder')
  const group = useFormInput('Any')
  const date = useFormInput(initialDate)
  const { valueAsDate, ...hour } = useTimeInput(defaultHour)
  const color = useFormInput('#A4A4A4')

  const onSubmit = useCallback(() => {
    if (date.value && text.value) {
      const dateValue = parseISO(date.value)
      const hourValue =
        hour.value === defaultHour
          ? new Date(
              getYear(dateValue),
              getMonth(dateValue),
              getDay(dateValue),
              Number(defaultHourArray[0]),
              Number(defaultHourArray[1])
            )
          : valueAsDate

      addReminder({
        text: text.value,
        group: group.value,
        date: dateValue,
        hour: hourValue,
        color: color.value,
      })
    }
    onToggle()
  }, [
    addReminder,
    group.value,
    color.value,
    date.value,
    hour.value,
    onToggle,
    text.value,
    valueAsDate,
  ])

  return (
    <>
      <di
        className="button is-medium is-link is-pulled-right"
        onClick={onToggle}
        style={{ fontSize: '1.3vw' }}
      >
        <span className="icon has-text-white is-large">
          <i className="fas fa-plus" />
        </span>
        <span>Add reminder</span>
      </di>
      <Modal on={on}>
        <div className="notification">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Reminder</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    maxLength={30}
                    {...text}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Team</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input" type="group" {...group} />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Date</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input" type="date" {...date} />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Hour</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input" type="time" {...hour} />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Color</label>
            </div>
            <div className="field-body is-narrow">
              <div className="field">
                <div className="control">
                  <input className="input" type="color" {...color} />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button onClick={onSubmit} className="button is-success">
                Add
              </button>
            </div>
            <div className="control">
              <button onClick={onToggle} className="button is-warning">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

AddReminder.propTypes = {
  addReminder: PropTypes.func.isRequired,
}

export default AddReminder
