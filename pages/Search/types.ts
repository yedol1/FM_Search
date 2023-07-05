export interface Player {
  UID: string
  ca: number
  pa_converted: number
  'Date of birth': Date
  Name: string
  Position: string
  Nationality: string
  Club: string
  Values_column: number | string
  Salary: number
}

export interface SearchProps {
  initialData: Player[]
  page: number
  filter: string
  verify: boolean
}
