import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section>
          <h2>Banner</h2>
          <div>
            <Link href="/News/FMRelated">FM Related News</Link>
            <Link href="/Search/YearOfPlayers">Player Search</Link>
            <Link href="/Search/Club">Club Players</Link>
            <Link href="/News/GlobalNews">Global Football News</Link>
          </div>
        </section>

        <section>
          <h2>자유게시판 Best 글목록</h2>
          <Link href="/Community/1">Post 1</Link>
          <Link href="/Community/2">Post 2</Link>
          <Link href="/Community/3">Post 3</Link>
          <Link href="/Community/4">Post 4</Link>
          <Link href="/Community/5">Post 5</Link>
        </section>

        <section>
          <h2>가장 많이 선택한 필터목록</h2>
          <Link href="/AISearch">Keyword 1</Link>
          <Link href="/AISearch">Keyword 2</Link>
          <Link href="/AISearch">Keyword 3</Link>
          <Link href="/AISearch">Keyword 4</Link>
          <Link href="/AISearch">Keyword 5</Link>
        </section>

        <section>
          <h2>FM Best 자료</h2>
          <div>
            <Link href="/Community/FMResources">Best 자료1</Link>
            <Link href="/Community/FMResources">Best 자료2</Link>
            <Link href="/Community/FMResources">Best 자료3</Link>
          </div>
        </section>
      </main>

      <footer>
        <p>Footer content goes here</p>
      </footer>
    </div>
  )
}

export default Home
