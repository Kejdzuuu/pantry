import React, { useState } from "react"
import signupService from "../services/signup"
import Notification from "./Notification"
import { useHistory } from "react-router"
import { Typography, TextField, Box, Button } from "@mui/material"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  registerButton: {
    marginTop: "10px"
  },
  textField: {
    marginBottom: "5px"
  }
})

const SignUpForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ notificationState, setNotificationState ] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      await signupService.signup({ username, password })
      setUsername('')
      setPassword('')
      history.push('/')
    } catch (exception) {
      console.log('failed signup')
      setNotificationState(true)
    }
  }

  return (
    <Box component="form" onSubmit={handleSignUp}>
      <Typography variant="h4">
        Rejestracja
      </Typography>
      <Notification open={notificationState} message={"Nazwa użytkownika zajęta"} />
      <div>
        <TextField required label="login" value={username} className={classes.textField} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <TextField required label="hasło" type="password" value={password} className={classes.textField} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button type="submit" variant="contained" color="secondary" className={classes.registerButton}>zarejestruj się</Button>
    </Box>
  )
}

export default SignUpForm
