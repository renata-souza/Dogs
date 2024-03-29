import React from 'react'
import styles from '../Styles/Footer.module.css'
import {ReactComponent as Dogs} from '../Assets/dogs-footer.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Dogs. Alguns Direitos Reservados</p>
    </footer>
  )
}

export default Footer