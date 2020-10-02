import { useState } from 'react'

function useTimeInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  const [valueAsDate, setValueAsDate] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
    setValueAsDate(e.target.valueAsDate)
  }

  return {
    value,
    valueAsDate,
    onChange: handleChange,
  }
}

export default useTimeInput
