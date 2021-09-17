import React, { useState } from "react"
import signupService from "../services/signup"
import { useHistory } from "react-router"

const SignUpForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const history = useHistory()

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
    <form onSubmit={handleSignUp}>
      <div>
        username
        <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">zarejestruj się</button>
    </form>
  )
}

export default SignUpForm
