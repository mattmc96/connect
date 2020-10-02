import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format as formatFn,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

export const now = new Date()

export const getDayNumber = (date = now) => formatFn(date, 'd')

export const getDays = (date = now) =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  })

export const getWeeks = (date = now) =>
  eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })

export const getWeekDays = (date = now, format = 'EEEE') => {
  const arr = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  })
  return arr.reduce((accum, day) => [...accum, formatFn(day, format)], [])
}

export const getPrettyMonthTitle = (date = now) =>
  `${formatFn(date, 'LLLL')} ${formatFn(date, 'yyyy')}`
