import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import styles from '../../styles/SearchList.module.css'

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
    let newData = response.data

    if (newData.length === 0) {
      setEndPage(true)

      if (page > 1) {
        setPage(page - 1) // 이전 페이지로 돌아감
      }

      alert('더 이상 조건을 만족하는 선수는 없습니다.')
      return
    }
    // 랜덤포텐인 선수들은 잠재능력의 최대값으로 변경
    newData = newData.map((player) => ({
      ...player,
      pa:
        player.pa < -10
          ? player.pa * -2
          : player.pa < 0
          ? player.pa * -20
          : player.pa,
    }))
    setPlayers(newData)
  }

  const handlePrevPage = () => {
    const prevPage = page > 1 ? page - 1 : 1
    setPage(prevPage)
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }
  console.log(players)
  return (
    <div>
      <h1>Search</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>현재능력</th>
            <th>최대 잠재능력</th>
            <th>생일</th>
            <th>이름</th>
            <th>가치</th>
            <th>급여</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.UID}>
              <td>{player.ca}</td>
              <td>{player.pa}</td>
              <td>
                {new Date(player['Date of birth']).toISOString().split('T')[0]}
              </td>
              <td>
                <div>{player.Name}</div>
                <div>{player.Position}</div>
                <div>{player.Nationality}</div>
                <div>{player.Club}</div>
              </td>
              <td>€ {Number(player.Values_column).toLocaleString()}</td>
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
