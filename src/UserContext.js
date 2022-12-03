import React, { useCallback, useEffect, useState } from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api'
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
  const [ data, setData ] = useState(null)
  const [ login, setLogin ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const userLogout = useCallback(async function () {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])

  async function getUser(token) {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const user = await response.json()
    setData(user)
    setLogin(true)
    console.log(user)
  }

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({username, password})
      const tokenResponse = await fetch(url, options)
      if (!tokenResponse.ok) throw new Error(`Error: ${tokenResponse.status}`)
      const {token} = await tokenResponse.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/conta')
    } catch (err) {
      setError(err.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          setError(null)
          setLoading(true)
          const { url, options } = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url, options)
          if (!response.ok) throw new Error('Token Inválido')
          await getUser(token)
        } catch (err) {
          userLogout()
        } finally {
          setLoading(false)
        }
      }
    }
    autoLogin()
  }, [userLogout])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, error, login, loading, data }}>
      {children}
    </UserContext.Provider>
  )
}