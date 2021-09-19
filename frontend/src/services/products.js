import axios from 'axios'

const url = '/api/products'

const getAll = async (user) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`
    }
  }
  const response = await axios.get(url, config)
  return response.data
}

const create = async (newProduct, user) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`
    }
  }
  const response = await axios.post(url, newProduct, config)
  return response.data
}

const remove = async (id, user) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`
    }
  }
  const response = await axios.delete(`${url}/${id}`, config)
  return response.data
}

const services = {
  getAll,
  create,
  remove,
}

export default services
