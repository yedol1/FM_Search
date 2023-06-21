import axios from '.'

export const fetchSearchData = async (page, name, position) => {
  const response = await axios.get('/api/data', {
    params: {
      page: page,
      name: name,
      position: position,
    },
  })

  return response.data
}
