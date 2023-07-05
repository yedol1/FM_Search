import { useState, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'
import styles from '../../styles/SearchList.module.css'
import { fetchSearchData } from '../../lib/api/searchAPI'
import { Player, SearchProps } from './types'
import useCheckBoxOption, {
  CheckBoxOption,
} from '../../hooks/useCheckBoxOption'

export async function getServerSideProps(context) {
  const page = 1
  const filter = 'ca'
  const verify = true
  const responseData = await fetchSearchData(1, filter, verify)
  return {
    props: {
      initialData: responseData,
      page,
      filter,
      verify,
    },
  }
}

const Search: React.FC<SearchProps> = ({
  initialData,
  page: initialPage,
  filter: initialFilter,
  verify: initialVerify,
}) => {
  const [players, setPlayers] = useState<Player[]>(initialData)
  const [page, setPage] = useState<number>(initialPage)
  const [endPage, setEndPage] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [verify, setVerify] = useState<boolean>(initialVerify)
  const [filter, setFilter] = useState<string>(initialFilter)
  const { options, handleCheckBoxChange } = useCheckBoxOption()
  const positions = [
    'GK',
    'DL',
    'DC',
    'DR',
    'WBL',
    'WBR',
    'DM',
    'ML',
    'MC',
    'MR',
    'AML',
    'AMC',
    'AMR',
    'ST',
  ]
  console.log(options)
  useEffect(() => {
    if (!endPage) {
      fetchPage(page, filter, verify, options)
    }
    setEndPage(false)
  }, [page, filter, verify, options])

  const fetchPage = async (
    pageNumber: number,
    filter: string,
    verify: boolean,
    options: CheckBoxOption[]
  ): Promise<void> => {
    try {
      const responseData = await fetchSearchData(
        pageNumber,
        filter,
        verify,
        options
      )

      if (responseData.length === 0) {
        setEndPage(true)
        alert('더 이상 조건을 만족하는 선수는 없습니다.')
        return
      }

      setPlayers(responseData)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  const handleFilterChange = (newFilter: string): void => {
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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value)
  }

  const handleSearch = async () => {
    // setPage(1)
    // await fetchPage(1)
  }
  return (
    <div>
      <h1>Search</h1>
      <section>
        <fieldset>
          <legend>Positions</legend>
          {positions.map((position) => (
            <div key={position}>
              <input
                type="checkbox"
                id={position}
                name="position"
                value={position}
                onChange={handleCheckBoxChange()}
              />
              <label htmlFor={position}>{position}</label>
            </div>
          ))}
        </fieldset>
      </section>

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

export default Search
