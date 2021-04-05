import { useAPI } from '@hooks/useAPI'
import React, { useCallback, useEffect, useState } from 'react'
import { reducerConstructor } from '@utils/messageReducer'
import { TopUserInfoT } from '@type/top'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loader from '@components/Loader'
import Login from '@components/Login'
import { get, del } from 'idb-keyval'
import Top from '@components/Top'
import Navbar from '@components/Navbar'
import { RequestTypes } from '@type/fetch'

export const App = () => {
  const [usersTop, setUsersTop] = useState<TopUserInfoT[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [logInError, setLoginError] = useState<string>()
  const [firstLoginProcessing, setFirstLoginProcessing] = useState(true)

  const reducer = useCallback(
    reducerConstructor(
      { setTopList: setUsersTop },
      { setLoginError, setIsLoggedIn }
    ),
    []
  )

  useEffect(() => {
    ;(async () => {
      const username = await get('user:login')
      const password = await get('user:password')

      if (username && password) doLogin(username, password)
    })()
  }, [])

  useEffect(() => {
    setFirstLoginProcessing(false)
  }, [logInError, isLoggedIn])

  const [doLogin, doRequest] = useAPI(isLoggedIn, setIsLoggedIn, reducer)

  const doLogout = () => {
    del('user:login')
    del('user:password')
    doRequest({
      type: RequestTypes.logout,
    })
  }

  return (
    <BrowserRouter>
      <Navbar isAuth={isLoggedIn} makeLogout={doLogout} />
      <Loader loading={firstLoginProcessing}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                isAuth={isLoggedIn}
                doLogin={doLogin}
                logInError={logInError}
                setLogInError={setLoginError}
              />
            )}
          />
          <Route
            exact
            path="/top"
            render={() => (
              <Top
                setTop={setUsersTop}
                usersTop={usersTop}
                isAuth={isLoggedIn}
                doRequest={doRequest}
              />
            )}
          />
          <Route path="*" render={() => <h1>NOT FOUND</h1>} />
        </Switch>
      </Loader>
    </BrowserRouter>
  )
}
