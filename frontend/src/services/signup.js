import axios from "axios"

const url = '/api/users'

const signup = async (credentials) => {
  const response = await axios.post(url, credentials)
  return response.data
}

const services = {
  signup
}

export default services
