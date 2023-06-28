import axios from '.'

export const fetchSearchData = async (page, filter, verify) => {
  const response = await axios.get('/api/data', {
    params: {
      page: page,
      filter: filter,
      verify: verify,
    },
  })

  return response.data
}
