import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navbar from '@components/Navbar'
import GameView from '@components/GameView'
import Top from '@components/Top'
import Login from '@components/Login'
import useHttp from '@hooks/useHttp'
import Loader from '@components/Loader'

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isAuthFirst, setIsAuthFirst] = useState<boolean>(false)
  const { request, loading, error } = useHttp()

  const checkIsAuth = async () => {
    try {
      const { loggedIn } = await request('/is_logged', 'GET')
      setIsAuth(loggedIn)
      return loggedIn
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const makeLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await request('/logout', 'POST', JSON.stringify({ random: 'random' }))
      await new Promise((resolve) => setTimeout(resolve, 1000 * 1.5))
      await checkIsAuth()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    ;(async () => {
      await checkIsAuth()
      setIsAuthFirst(true)
    })()
  }, [])

  return (
    <BrowserRouter>
      <Navbar makeLogout={makeLogout} isAuth={isAuth} />
      <Loader loading={!isAuthFirst}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Login checkIsAuth={checkIsAuth} isAuth={isAuth} />}
          />
          <Route exact path="/top" render={() => <Top isAuth={isAuth} />} />
          <Route
            exact
            path="/game/:game_timestamp"
            render={({ match }) => <GameView isAuth={isAuth} match={match} />}
          />
          <Route path="*" exact render={() => <h1>NOT FOUND</h1>} />
        </Switch>
      </Loader>
    </BrowserRouter>
  )
}
export default App
