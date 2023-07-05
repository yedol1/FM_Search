import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Header.module.css'
import { ReactElement } from 'react'

const Header = (): ReactElement => {
  return (
    <header className={styles.header}>
      <h1 className={styles.sr}>Logo</h1>
      <nav className={styles.nav}>
        <Image src="/logo.png" width={30} height={30} alt="Logo" />
        <ul className={styles.navigationList}>
          <li>
            <Link href="/">Community</Link>
          </li>
          <li>
            <Link href="/">FM Player Search</Link>
          </li>
          <li>
            <Link href="/">FM AI Player Search</Link>
          </li>
          <li>
            <Link href="/">Latest News</Link>
          </li>
        </ul>
        <div className={styles.loginButton}>
          <button>Login</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
