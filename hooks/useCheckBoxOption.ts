import { useState, ChangeEventHandler } from 'react'

export interface CheckBoxOption {
  key: string
  value: number
  operator: string
}

interface CheckBoxFilterHook {
  options: CheckBoxOption[]
  handleCheckBoxChange: (
    value?: number,
    operator?: string
  ) => ChangeEventHandler<HTMLInputElement>
}

const useCheckBoxOption = (): CheckBoxFilterHook => {
  const [options, setOptions] = useState<CheckBoxOption[]>([])

  const handleCheckBoxChange =
    (value: number = 15, operator: string = '>=') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checkBoxOption = event.target.value
      const isChecked = event.target.checked

      if (isChecked) {
        const newOption: CheckBoxOption = {
          key: checkBoxOption,
          value: value,
          operator: operator,
        }
        setOptions((prevOptions) => [...prevOptions, newOption])
      } else {
        setOptions((prevOptions) =>
          prevOptions.filter((option) => option.key !== checkBoxOption)
        )
      }
    }

  return { options, handleCheckBoxChange }
}

export default useCheckBoxOption
