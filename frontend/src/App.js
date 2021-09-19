import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import SignUpForm from './components/SignUpForm'
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import { Container } from '@material-ui/core'

const App = () => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <Container>
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Container maxWidth="sm">
          <Switch>
            <Route path="/sign-up">
              <SignUpForm />
            </Route>
            <Route path="/">
              {user === null ?
                <LoginForm setUser={setUser} /> :
                <Home user={user} />
              }
            </Route>
          </Switch>
        </Container>
      </Router>
    </Container>
  )
}

export default App
