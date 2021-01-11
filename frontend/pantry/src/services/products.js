import axios from 'axios'

const url = 'http://localhost:3001/products'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = newProduct => {
  const request =  axios.post(url, newProduct)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const services = {
  getAll,
  create,
  remove,
}

export default services
