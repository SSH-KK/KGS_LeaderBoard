import React, { useState, ChangeEvent, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styles from '@styles/Login.module.css'
import { DoLogin } from '@hooks/useAPI'
import { SetStateFT } from '@type/utils'
import { set } from 'idb-keyval'

type LoginProps = {
  isAuth: boolean
  doLogin: DoLogin
  logInError: string | undefined
  setLogInError: SetStateFT<string | undefined>
}

const Login: React.FC<LoginProps> = ({
  isAuth,
  doLogin,
  logInError,
  setLogInError,
}) => {
  // window.isAuth = isAuth

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) setLoading(false)
    if (isAuth && formState.username && formState.password) {
      set('user:login', formState.username)
      set('user:password', formState.password)
    }
  }, [logInError, isAuth])

  const formSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      doLogin(formState.username, formState.password)
      setLoading(true)
    } catch (e) {
      setFormState({
        username: '',
        password: '',
      })

      console.log(e)
    }
  }

  const formInputchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    if (logInError) {
      setLogInError(undefined)
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
                value={formState['username']}
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
                value={formState['password']}
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            {logInError ? <h5 className="text-danger">{logInError}</h5> : ''}
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
