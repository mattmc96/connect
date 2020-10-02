import { addMonths, subMonths } from 'date-fns'

import { initialState } from '../../store'

import types from './types'

const calendar = (state = {}, action) => {
  const { date } = state
  const { type, payload } = action
  switch (type) {
    case types.CLEAR: {
      return initialState.calendar
    }
    case types.NEXT_MONTH: {
      return {
        ...state,
        date: addMonths(date, 1),
      }
    }
    case types.PREVIOUS_MONTH: {
      return {
        ...state,
        date: subMonths(date, 1),
      }
    }
    case types.SELECT_DAY: {
      return {
        ...state,
        selectedDay: payload,
      }
    }
    default:
      return state
  }
}

export default calendar
