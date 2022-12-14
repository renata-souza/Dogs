import React, { useState, useEffect } from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from './UserHeader.module.css'
import { useLocation } from 'react-router-dom'

const UserHeader = () => {
  const [title, setTitle] = useState('')
  const location = useLocation()

  useEffect(() => {
    switch(location.pathname) {
      case '/conta/postar': setTitle('Postar foto')
      break
      case '/conta/estatisticas': setTitle('Estatisticas')
      break
      default: setTitle('Minha conta')
    }
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className='title'>{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader