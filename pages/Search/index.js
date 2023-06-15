import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

const PER_PAGE = 20

export async function getServerSideProps(context) {
  const page = context.query.page ? context.query.page : 1
  const response = await axios.get(
    `http://localhost:3000/api/data?page=${page}`
  )

  return {
    props: {
      initialData: response.data,
      page,
    },
  }
}

export default function Search({ initialData, page: initialPage }) {
  const [players, setPlayers] = useState(initialData)
  const [page, setPage] = useState(initialPage)
  const [endPage, setEndPage] = useState(false)

  useEffect(() => {
    if (page >= initialPage && !endPage) {
      fetchPage(page)
    } else {
      setEndPage(false)
    }
  }, [page, initialPage, endPage])

  const fetchPage = async (pageNumber) => {
    const response = await axios.get(`/api/data?page=${pageNumber}`)
    const newData = response.data

    if (newData.length === 0) {
      setEndPage(true)

      if (page > 1) {
        setPage(page - 1) // 이전 페이지로 돌아감
      }

      alert('더 이상 조건을 만족하는 선수는 없습니다.')
      return
    }

    setPlayers(newData)
  }

  const handlePrevPage = () => {
    const prevPage = page > 1 ? page - 1 : 1
    setPage(prevPage)
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <h1>Search</h1>
      {players.map((player, index) => (
        <div key={index}>
          <h2>{player.Name}</h2>
        </div>
      ))}
      <div>
        {page > 1 && <button onClick={handlePrevPage}>Prev</button>}
        <p>{page}</p>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}
