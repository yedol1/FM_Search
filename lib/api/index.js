import Axios from 'axios'

const axios = Axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'http://localhost:3000',
})

export default axios
