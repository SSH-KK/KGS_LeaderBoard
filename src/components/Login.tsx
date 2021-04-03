import React, { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import useHttp from '@hooks/useHttp'
import styles from '@styles/Login.module.css'

type LoginProps = {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FC<LoginProps> = ({ isAuth, setIsAuth }) => {
  const { request, loading, error, setError } = useHttp()
  const [fromState, setFormState] = useState({
    username: '',
    password: '',
  })

  const formSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    console.log('subim')
    e.preventDefault()
    request('/login', 'POST', JSON.stringify(fromState))
      .then(() => {
        if (!error) {
          setIsAuth(true)
        }
      })
      .catch((e) => {
        setFormState({
          username: '',
          password: '',
        })
        console.log(e)
      })
  }

  const formInputchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) {
      setError(null)
    }
  }

  return isAuth ? (
    <Redirect to="/top" />
  ) : (
    <div
      className={`${styles.fullHeightContainer} d-flex flex-column justify-content-center container`}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 shadow rounded rounded-3 p-5">
          <form onSubmit={formSubmit}>
            <h2 className="mb-2">Login</h2>
            <div className="input-group mb-3">
              <input
                onChange={formInputchange}
                value={fromState['username']}
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                aria-label="Username"
              />
            </div>
            <div className="input-group mb-3">
              <input
                onChange={formInputchange}
                value={fromState['password']}
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            {error ? <h5 className="text-danger">Error during login</h5> : ''}
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
