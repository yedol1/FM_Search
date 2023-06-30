'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import styles from '../styles/SearchList.module.css'
import axios from './api/axios'
import { GET } from './api/route'

// export async function getServerSideProps(context) {
//   const page = 1
//   const filter = 'ca'
//   const verify = true
//   const responseData = await fetchSearchData(1, filter, verify)
//   return {
//     props: {
//       initialData: responseData,
//       page,
//       filter,
//       verify,
//     },
//   }
// }

export default function Search() {
  const [players, setPlayers] = useState([])
  const [page, setPage] = useState(1)
  const [endPage, setEndPage] = useState(false)
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [verify, setVerify] = useState(true)
  const [filter, setFilter] = useState('ca')

  useEffect(() => {
    if (!endPage) {
      fetchPage(page, filter, verify)
    }
    setEndPage(false)
  }, [page, filter, verify])

  const fetchPage = async (pageNumber, filter, verify) => {
    const responseData = await GET(pageNumber, filter, verify)

    if (responseData.length === 0) {
      setEndPage(true)
      alert('더 이상 조건을 만족하는 선수는 없습니다.')
      return
    }

    setPlayers(responseData)
  }
  const handleFilterChange = (newFilter) => {
    if (filter === newFilter) {
      setVerify(!verify)
    } else {
      setVerify(true)
    }
    setFilter(newFilter)
  }
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1) // 이전 페이지로 이동
    } else {
      setEndPage(true)
      alert('첫 페이지입니다.')
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePositionChange = (e) => {
    setPosition(e.target.value)
  }

  const handleSearch = async () => {
    // setPage(1)
    // await fetchPage(1)
  }
  return (
    <div>
      <h1>Search</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <input
          type="text"
          value={position}
          onChange={handlePositionChange}
          placeholder="Position"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleFilterChange('ca')}>현재능력</th>
            <th onClick={() => handleFilterChange('pa_converted')}>
              최대 잠재능력
            </th>
            <th onClick={() => handleFilterChange('Date of birth')}>생일</th>
            <th onClick={() => handleFilterChange('Name')}>이름</th>
            <th onClick={() => handleFilterChange('Values_column')}>가치</th>
            <th onClick={() => handleFilterChange('Salary')}>급여</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.UID}>
              <td>{player.ca}</td>
              <td>{player.pa_converted}</td>
              <td>
                {new Date(player['Date of birth']).toISOString().split('T')[0]}
              </td>
              <td>
                <div>{player.Name}</div>
                <div>{player.Position}</div>
                <div>{player.Nationality}</div>
                <div>{player.Club}</div>
              </td>
              {player.Values_column === -1 ? (
                <td>Not For Sale</td>
              ) : (
                <td>€ {Number(player.Values_column).toLocaleString()}</td>
              )}
              <td>€ {Number(player.Salary).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        {page > 1 && <button onClick={handlePrevPage}>Prev</button>}
        <p>{page}</p>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}
