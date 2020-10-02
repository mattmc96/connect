import { format, isSameDay } from 'date-fns'

export const getRemindersByDay = (reminders, day) =>
  reminders
    .filter((reminder) => isSameDay(day, reminder.date))
    .sort((a, b) => format(a.hour, 't') - format(b.hour, 't'))
