import React, { useState } from 'react'
import loginService from '../services/login'
import { Typography, TextField, Box, Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  loginButton: {
    marginTop: "10px"
  }
})

const LoginForm = ({ setUser }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
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
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin}>
      <Typography variant="h4">
        Logowanie
      </Typography>
      <div>
        <TextField required label="login" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <TextField required label="hasło" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button type="submit" variant="contained" color="secondary" className={classes.loginButton}>zaloguj się</Button>
    </Box>
  )
}

export default LoginForm
