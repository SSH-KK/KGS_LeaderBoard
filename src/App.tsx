import React, { useState } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navbar from '@components/Navbar'
import GameView from '@components/GameView'
import Top from '@components/Top'
import Login from '@components/Login'

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route exact path="/top" render={() => <Top isAuth={isAuth} />} />
        <Route
          exact
          path="/game/:game_timestamp"
          render={({ match }) => <GameView isAuth={isAuth} match={match} />}
        />
        <Route path="*" exact render={() => <h1>NOT FOUND</h1>} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
