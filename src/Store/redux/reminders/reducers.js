import { isSameDay } from 'date-fns'

import { initialState } from '../../store'

import types from './types'

const calendar = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CLEAR: {
      return initialState.reminders
    }
    case types.ADD_REMINDER: {
      return [...state, payload]
    }
    case types.REMOVE_REMINDER: {
      const indexToDelete = state.findIndex((el) => el.id === payload)
      return [
        ...state.slice(0, indexToDelete),
        ...state.slice(indexToDelete + 1),
      ]
    }
    case types.REMOVE_ALL_REMINDERS: {
      return [...state.filter((reminder) => !isSameDay(reminder.date, payload))]
    }
    default:
      return state
  }
}

export default calendar
