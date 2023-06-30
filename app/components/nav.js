import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.sr}>Logo</h1>
      <nav className={styles.nav}>
        <Image src="/logo.png" width={30} height={30} />
        <ul className={styles.navigationList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Search</Link>
          </li>
          <li>
            <Link href="/">AI Search</Link>
          </li>
          <li>
            <Link href="/">Community</Link>
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
