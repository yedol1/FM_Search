import Axios, { AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default axios
