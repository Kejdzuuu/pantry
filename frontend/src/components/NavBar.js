import React from "react"
import { AppBar, Toolbar, Button, Box, Typography, Divider, makeStyles } from '@material-ui/core'
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
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>zalogowany jako {user.username}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button color="inherit" onClick={handleLogout}>wyloguj</Button>
      </>
    )
  }

  const UserNotLoggedInComponent = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} />
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
