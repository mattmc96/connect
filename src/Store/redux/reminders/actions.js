import { createAction } from 'redux-actions'

import types from './types'

const clear = createAction(types.CLEAR)
const addReminder = createAction(types.ADD_REMINDER)
const removeReminder = createAction(types.REMOVE_REMINDER)
const removeAllReminders = createAction(types.REMOVE_ALL_REMINDERS)

export default {
  clear,
  addReminder,
  removeReminder,
  removeAllReminders,
}
