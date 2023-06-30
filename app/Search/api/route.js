import { NextResponse } from 'next/server'
import axios from './axios'

export async function GET(page, filter, verify) {
  const response = await axios.get('http://localhost:3000/Search/api/data', {
    params: {
      page: page,
      filter: filter,
      verify: verify,
    },
  })
  const data = await response.json()
  return NextResponse.json(data)
}
