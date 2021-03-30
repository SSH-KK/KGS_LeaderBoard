import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Navbar from '@components/Navbar'
import Game from '@components/Game'
import Top from '@components/Top'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/top" render={() => <Top />} />
        <Route exact path="/game/:game_timestamp" render={({match}) => <Game match = {match} />} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
