import React, { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import { Typography, TextField, Box, Button } from "@mui/material"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  loginButton: {
    marginTop: "10px"
  },
  textField: {
    marginBottom: "5px"
  }
})

const LoginForm = ({ setUser }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ notificationState, setNotificationState ] = useState(false)
  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setNotificationState(true)
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin}>
      <Typography variant="h4">
        Logowanie
      </Typography>
      <Notification open={notificationState} message={"Nieprawidłowy login lub hasło"} />
      <div>
        <TextField required label="login" value={username} className={classes.textField} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <TextField required label="hasło" type="password" value={password} className={classes.textField} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button type="submit" variant="contained" color="secondary" className={classes.loginButton}>zaloguj się</Button>
    </Box>
  )
}

export default LoginForm
