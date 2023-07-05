import { AxiosResponse } from 'axios'
import axios from './index'

interface Option {
  key: string
  value: string | number
  operator: string
  type?: string
}

export const fetchSearchData = async (
  page: number,
  filter: string,
  verify: boolean,
  options: Option[] = []
): Promise<any> => {
  const response: AxiosResponse = await axios.get('/api/Search', {
    params: {
      page: page,
      filter: filter,
      verify: verify,
      options: JSON.stringify(options),
    },
  })

  return response.data
}
