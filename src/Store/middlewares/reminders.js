import { remindersTypes } from '../redux/reminders'

const addId = () => (next) => (action) => {
  const newAction = {
    ...action,
    payload: {
      ...action.payload,
      id: new Date().toISOString(),
    },
  }

  if (action.type !== remindersTypes.ADD_REMINDER) {
    next(action)
  } else {
    next(newAction)
  }
}

export default [addId]
