import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Dogs } from '../Assets/dogs.svg'
import styles from '../Styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link className={styles.logo} to='/' aria-label='Dogs - Home'>
          <Dogs />
        </Link>
        <Link className={styles.login} to='/login'>Login / Cadastrar</Link>
      </nav>
    </header>
  )
}

export default Header