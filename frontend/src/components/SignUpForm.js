import React, { useState } from "react"
import signupService from "../services/signup"
import { useHistory } from "react-router"
import { Typography, TextField, Box, Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  registerButton: {
    marginTop: "10px"
  }
})

const SignUpForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
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
    }
  }

  return (
    <Box component="form" onSubmit={handleSignUp}>
      <Typography variant="h4">
        Rejestracja
      </Typography>
      <div>
        <TextField required label="login" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <TextField required label="hasło" type="password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button type="submit" variant="contained" color="secondary" className={classes.registerButton}>zarejestruj się</Button>
    </Box>
  )
}

export default SignUpForm
