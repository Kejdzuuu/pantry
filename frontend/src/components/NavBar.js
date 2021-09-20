import React from "react"
import { AppBar, Toolbar, Button, Box, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Switch, Route, Link
} from "react-router-dom"

const useStyles = makeStyles({
  navbar: {
    marginBottom: '20px'
  }
})

const NavBar = ({ user, setUser }) => {
  const classes = useStyles()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const UserLoggedInComponent = () => {
    return (
      <>
        <Typography variant="body2" component="div">zalogowany jako {user.username}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem sx={{ padding: "5px" }}/>
        <Button color="inherit" onClick={handleLogout}>wyloguj</Button>
      </>
    )
  }

  const UserNotLoggedInComponent = () => {
    return (
      <>
        <Switch>
          <Route path="/sign-up">
            <Button color="inherit" component={Link} to="/">Zaloguj się</Button>
          </Route>
          <Route path="/">
            <Button color="inherit" component={Link} to="/sign-up">Stwórz konto</Button>
          </Route>
        </Switch>
      </>
    )
  }

  return (
    <AppBar position="static" color="secondary" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Spiżarnia</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user === null ?
          <UserNotLoggedInComponent /> :
          <UserLoggedInComponent />
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
