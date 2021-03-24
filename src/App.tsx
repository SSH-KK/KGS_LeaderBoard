import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Navbar from '@components/Navbar'
import Top from '@components/Top'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/top" render={() => <Top />} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
