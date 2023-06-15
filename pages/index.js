import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section>
          <h2>Banner</h2>
          <div>
            <Link href="/News/FMRelated">FM Related News</Link>
            <Link href="/Search">Player Search</Link>
            <Link href="/Search/Club">Club Players</Link>
            <Link href="/News/GlobalNews">Global Football News</Link>
          </div>
        </section>

        <section>
          <h2>Best Community Posts</h2>
          <Link href="/Community/1">Post 1</Link>
          <Link href="/Community/2">Post 2</Link>
          <Link href="/Community/3">Post 3</Link>
          <Link href="/Community/4">Post 4</Link>
          <Link href="/Community/5">Post 5</Link>
        </section>

        <section>
          <h2>Best AI Search Keywords</h2>
          <Link href="/AISearch">Keyword 1</Link>
          <Link href="/AISearch">Keyword 2</Link>
          <Link href="/AISearch">Keyword 3</Link>
          <Link href="/AISearch">Keyword 4</Link>
          <Link href="/AISearch">Keyword 5</Link>
        </section>

        <section>
          <h2>Frequently Searched Players</h2>
          <div>
            <Link href="/Player">View All Players</Link>
            <Link href="/Search/Popular">View Popular Players</Link>
            <Link href="/Search/NewPlayers">View New Players</Link>
          </div>
        </section>
      </main>

      <footer>
        <p>Footer content goes here</p>
      </footer>
    </div>
  )
}
